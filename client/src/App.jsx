import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditCommentPage from './pages/EditCommentPage'
import NotFound from './pages/NotFound'
import { CommentContextProvider } from './context/CommentProvider'

function App() {
  return (
    <CommentContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditCommentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CommentContextProvider>
  )
}

export default App
