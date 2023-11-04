import {
  Pet,
  PetAge,
  PetEnergyLevel,
  PetIndependenceLevel,
  PetSize,
  PetSpaceNeed,
  Prisma,
} from '@prisma/client'

export interface FilterValues {
  petAge: PetAge
  petSize: PetSize
  petEnergyLevel: PetEnergyLevel
  petIndependenceLevel: PetIndependenceLevel
  petSpaceNeed: PetSpaceNeed
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByOrganization(organization_id: string): Promise<Pet[]>
  filters(city: string, data?: FilterValues): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
