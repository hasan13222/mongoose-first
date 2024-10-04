import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { weekDays } from "./offeredCourse.constants";


const offeredCourseSchema = new Schema<TOfferedCourse>({
    registeredSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "RegisteredSemester"
    },
    semester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Semester"
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Faculty"
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Department"
    },
    teacher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Teacher"
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: [{
        type: String,
        enum: weekDays
    }],
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
}) 

export const OfferedCourseModel = model<TOfferedCourse>('OfferedCourse', offeredCourseSchema)