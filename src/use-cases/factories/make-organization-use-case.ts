import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { OrganizationUseCase } from '../organizations'

export function makeOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const organizationUseCase = new OrganizationUseCase(organizationsRepository)

  return organizationUseCase
}
