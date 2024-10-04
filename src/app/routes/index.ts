import express from 'express';
import { StudentRoutes } from '../module/student/student.route';
import { UserRoutes } from '../module/user/user.route';
import { SemesterRoutes } from '../module/semester/semester.route';
import { FacultyRoutes } from '../module/faculty/faculty.route';
import { DepartmentRoutes } from '../module/department/department.route';
import { CourseRoutes } from '../module/course/course.route';
import { TeachersRoutes } from '../module/teachers/teachers.route';
import { RegisteredSemesterRoutes } from '../module/registeredSemester/registeredSemester.route';
import { OfferedCourseRoutes } from '../module/offeredCourse/offeredCourse.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { EnrolledCourseRoutes } from '../module/enrolledCourse/enrolledCourse.route';

const router = express.Router();

const moduleRouters = [
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/students',
    routes: StudentRoutes,
  },
  {
    path: '/semesters',
    routes: SemesterRoutes,
  },
  {
    path: '/faculties',
    routes: FacultyRoutes,
  },
  {
    path: '/departments',
    routes: DepartmentRoutes,
  },
  {
    path: '/courses',
    routes: CourseRoutes,
  },
  {
    path: '/teachers',
    routes: TeachersRoutes,
  },
  {
    path: '/registeredSemesters',
    routes: RegisteredSemesterRoutes,
  },
  {
    path: '/offeredCourses',
    routes: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/enroll',
    routes: EnrolledCourseRoutes,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
