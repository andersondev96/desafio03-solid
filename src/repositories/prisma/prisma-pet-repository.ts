import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FilterValues, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findByOrganization(organization_id: string) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id,
      },
    })

    return pets
  }

  async filters(city: string, data?: FilterValues | undefined) {
    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
        ...(data || undefined),
      },
      include: {
        organization: {
          select: {
            city: true,
          },
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
