import { CommentForm } from '@components'
import { useParams } from 'react-router-dom'

const EditCommentPage = () => {
  const { id } = useParams()

  return (
    <main className="h-screen w-full text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold p-4">Edit Comment</h1>
        <CommentForm id={id} />
      </div>
    </main>
  )
}

export default EditCommentPage
