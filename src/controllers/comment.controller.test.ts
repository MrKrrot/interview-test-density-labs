import request from 'supertest'
import app from '../app'
import { Comment } from '@models'

const api = request(app)

describe('Comments Controller', () => {
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

  describe('GET /comments', () => {
    it('should return 200 if get all comments', async () => {
      await Comment.bulkCreate([
        { email: 'test1@example.com', text: 'First comment' },
        { email: 'test2@example.com', text: 'Second comment' }
      ])

      const res = await api.get('/api/v1/comments')

      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(2)
      expect(res.body[0].email).toBe('test1@example.com')
      expect(res.body[0].text).toBe('First comment')
    })
  })

  describe('GET /comments/:id', () => {
    it('should return 200 if get a comment by id', async () => {
      const comments = await Comment.bulkCreate([
        { email: 'test@example.com', text: 'First comment' },
        { email: 'test@example.com', text: 'Second comment' }
      ])

      const res = await api.get(`/api/v1/comments/${comments[0].id}`)

      expect(res.status).toBe(200)
      expect(res.body.id).toBe(comments[0].id)
      expect(res.body.email).toBe(comments[0].email)
      expect(res.body.text).toBe(comments[0].text)
    })

    it('should return 404 if the comment is not found', async () => {
      const res = await api.get('/api/v1/comments/999')

      expect(res.status).toBe(404)
      expect(res.body).toMatchObject({
        message: 'Comment not found',
        statusCode: 404
      })
    })
  })

  describe('POST /comments', () => {
    it('should return 201 if create a new comment', async () => {
      const newComment = { email: 'test@example.com', text: 'New comment' }

      const res = await api.post('/api/v1/comments').send(newComment)

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('id')
      expect(res.body.email).toBe(newComment.email)
      expect(res.body.text).toBe(newComment.text)
    })

    it('should return 400 if email is missing', async () => {
      const invalidComment = { text: 'Comment without email' }

      const res = await api.post('/api/v1/comments').send(invalidComment)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['email is required'],
        statusCode: 400
      })
    })

    it('should return 400 if text is missing', async () => {
      const invalidComment = { email: 'test@example.com' }

      const res = await api.post('/api/v1/comments').send(invalidComment)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['text is required'],
        statusCode: 400
      })
    })

    it('should return 400 if the email format is incorrect', async () => {
      const invalidComment = { email: 'invalidEmail', text: 'Comment text' }

      const res = await api.post('/api/v1/comments').send(invalidComment)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['email must be a valid email'],
        statusCode: 400
      })
    })

    it('should return 400 if the text exceeds the allowed length', async () => {
      const invalidComment = { email: 'test@example.com', text: 'a'.repeat(501) }

      const res = await api.post('/api/v1/comments').send(invalidComment)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['text must not exceed 500 characters'],
        statusCode: 400
      })
    })
  })

  describe('PATCH /comments', () => {
    it('should return 200 if update the text only', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'New comment' })
      const updatedComment = { text: 'Updated comment' }

      const res = await api.patch(`/api/v1/comments/${comment.id}`).send(updatedComment)

      expect(res.status).toBe(200)
      expect(res.body).toMatchObject({
        id: comment.id,
        email: comment.email,
        text: updatedComment.text
      })
    })

    it('should return 200 if update the email only', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'New comment' })
      const updatedComment = { email: 'new@email.com' }

      const res = await api.patch(`/api/v1/comments/${comment.id}`).send(updatedComment)

      expect(res.status).toBe(200)
      expect(res.body).toMatchObject({
        id: comment.id,
        email: updatedComment.email,
        text: comment.text
      })
    })

    it('should return 200 if update both email and text', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'New comment' })
      const updatedComment = { email: 'new@email.com', text: 'Updated comment' }

      const res = await api.patch(`/api/v1/comments/${comment.id}`).send(updatedComment)

      expect(res.status).toBe(200)
      expect(res.body).toMatchObject({
        id: comment.id,
        email: updatedComment.email,
        text: updatedComment.text
      })
    })

    it('should return 404 if the comment is not found', async () => {
      const updatedComment = { email: 'test@example.com', text: 'Updated comment' }

      const res = await api.patch('/api/v1/comments/999').send(updatedComment)

      expect(res.status).toBe(404)
      expect(res.body).toMatchObject({
        message: 'Comment not found',
        statusCode: 404
      })
    })

    it('should return 400 if the email format is incorrect', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'New comment' })

      const updatedComment = { email: 'invalidEmail', text: 'Updated comment' }

      const res = await api.patch(`/api/v1/comments/${comment.id}`).send(updatedComment)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['email must be a valid email'],
        statusCode: 400
      })
    })

    it('should return 400 if the text exceeds the allowed length', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'New comment' })

      const updatedComment = { text: 'a'.repeat(501) }

      const res = await api.patch(`/api/v1/comments/${comment.id}`).send(updatedComment)

      expect(res.status).toBe(400)
      expect(res.body).toMatchObject({
        message: ['text must not exceed 500 characters'],
        statusCode: 400
      })
    })
  })

  describe('DELETE /comments', () => {
    it('should return 204 if delete a comment', async () => {
      const comment = await Comment.create({ email: 'test@example.com', text: 'New comment' })

      const res = await api.delete(`/api/v1/comments/${comment.id}`)

      expect(res.status).toBe(204)
    })

    it('should return 404 if the comment is not found', async () => {
      const res = await api.delete('/api/v1/comments/999')

      expect(res.status).toBe(404)
      expect(res.body).toMatchObject({
        message: 'Comment not found',
        statusCode: 404
      })
    })
  })
})
