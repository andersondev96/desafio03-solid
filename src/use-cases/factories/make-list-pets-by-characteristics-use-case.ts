import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetsByCharacteristicsUseCase } from '../list-pets-by-characteristics'

export function makeListPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const authenticationUseCase = new ListPetsByCharacteristicsUseCase(
    petsRepository,
  )

  return authenticationUseCase
}
