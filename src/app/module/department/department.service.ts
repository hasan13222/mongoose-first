import { TDepartment } from "./department.interface";
import { DepartmentModel } from "./department.model";


const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await DepartmentModel.create(payload);
  return result;
};

const getAllDepartmentFromDB = async () => {
  const result = await DepartmentModel.find().populate('facultyId');
  return result;
};

const getSingleDepartmentFromDB = async (DepartmentId: string) => {
  const result = await DepartmentModel.findById(DepartmentId).populate('facultyId');
  return result;
};

const updateSingleDepartmentInDB = async (
  DepartmentId: string,
  updateDoc: object,
) => {
  const result = await DepartmentModel.findOneAndUpdate(
    { _id: DepartmentId }, updateDoc, {new: true}
  );
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateSingleDepartmentInDB,
};
