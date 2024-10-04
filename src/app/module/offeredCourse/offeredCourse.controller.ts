import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { offeredCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const newOfferedCourse = req.body;

  const result =
    await offeredCourseServices.createOfferedCourseIntoDB(newOfferedCourse);
  sendResponse(res, {
    message: 'OfferedCourse created successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const offeredCourseId = req.params.offeredcourseId;
  const updateDoc = req.body;
  const result = await offeredCourseServices.updateOfferedCourseIntoDB(
    offeredCourseId,
    updateDoc,
  );
  sendResponse(res, {
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseServices.getAllOfferedCourseFromDB();
  sendResponse(res, {
    message: 'OfferedCourse retrieved successfully',
    data: result,
  });
});

const getMyOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await offeredCourseServices.getMyOfferedCourseFromDB(req.user.userId);
  sendResponse(res, {
    message: 'OfferedCourse retrieved successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourse
};
