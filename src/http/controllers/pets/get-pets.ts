import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetsUseCase } from '@/use-cases/factories/make-get-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetsParamsSchema = z.object({
    pet_id: z.string(),
  })

  const { pet_id } = getPetsParamsSchema.parse(request.params)

  try {
    const getPetsUseCase = makeGetPetsUseCase()

    await getPetsUseCase.execute(pet_id)

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
