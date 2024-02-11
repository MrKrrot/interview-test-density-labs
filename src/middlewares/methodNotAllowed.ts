import { NextFunction, Request, Response } from 'express'

import { ServerError } from '@utils'

const methodNotAllowed = (_req: Request, _res: Response, next: NextFunction) => {
  next(new ServerError('Method not allowed', 405))
}

export default methodNotAllowed
