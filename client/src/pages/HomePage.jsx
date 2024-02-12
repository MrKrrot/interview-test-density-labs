import { useEffect } from 'react'
import { CommentForm, CommentList, Empty } from '@components'
import { useComments } from '@hooks'

const HomePage = () => {
  const { comments, getComments } = useComments()

  useEffect(() => {
    getComments()
  }, [])

  return (
    <main className="h-screen w-full text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold p-4">Interview Test - Comments</h1>
        <CommentForm />
        {comments.length > 0 ? <CommentList comments={comments} /> : <Empty />}
      </div>
    </main>
  )
}

export default HomePage
