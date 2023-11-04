import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { OrganizationUseCase } from '../organizations'

export function makeOrganizationUseCase() {
  const organizationsUseCase = new PrismaOrganizationsRepository()
  const authenticationUseCase = new OrganizationUseCase(organizationsUseCase)

  return authenticationUseCase
}
