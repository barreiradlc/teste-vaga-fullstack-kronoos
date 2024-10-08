import cors from '@fastify/cors'
import fastify from "fastify"
import { appRoutes } from "./http/routes"

const app = fastify({
  logger: true
})
app.register(cors)

app.register(appRoutes)

export { app }
