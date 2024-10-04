import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
// import Joi from 'joi';
// import studentValidationSchema from './student.validator';



const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSinlgeStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Single Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  const updateDoc = req.body;
  const result = await StudentServices.updateSinlgeStudentFromDB(studentId, updateDoc);
  sendResponse(res, { message: 'Student updated successfully', data: result });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent
};
