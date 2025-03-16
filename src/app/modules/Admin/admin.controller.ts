
import { NextFunction, Request, Response } from 'express'
import { AdminService } from './admin.service'
import pick from '../../../shared/pick'
import { adminFilterableFields } from './admin.constant'
import { setFips } from 'crypto'
import sentResponse from '../../../shared/sentResponse'

import httpStatus from 'http-status';

const getAllFromDB = async (req: Request, res: Response) => {
    try {

        const filters = pick(req.query, adminFilterableFields)
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

        console.log('filters ', filters);
        console.log('options ', options);
        const result = await AdminService.getAllFromDB(filters, options)


        sentResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data fetched",
            meta: result.meta,
            data: result.data
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.name || "something went worng",
            error: err
        })

    }
}

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = (req.params);
    try {
        const result = await AdminService.getByIdFromDB(id)
        sentResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data fetched by id",

            data: result
        })
    }
    catch (err) {
        next(err)
    }

}

const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = (req.params);
    console.log("id ", id);
    console.log("data ", req.body);
    try {
        const result = await AdminService.updateIntoDB(id, req.body)
        sentResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data updated",

            data: result
        })
    }
    catch (err) {
        next(err)

        // res.status(500).json({
        //     success: false,
        //     message: err.name || "something went worng",
        //     error: err
        // })


    }

};



const deleteFromDB = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = (req.params);

    try {
        const result = await AdminService.deleteFromDB(id)
        sentResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted",

            data: result
        })
    }
    catch (err) {

        next(err)


    }

};


const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = (req.params);

    try {
        const result = await AdminService.softDeleteFromDB(id)
        sentResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin data deleted",

            data: result
        })
    }
    catch (err) {

        next(err)


    }

};


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}