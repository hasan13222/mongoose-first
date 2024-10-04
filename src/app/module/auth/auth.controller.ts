import { Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginAuth = catchAsync(async (req: Request, res: Response) => {
  const userLoginDetails = req.body;

  const result = await AuthServices.loginUser(userLoginDetails);
  res.cookie('refreshToken', result.refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, { message: 'Your login is successful', data: result });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user;
  const userData = { userId, role };

  const result = await AuthServices.changePassword(userData, req.body);
  sendResponse(res, {
    message: 'Your password changed successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    message: 'Access token recieved successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.forgetPassword(req.body);
  sendResponse(res, {
    message: 'Reset Password link generated successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.resetPassword(req.body, req.user.userId);
  sendResponse(res, {
    message: 'Reset Password link generated successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginAuth,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword
};
