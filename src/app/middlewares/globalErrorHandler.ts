import { NextFunction, Request, Response } from "express"
import httpStatus from 'http-status';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.name || "something went wrong",
        error: err
        // path: req.originalUrl,
        // message: "Your requested path is not found!"

    })
}
export default globalErrorHandler;
