import { z } from 'zod';

export const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
});

const teacherValidationSchema = z.object({
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().optional(),
  email: z.string(),
  contactNumber: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
});

export default teacherValidationSchema;