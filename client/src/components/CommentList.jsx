import { CommentCard } from './CommentCard'

export const CommentList = ({ comments }) => {
  return (
    <div className="w-2/5 min-w-96">
      {comments.map(comment => (
        <CommentCard
          key={`comment-${comment.id}`}
          id={comment.id}
          text={comment.text}
          email={comment.email}
        />
      ))}
    </div>
  )
}
