import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { ServerError } from '@utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err.name === 'ValidationError') {
    const regex = /Validator failed for path `([^`]+)` with value `([^`]+)`/g
    const matches = err.message.matchAll(regex)
    const errorMessages: string[] = []

    for (const match of matches) {
      const [, field, value] = match
      errorMessages.push(`${field} ${value} is already taken.`)
    }

    return res.status(409).json({
      message: errorMessages,
      statusCode: 409
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.errors.map(err => err.message),
      statusCode: 400
    })
  }

  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    })
  }
  res.send({ statusCode: 500, message: err.message })
}

export default errorHandler
