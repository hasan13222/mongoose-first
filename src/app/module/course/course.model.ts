import { Schema, model } from "mongoose";
import { TCourse, TCourseTeacher, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})
const courseSchema = new Schema<TCourse>({
    title: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },
    prefix: {
        type: String, 
        required: true,
        trim: true,
    },
    code: {
        type: Number, 
        required: true,
    },
    credits: {
        type: Number, 
        required: true,
    },
    preRequisiteCourses: {
        type: [preRequisiteCoursesSchema]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})

const courseTeacherSchema = new Schema<TCourseTeacher>({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Course'
    },
    teachers: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Teacher'
    }
})

export const Course = model<TCourse>('Course', courseSchema);

export const CourseTeacher = model<TCourseTeacher>('CourseTeacher', courseTeacherSchema);
