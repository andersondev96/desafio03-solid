import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List pets by city (EC2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets by city', async () => {
    await createAndAuthenticateUser(app)

    const organization = await prisma.organization.findFirstOrThrow()

    await prisma.pet.create({
      data: {
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
        organization_id: organization.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/list-by-city`)
      .query({ city: 'Salvador' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Buddy',
      }),
    ])
  })
})
