import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const newFaculty = req.body;
  
  const result = await FacultyServices.createFacultyIntoDB(newFaculty);
  sendResponse(res, { message: 'Faculty created successfully', data: result });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user)
  const result = await FacultyServices.getAllFacultyFromDB();
  sendResponse(res, {
    message: 'All Faculty retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const FacultyId = req.params.facultyId;
  const result = await FacultyServices.getSingleFacultyFromDB(FacultyId);
  sendResponse(res, {
    message: 'Single Faculty retrieved successfully',
    data: result,
  });
});

const updateSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const FacultyId = req.params.facultyId;
  const updateDoc = req.body;
  const result = await FacultyServices.updateSingleFacultyInDB(
    FacultyId,
    updateDoc,
  );
  sendResponse(res, { message: 'Faculty updated successfully', data: result });
});

export const FacultyControllers = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
};
