const API_URL = import.meta.env.VITE_API_URL

export const getCommentsService = async () => {
  const response = await fetch(`${API_URL}/api/v1/comments`)
  const data = await response.json()

  if (!response.ok) {
    return [data.message, null]
  }

  return [null, data.reverse()]
}

export const getCommentService = async id => {
  const response = await fetch(`${API_URL}/api/v1/comments/${id}`)

  const data = await response.json()

  if (!response.ok) {
    return [data.message, null]
  }

  return [null, data]
}

export const createCommentService = async comment => {
  const response = await fetch(`${API_URL}/api/v1/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

  const data = await response.json()

  if (!response.ok) {
    return [data.message, null]
  }

  return [null, data]
}

export const updateCommentService = async (id, comment) => {
  const response = await fetch(`${API_URL}/api/v1/comments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

  const data = await response.json()

  if (!response.ok) {
    return [data.message, null]
  }

  return [null, data]
}

export const deleteCommentService = async id => {
  const response = await fetch(`${API_URL}/api/v1/comments/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    return [null, null]
  }

  return [null, id]
}
