import React, { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const BoardModal = ({ isOpen, onClose, onSave, board = null }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [error, setError] = useState('')

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444','#8B5CF6', '#EC4899', '#06B6D4', '#84CC16']

  useEffect(() => {
    if (board) {
      setTitle(board.title || '')
      setDescription(board.description || '')
      setColor(board.color || '#3B82F6')
    } else {
      setTitle('')
      setDescription('')
      setColor('#3B82F6')
    }
    setError('')
  }, [board, isOpen])

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
      color
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
          <h2 className="text-xl font-semibold text-gray-800 m-0">{board ? 'Edit Board' : 'Create New Board'}</h2>
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
              placeholder="Enter board title"
              maxLength={100}
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
              placeholder="Enter board description (optional)"
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 font-inherit resize-none"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Color</label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-10 h-10 rounded-lg border-3 transition-all duration-200 hover:scale-110 ${
                    color === c 
                      ? 'border-gray-800 shadow-[0_0_0_2px_white,0_0_0_4px_#2d3748]' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
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
              {board ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BoardModal
