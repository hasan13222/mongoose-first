import {Response} from "express"
import { StatusCodes } from "http-status-codes";

export const sendResponse = <T>(res: Response, data: {status?: number; success?: boolean, message?: string; data: T}) => {
    data.status = data.status || StatusCodes.OK;
    data.success = data.success || true;
    data.message = data.message || "Your operation is successful"
    return res.status(data.status).json({
        success: data.success,
        message: data.message,
        data: data.data
    })
}

