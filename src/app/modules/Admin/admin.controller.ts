
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { AdminService } from './admin.service'
import pick from '../../../shared/pick'
import { adminFilterableFields } from './admin.constant'
import { setFips } from 'crypto'
import sentResponse from '../../../shared/sentResponse'

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catcheAsync'


const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {


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


})

const getByIdFromDB = catchAsync(async (req: Request, res: Response,) => {
    const { id } = (req.params);

    const result = await AdminService.getByIdFromDB(id)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data fetched by id",

        data: result
    })


}
)
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = (req.params);
    console.log("id ", id);
    console.log("data ", req.body);

    const result = await AdminService.updateIntoDB(id, req.body)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data updated",

        data: result
    })



})



const deleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = (req.params);


    const result = await AdminService.deleteFromDB(id)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted",

        data: result
    })



})


const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = (req.params);


    const result = await AdminService.softDeleteFromDB(id)
    sentResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin data deleted",

        data: result
    })



})
    ;


export const AdminController = {
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB,
    softDeleteFromDB
}