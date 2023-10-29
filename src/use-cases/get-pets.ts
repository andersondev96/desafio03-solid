import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(pet_id: string): Promise<Pet> {
    const pet = await this.petsRepository.findById(pet_id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return pet
  }
}
