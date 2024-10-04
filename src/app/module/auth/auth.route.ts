import express from 'express';
import { validateRequests } from '../../middleware/validateRequest';
import { AuthValidators } from './auth.validator';
import { AuthControllers } from './auth.controller';
import { verifyToken } from '../../middleware/auth';

const { validateGeneralRequest } = validateRequests;
const {
  userLoginDetailsValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
} = AuthValidators;

const router = express.Router();

router.post(
  '/login',
  validateGeneralRequest(userLoginDetailsValidation),
  AuthControllers.loginAuth,
);
router.post('/change-password', verifyToken(), AuthControllers.changePassword);

router.get('/refresh-token', AuthControllers.refreshToken);

router.post(
  '/forget-password',
  validateGeneralRequest(forgetPasswordValidation),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  verifyToken(),
  validateGeneralRequest(resetPasswordValidation),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
