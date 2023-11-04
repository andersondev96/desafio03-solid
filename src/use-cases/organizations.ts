import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationEmailAlreadyExistsError } from './errors/organization-email-already-exists-error'

interface OrganizationUseCaseRequest {
  responsible: string
  email: string
  cep: string
  address: string
  latitude: number
  longitude: number
  city?: string
  whatsapp: string
  password: string
}

interface OrganizationUseCaseReturn {
  organization: Organization
}

export class OrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    responsible,
    email,
    cep,
    address,
    latitude,
    longitude,
    city,
    whatsapp,
    password,
  }: OrganizationUseCaseRequest): Promise<OrganizationUseCaseReturn> {
    const password_hash = await hash(password, 6)

    const emailAlreadyExists =
      await this.organizationsRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new OrganizationEmailAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      responsible,
      email,
      cep,
      address,
      latitude,
      longitude,
      city,
      whatsapp,
      password_hash,
    })

    return {
      organization,
    }
  }
}
