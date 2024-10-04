import { Schema, model } from "mongoose";
import { TRegisteredSemester } from "./registeredSemester.interface";
import { registeredSemesterStatus } from "./registeredSemester.constants";


const registeredSemesterSchema = new Schema<TRegisteredSemester>({
    semester: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Semester'
    },
    status: {
        type: String,
        enum: registeredSemesterStatus,
        required: true
    },
    minCredit: {
        type: Number,
        required: true
    },
    maxCredit: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
},
{timestamps: true}
)

export const RegisteredSemester = model<TRegisteredSemester>('RegisteredSemester', registeredSemesterSchema);