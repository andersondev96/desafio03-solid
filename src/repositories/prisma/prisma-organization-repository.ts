import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  findByCity(city: string): Promise<
    {
      id: string
      responsible: string
      email: string
      cep: string
      address: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
      city: string | null
      whatsapp: string | null
      password_hash: string
      created_at: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  findByLatitudeLongitude(
    latitude: number,
    longitude: number,
  ): Promise<
    {
      id: string
      responsible: string
      email: string
      cep: string
      address: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
      city: string | null
      whatsapp: string | null
      password_hash: string
      created_at: Date
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
