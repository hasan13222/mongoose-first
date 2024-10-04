import express from 'express';
import { SemesterControllers } from './semester.controller';
const router = express.Router();

router.post('/create-semester', SemesterControllers.createSemester);
router.get('/', SemesterControllers.getAllSemester);
router.get('/:semesterId', SemesterControllers.getSingleSemester);
router.patch('/:semesterId', SemesterControllers.updateSingleSemester);

export const SemesterRoutes = router;
