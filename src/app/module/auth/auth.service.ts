import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TJwtPayload, TUserLoginDetails } from './auth.interface';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TUserLoginDetails) => {
  // check if user id exist
  const user = await UserModel.findOne({ id: payload.id }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not exist');
  }

  // check if user is deleted
  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
  }

  // check if user is blocked
  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are blocked');
  }

  // check if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Your password is incorrect');
  }

  // create access token to send to the client
  const jwtPayload: TJwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createAccessToken(jwtPayload);
  const refreshToken = createRefreshToken(jwtPayload);

  return {
    user: jwtPayload,
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: TJwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // check if user id exist
  const user = await UserModel.findOne({ id: userData.userId }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not exist');
  }

  // check if user is deleted
  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
  }

  // check if user is blocked
  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are blocked');
  }

  // check if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Your old password is incorrect');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findByIdAndUpdate(user._id, {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  });
  return null;
};

const refreshToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    config.refresh_token_secret as string,
  ) as JwtPayload;
  const { userId } = decoded;

  // check if user id exist
  const user = await UserModel.findOne({ id: userId });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not exist');
  }

  // check if user is deleted
  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
  }

  // check if user is blocked
  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are blocked');
  }

  // create access token to send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createAccessToken(jwtPayload);

  return {
    user: jwtPayload,
    accessToken,
  };
};

const forgetPassword = async (payload: { id: string }) => {
  // check if user id exist
  const user = await UserModel.findOne({ id: payload.id });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not exist');
  }

  // check if user is deleted
  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
  }

  // check if user is blocked
  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are blocked');
  }

  // create access token to send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: '30m',
    },
  );

  const resetLink = `http://localhost:3000?id=${user.id}&token=${accessToken}`;
  sendEmail(resetLink);
  console.log(resetLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  userId: string,
) => {
  // check if user id exist
  const user = await UserModel.findOne({ id: payload.id });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not exist');
  }

  if (user.id !== userId) {
    throw new AppError(StatusCodes.CONFLICT, 'User Id mismatch');
  }
  // check if user is deleted
  if (user.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
  }

  // check if user is blocked
  if (user.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are blocked');
  }

  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds as string),
  );
  const result = await UserModel.findByIdAndUpdate(user._id, {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  });
  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};

