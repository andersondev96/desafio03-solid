import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByCity(city: string) {
    return null
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      year: data.year,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      wide_environment: data.wide_environment,
      requirements: [],
      images: [],
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }
}
