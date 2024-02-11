import { createLogger, transports } from 'winston'

import { NODE_ENV } from '@config'
import getFormatMessage from './getFormatMessage'

const isProduction = NODE_ENV === 'production'

const logger = createLogger({
  format: getFormatMessage(),
  transports: [new transports.Console()],
  level: isProduction ? 'info' : 'debug'
})

if (isProduction) {
  logger.add(
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  )
  logger.add(
    new transports.File({
      filename: 'logs/combined.log'
    })
  )
}

export default logger
