import React, { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const TodoModal = ({ isOpen, onClose, onSave, todo = null }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '')
      setDescription(todo.description || '')
      setStatus(todo.status || 'pending')
      setPriority(todo.priority || 'medium')
      setDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '')
    } else {
      setTitle('')
      setDescription('')
      setStatus('pending')
      setPriority('medium')
      setDueDate('')
    }
    setError('')
  }, [todo, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || undefined
    })
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-5 animate-[fadeIn_0.2s]" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_0.3s]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 m-0">{todo ? 'Edit Todo' : 'Create New Todo'}</h2>
          <button 
            className="bg-transparent border-none text-gray-500 cursor-pointer p-1 flex items-center justify-center rounded transition-all duration-200 hover:bg-gray-50 hover:text-gray-800" 
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-300">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              maxLength={200}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter todo description (optional)"
              maxLength={1000}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 font-inherit resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-800 mb-2">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 outline-none bg-white cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-800 mb-2">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 outline-none bg-white cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-800 mb-2">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              className="px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-gray-50 text-gray-800 hover:bg-gray-100" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
            >
              {todo ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoModal
