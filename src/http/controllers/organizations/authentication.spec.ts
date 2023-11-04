import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authentication (EC2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'john@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
