import { Request, Response, NextFunction } from 'express'

import { NODE_ENV } from '@config'
import { getColorForStatusCode, getColorForMethod, logger } from '@utils'

const routesLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()

  if (NODE_ENV !== 'production') {
    const { method, url } = req
    const methodColor = getColorForMethod(method)

    res.on('finish', () => {
      const { statusCode } = res

      const responseTime = Date.now() - start
      const statusCodeColor = getColorForStatusCode(statusCode)
      const responseSize = res.get('content-length')

      logger.info(
        `${methodColor} ${url} ${statusCodeColor} ${responseTime} ms - ${responseSize ?? '0'}`
      )
    })
    next()
  } else {
    const { ip: remoteAddress, method, url, httpVersion } = req

    res.on('finish', () => {
      const { statusCode } = res
      const responseTime = Date.now() - start
      const responseSize = res.get('content-length')

      logger.info(
        `${remoteAddress} - ${method} ${url} HTTP/${httpVersion} ${statusCode} ${
          responseSize ?? '0'
        } - ${responseTime} ms`
      )
    })

    next()
  }
}

export default routesLogger
