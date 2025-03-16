import express, { Application, NextFunction, Request, Response } from 'express';
import cors from "cors";
import httpStatus from 'http-status';


import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { error } from 'console';


const app: Application = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Health server is running"
    })

})

app.use('/api/v1', router)
app.use(globalErrorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {

    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "api not found",
        error: {
            path: req.originalUrl,
            message: "your requested path is not found"

        }

    })
})


export default app;
