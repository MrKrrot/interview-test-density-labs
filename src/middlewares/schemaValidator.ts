import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

const schemaValidator =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = schema.parse(req.body)

      req.body = validatedBody
      next()
    } catch (err) {
      next(err)
    }
  }

export default schemaValidator
