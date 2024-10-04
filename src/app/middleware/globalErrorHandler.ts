import { ErrorRequestHandler, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import config from '../config';
import { TErrorSource } from '../interface/error.interface';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction,
) => {
  if (err) {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong';

    let errorSources: TErrorSource = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ];

    if (err instanceof ZodError) {
      errorSources = handleZodError(err);
      message = 'Validation Error';
      statusCode = StatusCodes.BAD_REQUEST;
    }

    if(err?.name === 'ValidationError'){
      errorSources = handleValidationError(err);
      message = 'Validation Error';
      statusCode = StatusCodes.BAD_REQUEST;
    }

    if(err?.name === 'CastError'){
      errorSources = handleCastError(err);
      message = 'Invalid Id';
      statusCode = StatusCodes.BAD_REQUEST;
    }

    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      stack: config.node_env === 'Development' ? err.stack : null,
    });
  } else {
    next();
  }
};
