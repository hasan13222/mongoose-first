import mongoose from 'mongoose';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId, generateTeacherId } from './user.utils';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TTeacher } from '../teachers/teachers.interface';
import { Teacher } from '../teachers/teachers.model';
import { sendImageToCloud } from '../../utils/sendImageToCloud';

const createStudentIntoDB = async (
  password: string | undefined,
  email: string,
  student: TStudent,
) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.dp as string);
  user.role = 'student';

  // auto generat id
  user.id = await generateStudentId(student.semesterId);

  const session = await mongoose.startSession();

  // student creation session
  try {
    session.startTransaction();
    // create user
    const newUser = await UserModel.create([user], { session });

    if (newUser.length <= 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create a user');
    }

    // const result = await StudentModel.create(student);
    student.id = newUser[0].id;
    student.user = newUser[0]._id;
    student.status = newUser[0].status;

    const newStudent = new StudentModel(student);

    const result = await newStudent.save({ session });

    if (Object.keys(result).length <= 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create a student');
    }

    await session.commitTransaction();
    await session.endSession();

    return { user: newUser, student: result };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('User Create Failed' + error);
  }
};

// hanlde delete by transaction and rollback
// await something.findOneUpdate({_id: id}, {isDeleted: true}, {new: true, session})
// result jodi object hoy tahole na pele null return kore . !result use kora jabe
// jodi array return kore tahole [] return korbe result.length use korte hbe

// create teacher into db
const createTeacherIntoDB = async (
  password: string | undefined,
  email: string,
  payload: TTeacher,
  path: string
) => {
  const user: Partial<TUser> = {};
  user.password = password || (config.dp as string);
  user.role = 'teacher';
  user.email = email;

  // auto generat id
  user.id = await generateTeacherId();

  // const newUser = await UserModel.create(user);

  // payload.id = newUser.id;
  // payload.user = newUser._id;

  // const result = await Teacher.create(payload);
  // return result;

  const session = await mongoose.startSession();

  // teacher creation session
  
  try {
    session.startTransaction();
    
    console.log(user)
    // create user
    const newUser = await UserModel.create([user], { session });


    if (newUser.length <= 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create a user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const uploadResult = await sendImageToCloud(path, `${user.id}-${payload.name}`);
    payload.profileImg = uploadResult?.secure_url;

    const result = await Teacher.create([payload], { session });


    if (result.length <= 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create a teacher');
    }

    await session.commitTransaction();
    await session.endSession();


    return { user: newUser, teacher: result };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'User Create Failed');
  }
  
};

export const UserServices = {
  createStudentIntoDB,
  createTeacherIntoDB,
};
