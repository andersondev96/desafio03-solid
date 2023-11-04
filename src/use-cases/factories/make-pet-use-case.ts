import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PetUseCase } from '../pet'

export function makePetUseCase() {
  const organizationsUseCase = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const authenticationUseCase = new PetUseCase(
    organizationsUseCase,
    petsRepository,
  )

  return authenticationUseCase
}
