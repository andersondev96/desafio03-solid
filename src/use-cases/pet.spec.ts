import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetUseCase } from './pet'

let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository
let sut: PetUseCase

describe('Authentication use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new PetUseCase(organizationsRepository, petsRepository)
  })

  it('should be able create pet', async () => {
    const organizationCreated = await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'john@example.com',
      cep: '111111',
      address: 'Rua 1',
      latitude: 99,
      longitude: 99,
      whatsapp: '1222525425',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'Buddy',
      description:
        'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
      year: 2,
      size: 'Medium',
      energy: 4,
      independence: 'Low',
      wide_environment: true,
      requirements: ['Regular exercise', 'Grooming', 'Obedience training'],
      images: ['buddy_image1.jpg', 'buddy_image2.jpg', 'buddy_image3.jpg'],
      organization_id: organizationCreated.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able create pet when organization not exists', async () => {
    await expect(() =>
      sut.execute({
        name: 'Buddy',
        description:
          'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
        year: 2,
        size: 'Medium',
        energy: 4,
        independence: 'Low',
        wide_environment: true,
        requirements: ['Regular exercise', 'Grooming', 'Obedience training'],
        images: ['buddy_image1.jpg', 'buddy_image2.jpg', 'buddy_image3.jpg'],
        organization_id: 'organization-not-exists',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
