import { FastifyInstance } from 'fastify'
import { GetPets } from './get-pets'
import { ListPetsByCharacteristics } from './list-pets-by-characteristics'
import { ListPetsByCity } from './list-pets-by-city'
import { Pets } from './pets'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/pets/:organizationId', Pets)
  app.get('/pets/:id', GetPets)
  app.get('/pets/list-by-city', ListPetsByCity)
  app.get('/pets/list-by-characteristics', ListPetsByCharacteristics)
}
