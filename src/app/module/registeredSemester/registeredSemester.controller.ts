import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { RegisteredSemesterServices } from './registeredSemester.service';

const createRegisteredSemester = catchAsync(
  async (req: Request, res: Response) => {
    const newRegisteredSemester = req.body;

    const result =
      await RegisteredSemesterServices.createRegisterdSemesterIntoDB(
        newRegisteredSemester,
      );
    sendResponse(res, {
      message: 'RegisteredSemester created successfully',
      data: result,
    });
  },
);

const getAllRegisteredSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await RegisteredSemesterServices.getAllRegisterdSemesterFromDB();
    sendResponse(res, {
      message: 'All RegisteredSemester retrieved successfully',
      data: result,
    });
  },
);

const updateRegisteredSemester = catchAsync(
  async (req: Request, res: Response) => {
    const registeredSemesterId = req.params.registeredSemesterId;

    const result =
      await RegisteredSemesterServices.updateSingleRegisterdSemesterIntoDB(
        registeredSemesterId,
        req.body,
      );
    sendResponse(res, {
      message: 'RegisteredSemester update successfully',
      data: result,
    });
  },
);

export const RegisteredSemesterControllers = {
  createRegisteredSemester,
  getAllRegisteredSemester,
  updateRegisteredSemester,
};
