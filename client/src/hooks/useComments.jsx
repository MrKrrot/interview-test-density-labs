import { useContext } from 'react'
import { CommentContext } from '../context/CommentContext'

export const useComments = () => {
  const context = useContext(CommentContext)
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentContextProvider')
  }
  return context
}
