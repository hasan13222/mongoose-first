import { Types } from "mongoose";

export type RegisteredSemesterStatus = "Upcoming" | "Ongoing" | "Ended";
export interface TRegisteredSemester {
    semester: Types.ObjectId;
    status: RegisteredSemesterStatus;
    minCredit: number;
    maxCredit: number;
    startDate: Date;
    endDate: Date;
}