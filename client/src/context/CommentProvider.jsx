/* eslint-disable no-console */
import { useState } from 'react'
import {
  getCommentsService,
  getCommentService,
  createCommentService,
  updateCommentService,
  deleteCommentService
} from '../services/commentsService'
import { CommentContext } from './CommentContext'

export const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([])

  async function getComments() {
    const [error, data] = await getCommentsService()
    if (error) {
      return [error, null]
    }

    setComments(data)
    return [null, data]
  }

  const getComment = async id => {
    const [error, data] = await getCommentService(id)

    if (error) {
      return [error, null]
    }

    return [null, data]
  }

  const createComment = async comment => {
    const [error, data] = await createCommentService(comment)

    if (error) {
      return [error, null]
    }

    setComments([data, ...comments])
    return [null, data]
  }

  const updateComment = async (id, updatedComment) => {
    const [error, data] = await updateCommentService(id, updatedComment)

    if (error) {
      return [error, null]
    }

    setComments(comments.map(comment => (comment.id === id ? data : comment)))
    return [null, data]
  }

  const deleteComment = async id => {
    const [error, data] = await deleteCommentService(id)

    if (error) {
      return [error, null]
    }
    setComments(comments.filter(comment => comment.id !== id))
    return [null, data]
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        getComments,
        deleteComment,
        createComment,
        getComment,
        updateComment
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
