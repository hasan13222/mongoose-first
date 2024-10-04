import express from 'express';
import { DepartmentControllers } from './department.controller';
const router = express.Router();

router.post('/create-department', DepartmentControllers.createDepartment);
router.get('/', DepartmentControllers.getAllDepartment);
router.get('/:DepartmentId', DepartmentControllers.getSingleDepartment);
router.patch('/:DepartmentId', DepartmentControllers.updateSingleDepartment);

export const DepartmentRoutes = router;
