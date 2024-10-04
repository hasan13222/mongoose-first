// gurdian type

import { Model, Types } from "mongoose";

// user name type
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

// local gurdian type
export type LocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// Student type Interface
export interface TStudent {
  id: string;
  semesterId: Types.ObjectId,
  departmentId: Types.ObjectId,
  user: Types.ObjectId,
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: LocalGurdian;
  profileImg?: string;
  status: 'active' | 'blocked';
}

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
}

export type StudentCustomModel = Model<TStudent, Record<string, never>, StudentMethods>
