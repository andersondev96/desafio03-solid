import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet (EC2)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    await createAndAuthenticateUser(app)

    const organization = await prisma.organization.findFirstOrThrow()

    const pet = await prisma.pet.create({
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

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Buddy',
      }),
    )
  })
})
