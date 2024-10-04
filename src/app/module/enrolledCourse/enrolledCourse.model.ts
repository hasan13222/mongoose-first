import { Schema, model } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';
import { Grade } from './enrolledCourse.constants';

const courseMarksSchema = new Schema<TCourseMarks>({
  classTest: Number,
  midTerm: Number,
  final: Number,
});
const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
    registeredSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'RegisteredSemester',
    },
    semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Semester',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'OfferedCourse',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Faculty',
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Department',
    },
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Teacher',
    },
    courseMarks: {
      type: courseMarksSchema,
    },
    grade: {
      type: String,
      enum: Grade,
    },
    gradePoints: Number,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
