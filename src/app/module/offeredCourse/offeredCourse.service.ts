import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { RegisteredSemester } from '../registeredSemester/registeredSemester.model';
import { SemesterModel } from '../semester/semester.model';
import { OfferedCourseModel } from './offeredCourse.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { FacultyModel } from '../faculty/faculty.model';
import { Teacher } from '../teachers/teachers.model';
import { Course } from '../course/course.model';
import { DepartmentModel } from '../department/department.model';
import { checkTimeConflict } from './offeredCourse.utils';
import { StudentModel } from '../student/student.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  //   check if the semester is exist
  const isSemesterExist = await SemesterModel.findById(payload.semester);
  if (!isSemesterExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Semester is not exist');
  }

  //   check if the registered semester is exist
  const isRegSemesterExist = await RegisteredSemester.findById(
    payload.registeredSemester,
  );
  if (!isRegSemesterExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Semester is not registered');
  }

  //   check if the registered semester is upcoming
  if (isRegSemesterExist.status !== 'Upcoming') {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Semester status is not upcoming. You can't add course in ongoing or ended semester.",
    );
  }

  //   check if the faculty is exist
  const isFacultyExist = await FacultyModel.findById(payload.faculty);
  if (!isFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty is not exist');
  }

  //   check if the Department is exist
  const isDepartmentExist = await DepartmentModel.findById(payload.department);
  if (!isDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Department is not exist');
  }

  //   check if the department is under the faculty or not
  if (isDepartmentExist.facultyId.toString() !== payload.faculty.toString()) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This Department is not under the Faculty',
    );
  }

  //   check if the Teacher is exist
  const isTeacherExist = await Teacher.findById(payload.teacher);
  if (!isTeacherExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Teacher is not exist');
  }

  //   check if the Course is exist
  const isCourseExist = await Course.findById(payload.course);
  if (!isCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Course is not exist');
  }

  //   check if the course is already in the offered in same section
  const isCourseAlreadyInSection = await OfferedCourseModel.findOne({
    course: payload.course,
    section: payload.section,
  });
  if (isCourseAlreadyInSection) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Course is already offered in the section',
    );
  }

  //   check if the teacher time is conflicting with any other of his offered courses time
  const thisTeacherSameDaysCourses = await OfferedCourseModel.find({
    registeredSemester: payload.registeredSemester,
    teacher: payload.teacher,
    days: { $in: [...payload.days] },
  }).select('startTime endTime');

  const hasTimeConflict = checkTimeConflict(
    thisTeacherSameDaysCourses,
    payload.startTime,
    payload.endTime,
  );
  if (hasTimeConflict) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This Time conflicts with already scheduled time for this teacher',
    );
  }

  const result = await OfferedCourseModel.create(payload);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourse,
    'teacher' | 'startTime' | 'endTime' | 'maxCapacity' | 'days'
  >,
) => {
  // check if the offercourse exist
  const isTheOfferedCourseExist = await OfferedCourseModel.findById(id);

  //   check if the Teacher is exist
  const isTeacherExist = await Teacher.findById(payload.teacher);
  if (!isTeacherExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Teacher is not exist');
  }
  //   check if the teacher time is conflicting with any other of his offered courses time
  const thisTeacherSameDaysCourses = await OfferedCourseModel.find({
    _id: { $ne: id },
    registeredSemester: isTheOfferedCourseExist?.registeredSemester,
    teacher: payload.teacher,
    days: { $in: [...payload.days] },
  }).select('startTime endTime');

  const hasTimeConflict = checkTimeConflict(
    thisTeacherSameDaysCourses,
    payload.startTime,
    payload.endTime,
  );
  if (hasTimeConflict) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This Time conflicts with already scheduled time for this teacher',
    );
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload);
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourseModel.find();
  return result;
};

const getMyOfferedCourseFromDB = async (userId: string) => {
  const student = await StudentModel.findOne({ id: userId });
  if (!student) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Your are not authrized');
  }
  const result = await OfferedCourseModel.aggregate([
    {
      $match: {
        semester: student?.semesterId,
        department: student?.departmentId,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          semesterId: student?.semesterId,
        },
        pipeline: [
          {
            $match: {
              semester: student?.semesterId,
              student: student?._id
            },
          },
        ],
        as: 'enrolledCoursesData',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        pipeline: [
          {
            $match: {
              student: student?._id,
              isCompleted: true
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completeCourseIds: {
          $map: {
            input: '$completedCourses',
            as: 'completed',
            in: '$$completed.course'
          }
        }
      }
    },
    {
      $addFields: {
        isPreRequisiteComplete: {
          $or: [
            {
              $eq: ['$course.preRequisiteCourses', []]
            },
            {
              $setIsSubset: ['$course.preRequisiteCourses.course', '$completeCourseIds']
            }
          ]
        },
        isAlreadyEnrolled: {
          $in: ['$course._id', {
            $map: {
              input: '$enrolledCoursesData',
              as: 'enroll',
              in: '$$enroll.course'
            }
          }]
        },
      }
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisiteComplete: true,
      }
    }
  ]);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getMyOfferedCourseFromDB,
};
