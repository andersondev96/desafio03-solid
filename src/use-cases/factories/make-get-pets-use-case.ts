import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetsUseCase } from '../get-pets'

export function makeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const authenticationUseCase = new GetPetsUseCase(petsRepository)

  return authenticationUseCase
}
