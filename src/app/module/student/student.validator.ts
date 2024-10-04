import Joi from "joi";



// UserName Schema
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required(),
  middleName: Joi.string()
    .optional()
    .pattern(/^[A-Za-z]*$/, '{#label} must be a string without any numbers'),
  lastName: Joi.string()
    .required()
});

// Guardian Schema
const gurdianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required()
});

// Local Guardian Schema
const localGurdianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required()
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  semesterId: Joi.string().required(),
  departmentId: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string()
    .valid('female', 'male')
    .required()
    .messages({ 'any.only': '{#value} is not a valid gender' }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({ 'any.only': '{#value} is not a valid blood group' }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  gurdian: gurdianSchema.required(),
  localGurdian: localGurdianSchema.required(),
  profileImg: Joi.string().optional(),
  
});

export default studentValidationSchema;
