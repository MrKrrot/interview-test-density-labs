import { useComments } from '@hooks/useComments'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

export const CommentCard = ({ id, text, email }) => {
  const { deleteComment } = useComments()
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteComment(id)
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`)
  }

  return (
    <section className="flex flex-wrap justify-between items-center bg-gray-800 p-4 my-4 rounded-md">
      <div className="flex flex-col flex-1 mr-4">
        <p className="text-white text-lg">{text}</p>
        <p className="text-gray-400">{email}</p>
      </div>
      <div className="flex space-x-4">
        <Button onClick={handleEdit}>Edit</Button>
        <Button type="delete" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </section>
  )
}
