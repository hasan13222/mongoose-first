import { FacultyModel } from './faculty.model';
import { TFaculty } from './faculty.interface';

const createFacultyIntoDB = async (payload: TFaculty) => {
  const result = await FacultyModel.create(payload);
  return result;
};

const getAllFacultyFromDB = async () => {
  const result = await FacultyModel.find();
  return result;
};

const getSingleFacultyFromDB = async (FacultyId: string) => {
  const result = await FacultyModel.findById(FacultyId);
  return result;
};

const updateSingleFacultyInDB = async (
  FacultyId: string,
  updateDoc: object,
) => {
  const result = await FacultyModel.findOneAndUpdate(
    { _id: FacultyId }, updateDoc, {new: true}
  );
  return result;
};

export const FacultyServices = {
  createFacultyIntoDB,
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyInDB,
};
