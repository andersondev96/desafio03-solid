import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'
import { ListPetsByCity } from '../list-pets-by-city'

export function makeListPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const authenticationUseCase = new ListPetsByCity(petsRepository)

  return authenticationUseCase
}
