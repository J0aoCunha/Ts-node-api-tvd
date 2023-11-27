import fastify from 'fastify'

const app = fastify()

app.get('/TVD', () => {
  return 'Estou funcionando.'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🪐 A API esta rodando na porta 3333')
  })
