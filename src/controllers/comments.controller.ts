import { NextFunction, Request, Response } from 'express'
import {
  createCommentService,
  deleteCommentService,
  findAllCommentsService,
  findCommentByIdService,
  updateCommentService
} from '@services'

export const findComments = async (req: Request, res: Response, next: NextFunction) => {
  const comments = await findAllCommentsService()
  try {
    return res.json(comments)
  } catch (error) {
    next(error)
  }
}

export const findSpecificComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const commentId = Number(id)

  try {
    const comment = await findCommentByIdService(commentId)
    return res.json(comment)
  } catch (error) {
    next(error)
  }
}

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  const { email, text } = req.body

  try {
    const comment = await createCommentService({ email, text })
    return res.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { email, text } = req.body

  const commentId = Number(id)

  try {
    const comment = await updateCommentService({ id: commentId, email, text })
    return res.json(comment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const commentId = Number(id)

  try {
    const comment = await deleteCommentService(commentId)
    return res.status(204).json(comment)
  } catch (error) {
    next(error)
  }
}
