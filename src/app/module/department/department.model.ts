import { Schema, model } from 'mongoose';
import { TDepartment } from './department.interface';
import AppError from '../../errors/AppError';

const departmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

// check department that it already exists
departmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await DepartmentModel.findOne({ name: this.name });
  if (isDepartmentExists) {
    throw new Error('Department already exists');
  } else {
    next();
  }
});



// check department before updating
departmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await DepartmentModel.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(404, 'Department does not exist');
  } else {
    next();
  }
});

export const DepartmentModel = model<TDepartment>(
  'Department',
  departmentSchema,
);
