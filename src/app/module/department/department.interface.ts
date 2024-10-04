import { Types } from "mongoose";

export interface TDepartment {
    name: string;
    facultyId: Types.ObjectId;
}