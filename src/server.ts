import Fastify from 'fastify'
import config from '../config'

const app = Fastify({ logger: true })

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

export const start = async () => {
  try {
    await app.listen(config.get('port'))
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}