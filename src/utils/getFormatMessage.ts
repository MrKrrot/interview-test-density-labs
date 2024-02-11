import chalk from 'chalk'
import { format } from 'winston'

import { NODE_ENV } from '@config'
import getColorForLevel from './getColorForLevel'

const isProduction = NODE_ENV === 'production'

const getFormatMessage = () => {
  if (isProduction) return format.json()

  return format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss' }),
    format.printf(info => {
      const timestamp = `[${chalk.cyan(info.timestamp)}]`
      if (info.message.startsWith('+')) {
        return `${info.message.slice(1)}`
      }

      if (info.message.startsWith('-')) {
        return `${info.message}`
      }
      const level = getColorForLevel(info.level)(`${info.level.toUpperCase()}:`)
      return `${timestamp} ${level} ${info.message}`
    })
  )
}

export default getFormatMessage
