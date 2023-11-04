import { Pet, Prisma } from '@prisma/client'

export interface FilterValues {
  petAge: string
  petSize: string
  petEnergyLevel: string
  petIndependenceLevel: string
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByOrganization(organization_id: string): Promise<Pet[]>
  filters(city: string, data?: FilterValues): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
