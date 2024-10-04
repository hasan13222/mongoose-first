import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { DepartmentServices } from './department.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const newDepartment = req.body;
  const result = await DepartmentServices.createDepartmentIntoDB(newDepartment);
  sendResponse(res, { message: 'Department created successfully', data: result });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentServices.getAllDepartmentFromDB();
  sendResponse(res, {
    message: 'All Department retrieved successfully',
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const DepartmentId = req.params.DepartmentId;
  const result = await DepartmentServices.getSingleDepartmentFromDB(DepartmentId);
  sendResponse(res, {
    message: 'Single Department retrieved successfully',
    data: result,
  });
});

const updateSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const DepartmentId = req.params.DepartmentId;
  const updateDoc = req.body;
  const result = await DepartmentServices.updateSingleDepartmentInDB(
    DepartmentId,
    updateDoc,
  );
  sendResponse(res, { message: 'Department updated successfully', data: result });
});

export const DepartmentControllers = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateSingleDepartment,
};
