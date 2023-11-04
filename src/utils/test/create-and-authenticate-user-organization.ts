import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      responsible: 'John Doe',
      email: 'john@example.com',
      cep: '111111',
      address: 'Rua 1',
      latitude: 99,
      longitude: 99,
      city: 'Salvador',
      whatsapp: '1222525425',
      password_hash: await hash('123456', 6),
    },
  })

  await request(app.server).post('/organizations').send({
    responsible: 'John Doe',
    email: 'john@example.com',
    cep: '111111',
    address: 'Rua 1',
    latitude: 99,
    longitude: 99,
    city: 'Salvador',
    whatsapp: '1222525425',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
