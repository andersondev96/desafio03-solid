import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrganizationsRepository } from '../organizations-repository'
import { FilterValues, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(public organizationsRepository: OrganizationsRepository) {}

  public pets: Pet[] = []

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByOrganization(organization_id: string) {
    const pets = this.pets.filter(
      (item) => item.organization_id === organization_id,
    )

    return pets
  }

  async filters(city: string, data: FilterValues) {
    const organizations = (
      await this.organizationsRepository.findByCity(city)
    ).reduce((acc, org) => [org.id, ...acc], [] as string[])

    this.pets = this.pets.filter((pet) =>
      organizations.includes(pet.organization_id),
    )

    if (data) {
      this.pets = this.pets.filter(
        (item) =>
          item.petSize === data.petSize ||
          item.petEnergyLevel === data.petEnergyLevel ||
          item.petIndependenceLevel === data.petIndependenceLevel ||
          item.petAge === data.petAge,
      )
    }

    return this.pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      petAge: data.petAge,
      petSize: data.petSize,
      petEnergyLevel: data.petEnergyLevel,
      petIndependenceLevel: data.petIndependenceLevel,
      petSpaceNeed: data.petSpaceNeed,
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      images: Array.isArray(data.images) ? data.images : [],
      created_at: new Date(),
      organization_id: data.organization_id,
    }

    this.pets.push(pet)

    return pet
  }
}
