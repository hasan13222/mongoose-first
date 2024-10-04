import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { SemesterServices } from './semester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const newSemester = req.body;
  const result = await SemesterServices.createSemesterIntoDB(newSemester);
  sendResponse(res, { message: 'Semester created successfully', data: result });
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await SemesterServices.getAllSemesterFromDB();
  sendResponse(res, { message: 'All Semester retrieved successfully', data: result });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId;
  const result = await SemesterServices.getSingleSemesterFromDB(semesterId);
  sendResponse(res, { message: 'Single Semester retrieved successfully', data: result });
});

const updateSingleSemester = catchAsync(async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId;
    const updateDoc = req.body;
    const result = await SemesterServices.updateSingleSemesterInDB(semesterId, updateDoc);
    sendResponse(res, { message: 'Semester updated successfully', data: result });
  });

export const SemesterControllers = {
  createSemester,
  getAllSemester, 
  getSingleSemester,
  updateSingleSemester
};
