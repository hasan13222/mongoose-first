import mongoose from 'mongoose';
import { TErrorSource } from '../interface/error.interface';

const handleCastError = (err: mongoose.Error.CastError): TErrorSource => {
  return [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
};

export default handleCastError;
