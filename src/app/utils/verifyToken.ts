import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import jwt from 'jsonwebtoken';

export const verifyJwtToken = async (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (err) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'unauthorized');
  }
};
