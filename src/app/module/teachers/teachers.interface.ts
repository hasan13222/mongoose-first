// gurdian type
import { Types } from "mongoose";
import { TUserName } from "../student/student.interface";

// Teacher type Interface
export interface TTeacher {
  id: string;
  user: Types.ObjectId,
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
}
