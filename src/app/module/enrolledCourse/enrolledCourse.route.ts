import express from 'express';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { verifyToken } from '../../middleware/auth';
const router = express.Router();

router.post('/add-student',verifyToken(), EnrolledCourseControllers.addEnrolledCourse);
router.get('/', EnrolledCourseControllers.getAllEnrolledCourse);

export const EnrolledCourseRoutes = router;
