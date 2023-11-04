import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface ListPetsByCityRequest {
  city: string
}

export class ListPetsByCity {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city }: ListPetsByCityRequest): Promise<Pet[]> {
    const pets = await this.petsRepository.filters(city)

    return pets
  }
}
