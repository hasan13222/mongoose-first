import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodOptional, ZodString } from 'zod';

const validateGeneralRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      next();
    } catch (err) {
      next(err);
    }
  };
};

const validateRefineRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({body: req.body});

      next();
    } catch (err) {
      next(err);
    }
  };
};

const validateUserRoleRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body.userDetails);

      next();
    } catch (err) {
      next(err);
    }
  };
};

const validateUserRequest = (schema: ZodOptional<ZodString>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body.password);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const validateRequests = {
  validateGeneralRequest,
  validateUserRequest,
  validateUserRoleRequest,
  validateRefineRequest
};
