import { z } from 'zod';
import { weekDays } from './offeredCourse.constants';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const createOfferedCourseValidationSchema = z.object({
  body: z
  .object({
    registeredSemester: z.string(),
    semester: z.string(),
    course: z.string(),
    faculty: z.string(),
    department: z.string(),
    teacher: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum(weekDays as [string, ...string[]])),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  })
  .refine(
    ({ startTime, endTime }) => {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      return end > start;
    },
    { message: 'Start time should be before end time' },
  )
})

const updateOfferedCourseValidationSchema = z.object({
  body: z
  .object({
    teacher: z.string(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum(weekDays as [string, ...string[]])),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  })
  .refine(
    ({ startTime, endTime }) => {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      return end > start;
    },
    { message: 'Start time should be before end time' },
  )
})

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
