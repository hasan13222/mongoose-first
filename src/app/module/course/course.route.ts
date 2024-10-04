import express from 'express';
import { CourseControllers } from './course.controller';
import { validateRequests } from '../../middleware/validateRequest';
import { CourseValidators } from './course.validator';

const { validateGeneralRequest } = validateRequests;
const { createCourseValidation, updateCourseValidation } = CourseValidators;

const router = express.Router();

router.post(
  '/create-course',
  validateGeneralRequest(createCourseValidation),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourse);
router.get('/:courseId', CourseControllers.getSingleCourse);
router.patch(
  '/:courseId',
  validateGeneralRequest(updateCourseValidation),
  CourseControllers.updateSingleCourse,
);
router.delete('/:courseId', CourseControllers.deleteSingleCourse);

router.put('/:courseId/assign-teachers', CourseControllers.assignTeachers);
router.delete('/:courseId/remove-teachers', CourseControllers.removeTeachers);

export const CourseRoutes = router;
