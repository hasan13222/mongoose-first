import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { EnrolledCourseServices } from './enrolledCourse.service';
import { sendResponse } from '../../utils/sendResponse';

const addEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await EnrolledCourseServices.addEnrolledCourseIntoDB(
    req.user.userId,
    req.body,
  );
  sendResponse(res, {
    message: 'Student Added to Enrolled Course successfully',
    data: result,
  });
});


const getAllEnrolledCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await EnrolledCourseServices.getAllEnrolledCourse();
  sendResponse(res, {
    message: 'Student Added to Enrolled Course successfully',
    data: result,
  });
})


export const EnrolledCourseControllers = {
  addEnrolledCourse,
  getAllEnrolledCourse
};
