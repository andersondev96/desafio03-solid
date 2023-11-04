import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { GetPet } from './get-pet'
import { ListPetsByCharacteristics } from './list-pets-by-characteristics'
import { ListPetsByCity } from './list-pets-by-city'
import { Pets } from './pets'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, Pets)

  app.get('/pets/:pet_id', GetPet)
  app.get('/pets/list-by-city', ListPetsByCity)
  app.get('/pets/list-by-characteristics', ListPetsByCharacteristics)
}
