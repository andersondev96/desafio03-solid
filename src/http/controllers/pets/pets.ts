import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makePetUseCase } from '@/use-cases/factories/make-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function Pets(request: FastifyRequest, reply: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    petAge: z.enum(['YOUNG', 'TEEN', 'ADULT']),
    petSize: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    petEnergyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    petIndependenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    petSpaceNeed: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    requirements: z.string().array(),
    images: z.string().array(),
  })

  const {
    name,
    description,
    petAge,
    petSize,
    petEnergyLevel,
    petIndependenceLevel,
    petSpaceNeed,
    requirements,
    images,
  } = petBodySchema.parse(request.body)

  try {
    const petUseCase = makePetUseCase()

    await petUseCase.execute({
      name,
      description,
      petAge,
      petSize,
      petEnergyLevel,
      petIndependenceLevel,
      petSpaceNeed,
      requirements,
      images,
      organization_id: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ err: err.message })
    }

    throw err
  }
}
