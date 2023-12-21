import fastify from 'fastify'
import cors from '@fastify/cors'
import { CharsRoutes } from './routes/chars'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(CharsRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🪐 A API esta rodando na porta 3333')
  })
