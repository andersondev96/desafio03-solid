import { FastifyInstance } from 'fastify'
import { authentication } from './authentication'
import { organization } from './organizations'
import { refresh } from './refresh'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', organization)
  app.post('/sessions', authentication)

  app.patch('/token/refresh', refresh)
}
