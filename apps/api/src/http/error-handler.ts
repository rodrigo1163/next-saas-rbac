import { FastifyInstance } from 'fastify'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.validation,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }
  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }
  console.error(error.constructor.name, JSON.stringify(error, null, 2))

  // send error to some obervability platform

  return reply.status(500).send({ message: 'Internal server error.' })
}
