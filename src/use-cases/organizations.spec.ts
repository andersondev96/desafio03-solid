import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationEmailAlreadyExistsError } from './errors/organization-email-already-exists-error'
import { OrganizationUseCase } from './organizations'

let organizationsRepository: OrganizationsRepository
let sut: OrganizationUseCase

describe('Organizations use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new OrganizationUseCase(organizationsRepository)
  })

  it('should hash organization register password upon registration', async () => {
    const { organization } = await sut.execute({
      responsible: 'John Doe',
      email: 'john.doe@example.com',
      cep: '9999999',
      address: 'Rua principal',
      latitude: 999,
      longitude: 999,
      city: 'São Paulo',
      whatsapp: '99999999',
      password: '123456',
    })

    const isPasswordCorrectlyHash = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('should not be able to register organization with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      responsible: 'John Doe',
      email,
      cep: '9999999',
      address: 'Rua principal',
      latitude: 999,
      longitude: 999,
      whatsapp: '99999999',
      password: '123456',
    })

    await expect(
      sut.execute({
        responsible: 'John Doe',
        email,
        cep: '9999999',
        address: 'Rua principal',
        latitude: 999,
        longitude: 999,
        whatsapp: '99999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrganizationEmailAlreadyExistsError)
  })

  it('should able to register organization', async () => {
    const { organization } = await sut.execute({
      responsible: 'John Doe',
      email: 'john.doe@example.com',
      cep: '9999999',
      address: 'Rua principal',
      latitude: 999,
      longitude: 999,
      whatsapp: '99999999',
      password: '123456',
    })

    expect(organization).toHaveProperty('id')
  })
})
