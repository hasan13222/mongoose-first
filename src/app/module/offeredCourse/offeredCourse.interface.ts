import { Types } from "mongoose";

export type TWeekDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"; 
export interface TOfferedCourse {
    registeredSemester: Types.ObjectId;
    semester: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    department: Types.ObjectId;
    teacher: Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: TWeekDays[];
    startTime: string;
    endTime: string;
}
export interface TOfferedCourse {
    registeredSemester: Types.ObjectId;
    semester: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    department: Types.ObjectId;
    teacher: Types.ObjectId;
    maxCapacity: number;
    section: number;
    days: TWeekDays[];
    startTime: string;
    endTime: string;
}