import cors from 'cors'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import listEndpoints from 'express-list-endpoints'

import { NODE_ENV } from '@config'
import { errorHandler, routesLogger } from '@middlewares'
import { commentsRoutesV1 } from '@routes/api/v1'
import { logger, getColorForMethod, ServerError } from '@utils'

const app = express()

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }))
app.use(express.json())

if (NODE_ENV !== 'test') {
  app.use(routesLogger)
}

app.use('/api/v1', commentsRoutesV1)

app.use((_req, _res, next) => {
  next(new ServerError('Not found', 404))
})

app.use(errorHandler)
app.use(compression())

if (NODE_ENV === 'development') {
  logger.info('+Available routes:')
  listEndpoints(app).forEach(route => {
    route.methods.forEach(method => {
      logger.info(`- ${getColorForMethod(method)}   \t${route.path}`)
    })
  })
}

export default app
