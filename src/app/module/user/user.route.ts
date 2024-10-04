import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controlller';
import { validateRequests } from '../../middleware/validateRequest';
import userValidationSchema from './user.validator';
import teacherValidationSchema from '../teachers/teachers.validator';
import { upload } from '../../utils/sendImageToCloud';
const router = express.Router();

const { validateUserRequest, validateUserRoleRequest } = validateRequests;

router.post(
  '/create-student',
  validateUserRequest(userValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-teacher',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateUserRoleRequest(teacherValidationSchema),
  UserControllers.createTeacher,
);

export const UserRoutes = router;
