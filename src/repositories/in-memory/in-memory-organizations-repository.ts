import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async findById(id: string) {
    const organization = this.organizations.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.organizations.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByLatitudeLongitude(latitude: number, longitude: number) {
    const organizations = this.organizations.filter(
      (item) =>
        Number(item.latitude) === latitude &&
        Number(item.longitude) === longitude,
    )

    return organizations
  }

  async findByCity(city: string) {
    const organizations = this.organizations.filter(
      (item) => item.city === city,
    )

    return organizations
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      responsible: data.responsible,
      email: data.email,
      cep: data.cep,
      address: data.address,
      city: data.city || null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      whatsapp: data.whatsapp ?? null,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.organizations.push(organization)

    return organization
  }
}
