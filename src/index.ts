import fastify from 'fastify'
import { CharsRoutes } from './routes/chars'

const app = fastify()

app.register(CharsRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🪐 A API esta rodando na porta 3333')
  })
