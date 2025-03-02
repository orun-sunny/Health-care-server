
import { Request, Response } from 'express'
import { AdminService } from './admin.service'




const getAllFromDB = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        const result = await AdminService.getAllFromDB(req.query)
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