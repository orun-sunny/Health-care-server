import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllFromDB = async (params: any) => {
    const andConditions: Prisma.AdminWhereInput[] = [];
    const adminSearchAbleFielelds = ['name', 'email'];

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

    }
    console.dir(andConditions, { depth: Infinity });
    const whereConditions = { AND: andConditions }
    const result = await prisma.admin.findMany({
        where: whereConditions
    });
    return result;
}

export const AdminService = {
    getAllFromDB
}