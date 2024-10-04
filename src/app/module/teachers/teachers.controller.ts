import { Request, Response } from 'express';
import { TeacherServices } from './teachers.service';

const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const result = await TeacherServices.getAllTeacherFromDB(req.query);

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

export const TeacherControllers = {
  getAllTeacher,
};
