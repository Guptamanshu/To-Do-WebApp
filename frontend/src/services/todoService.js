import api from './api'

export const todoService = {
  getByBoard: (boardId) => api.get(`/boards/${boardId}/todos`),
  getById: (id) => api.get(`/todos/${id}`),
  create: (boardId, data) => api.post(`/boards/${boardId}/todos`, data),
  update: (id, data) => api.put(`/todos/${id}`, data),
  delete: (id) => api.delete(`/todos/${id}`),
  updateOrder: (id, order) => api.put(`/todos/${id}/order`, { order })
}
