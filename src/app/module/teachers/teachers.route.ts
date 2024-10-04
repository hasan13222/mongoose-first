import express from 'express';
import { TeacherControllers } from './teachers.controller';

const router = express.Router();

router.get('/', TeacherControllers.getAllTeacher);

export const TeachersRoutes = router;
