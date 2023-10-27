import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";

export class PrismaOrganizationRepository implements OrganizationRepository{

    async findByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email
            }
        })

        return organization
    }

    async create(data: Prisma.OrganizationCreateInput) {
       const organization = await prisma.organization.create({
        data
       })

       return organization
    }

} 