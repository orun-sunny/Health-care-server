import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleFielelds } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";





const getAllFromDB = async (params: any, options: any) => {
    const { limit, page, skip } = paginationHelper.calculatePagnation(options);
    const { searchTerm, ...filterData } = params;
    const andConditions: Prisma.AdminWhereInput[] = [];



    console.log(params);
    if (params.searchTerm) {
        andConditions.push(
            {
                OR: adminSearchAbleFielelds.map(field => ({
                    [field]: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                }))
            })

    };


    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }

            }))
        })
    }




    // console.dir(andConditions, { depth: Infinity });
    const whereConditions = { AND: andConditions }
    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder ? {
                [options.sortBy]: options.sortOrder
            } : {
                createdAt: 'desc'
            }

    });
    const total = await prisma.admin.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}
const getByIdFromDB = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id
        }
    })
    return result;
    console.log('get by id');

}

export const AdminService = {
    getAllFromDB,
    getByIdFromDB
}