import { Types } from 'mongoose';

export type TCourseMarks = {
  classTest: number;
  midTerm: number;
  final: number;
};
export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export interface TEnrolledCourse {
  student: Types.ObjectId;
  registeredSemester: Types.ObjectId;
  semester: Types.ObjectId;
  course: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  faculty: Types.ObjectId;
  department: Types.ObjectId;
  teacher: Types.ObjectId;
  courseMarks?: TCourseMarks;
  grade?: TGrade;
  gradePoints?: number;
  isCompleted?: boolean;
}
