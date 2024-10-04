import { Schema, model } from 'mongoose';
import { TUserName } from '../student/student.interface';
import { TTeacher } from './teachers.interface';

// userNameSchema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name max length is 20 characters']
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

// TeacherSchema - main schema
const teacherSchema = new Schema<TTeacher>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'First name and last name are required'],
    },
    gender: {
      type: String,
      enum: {
        message: '{VALUE} is not a valid gender',
        values: ['female', 'male'],
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: Date,
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: String,
  },
  { timestamps: true },
);


// Teacher Model
export const Teacher = model<TTeacher>('Teacher', teacherSchema)