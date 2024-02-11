import { Router } from 'express'
import { createComment, deleteComment, findComments, updateComment } from '@controllers'
import { createCommentSchema, updateCommentSchema } from '@validations'
import { methodNotAllowed, schemaValidator } from '@middlewares'

const router = Router()

router.get('/comments', findComments)

router.post('/comments', schemaValidator(createCommentSchema), createComment)

router.patch('/comments/:id', schemaValidator(updateCommentSchema), updateComment)

router.delete('/comments/:id', deleteComment)

router.all('/', methodNotAllowed)
router.all('/:id', methodNotAllowed)

export { router as commentsRoutesV1 }
