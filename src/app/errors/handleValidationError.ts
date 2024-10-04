import mongoose from "mongoose";
import { TErrorSource } from "../interface/error.interface";

const handleValidationError = (err: mongoose.Error.ValidationError): TErrorSource => {
    const errorSources: TErrorSource = Object.values(err.errors).map(item => {
        return {
            path: item?.path,
            message: item?.message
        }
    })

    return errorSources;
}

export default handleValidationError