import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  findByCity(city: string): Promise<Organization[]>
  findByLatitudeLongitude(
    latitude: number,
    longitude: number,
  ): Promise<Organization[]>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
