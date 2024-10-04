import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse, TCourseTeacher } from './course.interface';
import { Course, CourseTeacher } from './course.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(['title', 'prefix', 'code'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteSingleCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateSingleCourseInDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisiteCoursesId = preRequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((item) => item.course);
      const newPreRequisiteCourses = preRequisiteCourses.filter(
        (item) => item.course && !item.isDeleted,
      );

      // deletedPreRequisiteCourses
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisiteCoursesId },
            },
          },
        },
        { runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete course');
      }

      // addedPreRequisiteCourses
      await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisiteCourses } },
        },
        { runValidators: true, session },
      );
    }
    const updatedBasicData = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      { new: true, runValidators: true, session },
    );

    await session.commitTransaction();
    await session.endSession();

    return updatedBasicData;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course data');
  }
};


// assign teachers into courseTeacher collection
const assignTeachersIntoDB = async (id: string, payload: Partial<TCourseTeacher>) => {
  const isCourseExist = await Course.findById(id);
  if(!isCourseExist){
    throw new AppError(StatusCodes.NOT_FOUND, "Course not found");
  }
  const result = await CourseTeacher.findByIdAndUpdate(id, {course: id, $addToSet: {teachers: {$each: payload}}}, {new: true, upsert: true});
  return result;
}
// remove teachers from courseTeacher collection
const removeTeachersFromDB = async (id: string, payload: Partial<TCourseTeacher>) => {
  const isCourseExist = await Course.findById(id);
  if(!isCourseExist){
    throw new AppError(StatusCodes.NOT_FOUND, "Course not found");
  }
  const isAnyTeacherAssignedYet = await CourseTeacher.findById(id);
  if(!isAnyTeacherAssignedYet){
    throw new AppError(StatusCodes.NOT_FOUND, "Not teacher assigned yet");
  }
  const result = await CourseTeacher.findByIdAndUpdate(id, {course: id, $pull: {teachers: {$in: payload}}}, {new: true});
  return result;
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteSingleCourseFromDB,
  updateSingleCourseInDB,
  assignTeachersIntoDB,
  removeTeachersFromDB
};
