
import { Request, Response } from 'express'
import { AdminService } from './admin.service'
import pick from '../../../shared/pick'
import { adminFilterableFields } from './admin.constant'



const getAllFromDB = async (req: Request, res: Response) => {
    try {

        const filters = pick(req.query, adminFilterableFields)
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

        console.log('filters ', filters);
        console.log('options ', options);
        const result = await AdminService.getAllFromDB(filters, options)
        res.status(200).json({
            success: true,
            message: "admin data fetched",
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

export const AdminController = {
    getAllFromDB
}