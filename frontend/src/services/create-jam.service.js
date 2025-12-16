import http from './http.js'

const create = (formData) => {
  // Placeholder URL: replace with your backend endpoint
  const url = '/placeholder/create-jam'
  return http.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export default { create }
