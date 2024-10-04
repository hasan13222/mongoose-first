import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { StudentModel } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { EnrolledCourse } from './enrolledCourse.model';
import { Course } from '../course/course.model';
import { RegisteredSemester } from '../registeredSemester/registeredSemester.model';

const addEnrolledCourseIntoDB = async (
  userId: string,
  payload: Pick<TEnrolledCourse, 'offeredCourse'>,
) => {
  const student = await StudentModel.findOne({ id: userId });
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }
  const offeredCourse = await OfferedCourseModel.findOne({
    _id: payload.offeredCourse,
  });
  if (!offeredCourse) {
    throw new AppError(StatusCodes.NOT_FOUND, 'offeredCourse not found');
  }
  const newEnrollment: TEnrolledCourse = {
    student: student._id,
    offeredCourse: offeredCourse._id,
    registeredSemester: offeredCourse?.registeredSemester,
    semester: offeredCourse?.semester,
    course: offeredCourse?.course,
    faculty: offeredCourse?.faculty,
    department: offeredCourse?.department,
    teacher: offeredCourse?.teacher,
  };

  const maxCreditsOfCurrentSemester = await RegisteredSemester.findById(offeredCourse.registeredSemester, {maxCredit: 1});
  if (!maxCreditsOfCurrentSemester){
    throw new AppError(StatusCodes.NOT_FOUND, "registered semester not found");
  }

  const totalEnrolledCredits = await EnrolledCourse.aggregate([
    {
      $match: {
        student: student._id,
        registeredSemester: offeredCourse.registeredSemester,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: "$enrolledCourseData"
    },
    {
      $group: {
        _id: "my choice",
        totalCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0
      }
    }
  ]);
  const newCourseCredits = await Course.findById(offeredCourse.course);

  if(totalEnrolledCredits[0]?.totalCredits + newCourseCredits?.credits > maxCreditsOfCurrentSemester?.maxCredit){
    throw new AppError(StatusCodes.CONFLICT, "credit limit exceeds for this course to enroll")
  }
  const result = await EnrolledCourse.create(newEnrollment);
  return result;
};

const getAllEnrolledCourse = async () => {
  const result = await EnrolledCourse.find();
  return result;
}
export const EnrolledCourseServices = {
  addEnrolledCourseIntoDB,
  getAllEnrolledCourse
};
