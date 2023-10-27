import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import fastify from 'fastify'
import { z } from 'zod'

export const app = fastify()

app.post('/organizations', async (request, reply) => {
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

  const emailAlreadyExists = await prisma.organization.findUnique({
    where: {
      email,
    },
  })

  if (emailAlreadyExists) {
    return reply.status(400).send({ message: 'Email already exists' })
  }

  const password_hash = await hash(password, 6)

  try {
    await prisma.organization.create({
      data: {
        responsible,
        email,
        cep,
        address,
        latitude,
        longitude,
        whatsapp,
        password_hash,
      },
    })
  } catch (err) {
    return reply.status(400).send()
  }

  return reply.status(201).send()
})
