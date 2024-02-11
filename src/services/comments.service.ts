import { Comment } from '@models'
import { CommentDocument } from '@models'
import { ServerError } from '@utils'

export const findAllService = async () => {
  return await Comment.findAll()
}

export const createCommentService = async ({ email, text }: CommentDocument) => {
  return await Comment.create({ email, text })
}

export const updateCommentService = async ({ id, email, text }: CommentDocument) => {
  const comment = await Comment.findByPk(id)

  if (!comment) {
    throw new ServerError('Comment not found', 404)
  }

  return await comment.update({ email: email || comment.email, text: text || comment.text })
}

export const deleteCommentService = async (id: number) => {
  const comment = await Comment.findByPk(id)

  if (!comment) {
    throw new ServerError('Comment not found', 404)
  }

  return await comment.destroy()
}
