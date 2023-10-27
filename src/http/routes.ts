import { FastifyInstance } from "fastify";
import { organization } from "./controllers/organizations";

export async function appRoutes(app: FastifyInstance) {
    app.post('/organizations', organization)
}