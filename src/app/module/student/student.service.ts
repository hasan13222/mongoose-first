import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSinlgeStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id })
    .populate('semesterId')
    .populate({
      path: 'departmentId',
      populate: {
        path: 'facultyId',
      },
    });
  return result;
};

const updateSinlgeStudentFromDB = async (
  id: string,
  updateDoc: Partial<TStudent>,
) => {
  const { name, gurdian, localGurdian, ...remainingData } = updateDoc;
  const modifiedUpdateDoc: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateDoc[`name.${key}`] = value;
    }
  }
  if (gurdian && Object.keys(gurdian).length > 0) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdateDoc[`gurdian.${key}`] = value;
    }
  }
  if (localGurdian && Object.keys(localGurdian).length > 0) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedUpdateDoc[`localGurdian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate({ id }, modifiedUpdateDoc, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSinlgeStudentFromDB,
  updateSinlgeStudentFromDB,
};
