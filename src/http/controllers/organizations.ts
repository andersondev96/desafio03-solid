import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository"
import { OrganizationEmailAlreadyExistsError } from "@/use-cases/errors/organization-email-already-exists-error"
import { OrganizationUseCase } from "@/use-cases/organizations"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function organization(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        responsible: z.string(),
        email: z.string().email(),
        cep: z.string(),
        address: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        whatsapp: z.string(),
        password: z.string().min(6),
      })
    
      const {
        responsible,
        email,
        cep,
        address,
        latitude,
        longitude,
        whatsapp,
        password,
      } = registerBodySchema.parse(request.body)

      const organizationRepository = new PrismaOrganizationRepository()
      const organizationUseCase = new OrganizationUseCase(organizationRepository)
    
      try {
        await organizationUseCase.execute({
            responsible,
            email,
            cep,
            address,
            latitude,
            longitude,
            whatsapp,
            password
        })
        
      } catch (err) {
        if (err instanceof OrganizationEmailAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
      }
    
      return reply.status(201).send()
}