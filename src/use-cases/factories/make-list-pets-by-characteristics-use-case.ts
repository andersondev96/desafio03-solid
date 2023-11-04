import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetsByCharacteristicsUseCase } from '../list-pets-by-characteristics'

export function makeListPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const listPetsByCharacteristicsUseCase = new ListPetsByCharacteristicsUseCase(
    petsRepository,
  )

  return listPetsByCharacteristicsUseCase
}
