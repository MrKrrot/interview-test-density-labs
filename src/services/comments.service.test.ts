/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  createCommentService,
  deleteCommentService,
  findAllCommentsService,
  findCommentByIdService,
  updateCommentService
} from '@services'
import { Comment } from '@models'

describe('Comments Service', () => {
  beforeAll(async () => {
    await Comment.sync({ force: true })
  })

  beforeEach(async () => {
    await Comment.destroy({ where: {} })
  })

  afterAll(async () => {
    await Comment.destroy({ where: {} })
    await Comment.sequelize?.close()
  })

  describe('findAllService', () => {
    it('should return all comments', async () => {
      await Comment.bulkCreate([
        { email: 'test@example.com', text: 'First comment' },
        { email: 'test@example.com', text: 'Second comment' }
      ])

      const comments = await findAllCommentsService()

      expect(comments).toHaveLength(2)
      expect(comments[0].email).toBe('test@example.com')
      expect(comments[0].text).toBe('First comment')
    })
  })

  describe('findCommentByIdService', () => {
    it('should return a comment by id', async () => {
      const comments = await Comment.bulkCreate([
        { email: 'test@example.com', text: 'First comment' },
        { email: 'test@example.com', text: 'Second comment' }
      ])

      const comment = await Comment.findByPk(comments[0].id)

      if (!comment) {
        throw new Error('Comment not found')
      }

      const specificComment = await findCommentByIdService(comment.id)

      expect(specificComment?.id).toBe(comment.id)
      expect(specificComment.email).toBe(comment.email)
      expect(specificComment.text).toBe(comment.text)
    })

    it('should thrown an Error if comment is not found', async () => {
      await expect(findCommentByIdService(99)).rejects.toThrowError('Comment not found')
    })
  })

  describe('createCommentService', () => {
    it('should create a new comment', async () => {
      const newComment = { email: 'test@example.com', text: 'New comment' }

      const comment = await createCommentService(newComment)

      expect(comment).toHaveProperty('id')
      expect(comment.email).toBe(newComment.email)
      expect(comment.text).toBe(newComment.text)
      expect(comment).toHaveProperty('createdAt')
      expect(comment).toHaveProperty('updatedAt')
    })

    it('should throw an error if email is missing', async () => {
      const invalidComment = { text: 'Comment without email' }

      // @ts-ignore
      await expect(createCommentService(invalidComment)).rejects.toThrowError(
        'notNull Violation: Comment.email cannot be null'
      )
    })

    it('should throw an error if text is missing', async () => {
      const invalidComment = { email: 'test@example.com' }

      // @ts-ignore
      await expect(createCommentService(invalidComment)).rejects.toThrowError(
        'notNull Violation: Comment.text cannot be null'
      )
    })
  })

  describe('updateCommentService', () => {
    it('should update only the text', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'Old comment' })

      // @ts-ignore
      const updatedComment = await updateCommentService({
        id: comment.id,
        text: 'Updated comment'
      })

      expect(updatedComment.id).toBe(comment.id)
      expect(updatedComment.email).toBe(comment.email)
      expect(updatedComment.text).toBe('Updated comment')
    })

    it('should update only the email', async () => {
      const comment = await Comment.create({ email: 'old@email.com', text: 'Old comment' })

      // @ts-ignore
      const updatedComment = await updateCommentService({
        id: comment.id,
        email: 'new@email.com'
      })

      expect(updatedComment.id).toBe(comment.id)
      expect(updatedComment.email).toBe('new@email.com')
      expect(updatedComment.text).toBe(comment.text)
    })

    it('should update both email and text', async () => {
      const comment = await Comment.create({ email: 'old@email.com', text: 'Old comment' })

      const updatedComment = await updateCommentService({
        id: comment.id,
        email: 'new@email.com',
        text: 'Updated comment'
      })

      expect(updatedComment.id).toBe(comment.id)
      expect(updatedComment.email).toBe('new@email.com')
      expect(updatedComment.text).toBe('Updated comment')
    })

    it('should throw an error if comment is not found', async () => {
      const invalidComment = { id: 99, email: 'test@example.com', text: 'New comment' }

      await expect(updateCommentService(invalidComment)).rejects.toThrowError('Comment not found')
    })
  })

  describe('deleteCommentService', () => {
    it('should delete a comment', async () => {
      const comments = await Comment.bulkCreate([
        { email: 'test@example.com', text: 'First comment' },
        { email: 'test@example.com', text: 'Second comment' }
      ])

      await deleteCommentService(comments[0].id)

      const remainingComments = await findAllCommentsService()

      expect(remainingComments).toHaveLength(1)
      expect(remainingComments[0].email).toBe('test@example.com')
      expect(remainingComments[0].text).toBe('Second comment')
    })

    it('should throw an error if comment is not found', async () => {
      await expect(deleteCommentService(99)).rejects.toThrowError('Comment not found')
    })
  })
})
