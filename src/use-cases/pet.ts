import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PetUseCaseRequest {
  name: string
  description: string
  year: number
  size: string
  energy: number
  independence: string
  wide_environment: boolean
  requirements: string[]
  images: string[]
  organization_id: string
}

interface PetUseCaseResponse {
  pet: Pet
}

export class PetUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    description,
    year,
    size,
    energy,
    independence,
    wide_environment,
    requirements,
    images,
    organization_id,
  }: PetUseCaseRequest): Promise<PetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organization_id)

    console.log(organization)

    if (!organization) {
      throw new ResourceNotFoundError()
    }
    const pet = await this.petsRepository.create({
      name,
      description,
      year,
      size,
      energy,
      independence,
      wide_environment,
      requirements,
      images,
      organization_id,
    })

    return {
      pet,
    }
  }
}
