import { address } from 'ip'

import app from './app'
import { PORT, NODE_ENV } from '@config'
import { logger, sequelize } from '@utils'

export const bootstrap = () => {
  app.listen(PORT, async () => {
    logger.info(
      `Server is running on http://${NODE_ENV === 'production' ? address() : 'localhost'}:${PORT}`
    )

    try {
      await sequelize.authenticate()
      await sequelize.sync()
      logger.info('Connection to database has been established successfully.')
    } catch (error) {
      logger.error('Unable to connect to the database:', error)
    }
  })
}

bootstrap()
