import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticationUseCase } from './authentication'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: OrganizationsRepository
let sut: AuthenticationUseCase

describe('Authentication use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticationUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'john@example.com',
      cep: '111111',
      address: 'Rua 1',
      latitude: 99,
      longitude: 99,
      whatsapp: '1222525425',
      password_hash: await hash('123456', 6),
    })

    const { organization } = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      responsible: 'John Doe',
      email: 'john@example.com',
      cep: '111111',
      address: 'Rua 1',
      latitude: 99,
      longitude: 99,
      whatsapp: '1222525425',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
