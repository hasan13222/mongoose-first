import { Schema, model } from 'mongoose';
import {
  TGurdian,
  LocalGurdian,
  TStudent,
  TUserName,
  StudentCustomModel,
  StudentMethods,
} from './student.interface';

import validator from 'validator';

// userNameSchema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name max length is 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() +
          value.toLocaleLowerCase().substring(1);
        return firstNameStr === value;
      },
      message: '{VALUE} must be Capitalized',
    },
  },
  middleName: {
    type: String,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} must be String not any number',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

// gurdianSchema
const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

// localGurdianSchema
const localGurdianSchema = new Schema<LocalGurdian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

// studentSchema - main schema
const studentSchema = new Schema<TStudent, StudentCustomModel, StudentMethods>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:false,
      ref: 'Semester',
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      index:false,
      ref: 'Department',
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
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
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
    gurdian: {
      type: gurdianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGurdian: {
      type: localGurdianSchema,
      required: [true, 'Local guardian details are required'],
    },
    profileImg: String,
  },
  { timestamps: true },
);

studentSchema.methods.isUserExists = async function (id) {
  const existingUser = await StudentModel.findOne({ id: id });
  return existingUser;
};

// Student Model
export const StudentModel = model<TStudent, StudentCustomModel>(
  'Student',
  studentSchema,
);
