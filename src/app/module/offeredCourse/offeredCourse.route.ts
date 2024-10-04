import express from 'express';
import { validateRequests } from '../../middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validator';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { verifyToken } from '../../middleware/auth';

const { validateRefineRequest } = validateRequests;
const {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
} = OfferedCourseValidations;

const router = express.Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourse);
router.get('/my-offered-course', verifyToken(), OfferedCourseControllers.getMyOfferedCourse);

router.post(
  '/offer-course',
  validateRefineRequest(createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:offeredcourseId',
  validateRefineRequest(updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
