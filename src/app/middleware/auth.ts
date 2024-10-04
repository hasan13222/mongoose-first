import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';
import { verifyJwtToken } from '../utils/verifyToken';

export const verifyToken = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if token is missing
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    // check if the token is valid
    const decoded = await verifyJwtToken(token, config.access_token_secret as string);

    const { userId, role, iat } = decoded as JwtPayload;

    // checking if the user is exist
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
    }

    if (requiredRoles.length > 0 && requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    // check if the password changed before updating access token
    if(user?.passwordChangedAt){
      const passwordChangedAt = new Date(user.passwordChangedAt);
      if(passwordChangedAt.getTime()/1000 > (iat as number) ){
        throw new AppError(StatusCodes.UNAUTHORIZED, 'please login to get access');
      }
    } 

    req.user = decoded as JwtPayload;
    next();
  });
};
