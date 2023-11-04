import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetsParamsSchema = z.object({
    pet_id: z.string(),
  })

  const { pet_id } = getPetsParamsSchema.parse(request.params)

  try {
    const getPetsUseCase = makeGetPetUseCase()

    const pet = await getPetsUseCase.execute(pet_id)

    return reply.status(200).send({
      pet,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
