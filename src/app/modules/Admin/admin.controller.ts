
import { Request, Response } from 'express'
import { AdminService } from './admin.service'
import pick from '../../../shared/pick'



const getAllFromDB = async (req: Request, res: Response) => {
    try {

        const filters = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber'])

        // console.log(req.query);
        const result = await AdminService.getAllFromDB(filters)
        res.status(200).json({
            success: true,
            message: "admin data fetched",
            data: result

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