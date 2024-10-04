import { z } from "zod"


const userLoginDetailsValidation = z.object({
    id: z.string({required_error: "Id is required"}),
    password: z.string({required_error: "Password is required"}),
})

const forgetPasswordValidation = z.object({
    id: z.string({required_error: "Id is required"}),
})

const resetPasswordValidation = z.object({
    id: z.string({required_error: "Id is required"}),
    newPassword: z.string(),
})

export const AuthValidators = {
    userLoginDetailsValidation,
    forgetPasswordValidation,
    resetPasswordValidation
}