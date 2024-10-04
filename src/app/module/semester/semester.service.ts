import mongoose from 'mongoose';
import { semesterNameCodeMapper } from './semester.constants';
import { TSemester } from './semester.interface';
import { SemesterModel } from './semester.model';

const createSemesterIntoDB = async (payload: TSemester) => {
  if (semesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Name or Code');
  }

  const result = await SemesterModel.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await SemesterModel.find();
  return result;
};

const getSingleSemesterFromDB = async (semesterId: string) => {
  const semesterObjId = mongoose.Types.ObjectId;
  const result = await SemesterModel.findOne({
    _id: new semesterObjId(semesterId),
  });
  return result;
};

const updateSingleSemesterInDB = async (
  semesterId: string,
  updateDoc: object,
) => {
  const semesterObjId = mongoose.Types.ObjectId;
  const result = await SemesterModel.findOneAndUpdate(
    { _id: new semesterObjId(semesterId) },
    {
      $set: updateDoc,
    },
  );
  return result;
};

export const SemesterServices = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSingleSemesterInDB,
};
