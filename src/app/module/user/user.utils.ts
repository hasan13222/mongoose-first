import { SemesterModel } from '../semester/semester.model';
import { StudentModel } from '../student/student.model';
import { Types } from 'mongoose';
import { Teacher } from '../teachers/teachers.model';

export async function generateStudentId(semesterId: Types.ObjectId) {
  const studentSemester = await SemesterModel.findById(semesterId);
  const studentSemesterIdwithYear = `${studentSemester?.year}${studentSemester?.code}`;
  const studentSemesterIdwithYearRegExp = new RegExp(
    `^${studentSemesterIdwithYear}`,
  );
  const lastStudentId = await StudentModel.find(
    { id: { $regex: studentSemesterIdwithYearRegExp } },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();
  console.log(lastStudentId);
  let incrementId = 1;

  if (lastStudentId.length > 0) {
    incrementId = parseInt(lastStudentId[0].id.substring(6)) + 1;
  }
  const currentFourDigitCode = incrementId.toString().padStart(4, '0');

  const generatedId = `${studentSemester?.year}${studentSemester?.code}${currentFourDigitCode}`;

  return generatedId;
}

export async function generateTeacherId() {
  const lastStudentId = await Teacher.find({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .limit(1)
    .lean();

  let incrementId = 1;

  if (lastStudentId.length > 0) {
    incrementId = parseInt(lastStudentId[0].id.substring(2)) + 1;
  }
  const currentFourDigitCode = incrementId.toString().padStart(4, '0');

  const generatedId = `T-${currentFourDigitCode}`;
  return generatedId;
}
