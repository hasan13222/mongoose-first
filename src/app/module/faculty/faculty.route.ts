import express from 'express';
import { FacultyControllers } from './faculty.controller';
import { verifyToken } from '../../middleware/auth';
const router = express.Router();

router.post('/create-faculty', FacultyControllers.createFaculty);
router.get('/', verifyToken(), FacultyControllers.getAllFaculty);
router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.patch('/:facultyId', FacultyControllers.updateSingleFaculty);

export const FacultyRoutes = router;
