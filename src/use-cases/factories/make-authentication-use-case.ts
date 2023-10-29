import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticationUseCase } from '../authentication'

export function makeAuthenticationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticationUseCase = new AuthenticationUseCase(
    organizationsRepository,
  )

  return authenticationUseCase
}
