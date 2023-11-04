import { makeListPetsByCityUseCase } from '@/use-cases/factories/make-list-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listPetsByCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = listPetsByCityQuerySchema.parse(request.query)

  const listPetsByCityUseCase = makeListPetsByCityUseCase()

  await listPetsByCityUseCase.execute({
    city,
  })

  return reply.status(200).send()
}
