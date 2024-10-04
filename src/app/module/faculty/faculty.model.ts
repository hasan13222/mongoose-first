import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const facultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// check before faculty creattion that it already exists
facultySchema.pre('save', async function (next){
  const isFacultyExists = await FacultyModel.findOne({name: this.name});
  if (isFacultyExists){
    throw new Error("Faculty already exists")
  } else {
    next();
  }
})

// check faculty before updating
facultySchema.pre('findOneAndUpdate', async function (next){
  const query = this.getQuery();
  const isFacultyExists = await FacultyModel.findOne(query);
  if (!isFacultyExists){
    throw new AppError(StatusCodes.NOT_FOUND, 'Department does not exist');
  } else {
    next();
  }
})

export const FacultyModel = model<TFaculty>('Faculty', facultySchema);
