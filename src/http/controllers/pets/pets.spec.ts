import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Pets (EC2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        description:
          'Buddy is a friendly and playful pet looking for a loving home. He loves to go on long walks and play fetch in the park.',
        petAge: 'ADULT',
        petSize: 'BIG',
        petEnergyLevel: 'HIGH',
        petIndependenceLevel: 'HIGH',
        petSpaceNeed: 'BIG',
        requirements: ['Regular exercise', 'Grooming', 'Obedience training'],
        images: ['buddy_image1.jpg', 'buddy_image2.jpg', 'buddy_image3.jpg'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
