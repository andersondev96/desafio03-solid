import { PetsRepository } from '@/repositories/pets-repository'
import {
  Pet,
  PetAge,
  PetEnergyLevel,
  PetIndependenceLevel,
  PetSize,
  PetSpaceNeed,
} from '@prisma/client'

interface FiltersRequest {
  petAge: PetAge
  petSize: PetSize
  petEnergyLevel: PetEnergyLevel
  petIndependenceLevel: PetIndependenceLevel
  petSpaceNeed: PetSpaceNeed
}

interface ListPetsByCharacteristicsUseCaseRequest {
  city: string
  filters?: FiltersRequest
}

export class ListPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filters,
  }: ListPetsByCharacteristicsUseCaseRequest): Promise<Pet[]> {
    const pets = await this.petsRepository.filters(city, filters)

    return pets
  }
}
