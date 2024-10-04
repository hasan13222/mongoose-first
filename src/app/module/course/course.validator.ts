import { z } from "zod";

const preRequisiteCourseValidation = z.object({
    course: z.string(),
    isDeleted: z.boolean().default(false).optional()
})

const createCourseValidation = z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().default(false).optional()
})

const updateCourseValidation = z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(preRequisiteCourseValidation).optional(),
    isDeleted: z.boolean().default(false).optional()
})

const assignTeacherValidation = z.object({
    teachers: z.array(z.string())
})


export const CourseValidators = {
    createCourseValidation,
    updateCourseValidation,
    assignTeacherValidation
}