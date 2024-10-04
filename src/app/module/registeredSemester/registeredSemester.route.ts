import express from 'express';
import { RegisteredSemesterControllers } from './registeredSemester.controller';
const router = express.Router();

router.post('/create-registeredSemester', RegisteredSemesterControllers.createRegisteredSemester);
router.get('/', RegisteredSemesterControllers.getAllRegisteredSemester);
router.patch('/:registeredSemesterId', RegisteredSemesterControllers.updateRegisteredSemester);

export const RegisteredSemesterRoutes = router;
