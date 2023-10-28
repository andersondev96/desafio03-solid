import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";

export class InMemoryOrganizationRepository implements OrganizationRepository {

    public organizations: Organization[] = []

    async findByEmail(email: string) {
        const organization = this.organizations.find((item) => item.email === email)

        if (!organization) {
            return null
        }

        return organization
    }

     async create(data: Prisma.OrganizationCreateInput) {

        const organization = {
            id: 'organization-1',
            responsible: data.responsible,
            email: data.email,
            cep: data.cep,
            address: data.address,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            whatsapp: data.whatsapp ?? null,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.organizations.push(organization)

        return organization
    }

}