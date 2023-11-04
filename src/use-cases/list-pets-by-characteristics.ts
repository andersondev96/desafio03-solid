import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FiltersRequest {
  petAge: string
  petSize: string
  petEnergyLevel: string
  petIndependenceLevel: string
  petSpaceNeed: string
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
