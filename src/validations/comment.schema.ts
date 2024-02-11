import { object, string } from 'zod'

export const createCommentSchema = object({
  text: string({ required_error: 'text is required' }).max(500, {
    message: 'text must not exceed 500 characters'
  }),
  email: string({ required_error: 'email is required' }).email({
    message: 'email must be a valid email'
  })
})

export const updateCommentSchema = object({
  text: string()
    .max(500, {
      message: 'text must not exceed 500 characters'
    })
    .optional(),
  email: string()
    .email({
      message: 'email must be a valid email'
    })
    .optional()
})
