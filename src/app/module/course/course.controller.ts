import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const newCourse = req.body;

  const result = await CourseServices.createCourseIntoDB(newCourse);
  sendResponse(res, { message: 'Course created successfully', data: result });
});

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    message: 'All Course retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const CourseId = req.params.courseId;
  const result = await CourseServices.getSingleCourseFromDB(CourseId);
  sendResponse(res, {
    message: 'Single Course retrieved successfully',
    data: result,
  });
});

const updateSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const CourseId = req.params.courseId;
  const updateDoc = req.body;
  const result = await CourseServices.updateSingleCourseInDB(
    CourseId,
    updateDoc,
  );
  sendResponse(res, { message: 'Course updated successfully', data: result });
});

const deleteSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const CourseId = req.params.courseId;
  const result = await CourseServices.deleteSingleCourseFromDB(CourseId);
  sendResponse(res, { message: 'Course deleted successfully', data: result });
});

const assignTeachers = catchAsync( async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const {teachers} = req.body;
  const result = await CourseServices.assignTeachersIntoDB(courseId, teachers);
  sendResponse(res, { message: 'Teachers Assigned to course successfully', data: result });
});

const removeTeachers = catchAsync( async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const {teachers} = req.body;
  const result = await CourseServices.removeTeachersFromDB(courseId, teachers);
  sendResponse(res, { message: 'Teachers removed from course successfully', data: result });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
  assignTeachers,
  removeTeachers
};
