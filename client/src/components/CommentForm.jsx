import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useComments } from '@hooks'
import { TextField } from './TextField'
import { Button } from './Button'

export const CommentForm = ({ id }) => {
  const [comment, setComment] = useState({ email: '', text: '' })
  const [error, setError] = useState(null)
  const { createComment, updateComment, getComment } = useComments()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const fetchComment = async id => {
        const [error, data] = await getComment(id)
        if (error) {
          setError(error)
          return
        }
        setComment(data)
      }
      fetchComment(id)
    }
  }, [id])

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null)
    }, 3000)
    return () => clearTimeout(timer)
  }, [error])

  const handleChange = event => {
    setComment({ ...comment, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!comment.email) {
      setError('Email is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(comment.email)) {
      setError('Email is not valid')
      return
    }

    if (!comment.text) {
      setError('Comment is required')
      return
    }

    if (id) {
      const [error] = await updateComment(id, comment)
      if (error) {
        setError(error)
        return
      }
    } else {
      const [error] = await createComment(comment)
      if (error) {
        setError(error)
        return
      }
    }

    setComment({ email: '', text: '' })
    setError(null)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="w-2/5 min-w-96">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <TextField
          type={'email'}
          id="email"
          name="email"
          value={comment.email}
          onChange={handleChange}
          error={error?.includes('Email')}
        />
        {error?.includes('Email') && <span className="text-red-500 text-sm">{error}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="text" className="mt-4">
          Comment
        </label>
        <TextField
          id="text"
          name="text"
          value={comment.text}
          onChange={handleChange}
          error={error?.includes('Comment')}
        />
        {error?.includes('Comment') && <span className="text-red-500 text-sm">{error}</span>}
      </div>
      <Button type="normal" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  )
}
