import { makeListPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-list-pets-by-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListPetsByCharacteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listPetsByCharacteristicsQuerySchema = z.object({
    city: z.string(),
    petAge: z.enum(['YOUNG', 'TEEN', 'ADULT']),
    petSize: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    petEnergyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    petIndependenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    petSpaceNeed: z.enum(['SMALL', 'MEDIUM', 'BIG']),
  })

  const {
    city,
    petAge,
    petSize,
    petEnergyLevel,
    petIndependenceLevel,
    petSpaceNeed,
  } = listPetsByCharacteristicsQuerySchema.parse(request.query)

  const listPetsByCharacteristicsUseCase =
    makeListPetsByCharacteristicsUseCase()

  await listPetsByCharacteristicsUseCase.execute({
    city,
    filters: {
      petAge,
      petSize,
      petEnergyLevel,
      petIndependenceLevel,
      petSpaceNeed,
    },
  })

  return reply.status(200).send()
}
