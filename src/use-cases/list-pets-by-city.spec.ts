import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetsByCity } from './list-pets-by-city'

let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository
let sut: ListPetsByCity

describe('List Pets By City Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new ListPetsByCity(petsRepository)
  })

  it('should be able list pets by city', async () => {
    const organizationCreated = await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'john@example.com',
      cep: '111111',
      address: 'Rua 1',
      latitude: 99,
      longitude: 99,
      city: 'São Paulo',
      whatsapp: '1222525425',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      name: 'Buddy',
      description:
        'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
      petAge: 'ADULT',
      petSize: 'BIG',
      petEnergyLevel: 'HIGH',
      petIndependenceLevel: 'HIGH',
      petSpaceNeed: 'BIG',
      requirements: ['Regular exercise', 'Grooming', 'Obedience training'],
      images: ['buddy_image1.jpg', 'buddy_image2.jpg', 'buddy_image3.jpg'],
      organization_id: organizationCreated.id,
    })

    const listPets = await sut.execute({
      city: 'São Paulo',
    })

    expect(listPets).toHaveLength(1)
    expect(listPets).toEqual([expect.objectContaining({ name: 'Buddy' })])
  })
})
