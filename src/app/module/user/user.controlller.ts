import { NextFunction, Request, Response } from 'express';
import studentValidationSchema from '../student/student.validator';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password,email, student: studentData } = req.body;
    const { error, value } = studentValidationSchema.validate(studentData);

    if (error) {
      next(error);
    } else {
      const result = await UserServices.createStudentIntoDB(password,email, value);
      sendResponse(res, { data: result });
    }
  },
);

const createTeacher = catchAsync(
  async (req: Request, res: Response) => {

    const { password, email, userDetails: teacherData } = req.body;

    const result = await UserServices.createTeacherIntoDB(
      password,
      email,
      teacherData,
      req?.file?.path as string
    );
    sendResponse(res, { data: result });
  },
);

export const UserControllers = {
  createStudent,
  createTeacher
};
