import { FastifyInstance } from 'fastify'
import { authentication } from './controllers/authentication'
import { organization } from './controllers/organizations'

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', organization)

  app.post('/sessions', authentication)
}
