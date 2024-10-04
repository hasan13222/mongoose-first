import jwt from 'jsonwebtoken';
import config from '../../config';
import { TJwtPayload } from './auth.interface';

export const createAccessToken = (jwtPayload: TJwtPayload) => {
  return jwt.sign(jwtPayload, config.access_token_secret as string, {
    expiresIn: config.access_token_expires_in,
  });
};

export const createRefreshToken = (jwtPayload: TJwtPayload) => {
  return jwt.sign(jwtPayload, config.refresh_token_secret as string, {
    expiresIn: config.refresh_token_expires_in,
  });
};
