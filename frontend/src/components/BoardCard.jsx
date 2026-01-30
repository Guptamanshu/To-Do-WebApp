import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi'

const BoardCard = ({ board, onEdit, onDelete }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/board/${board._id}`)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(board)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this board? All todos will be deleted.')) {
      onDelete(board._id)
    }
  }

  return (
    <div 
      className="bg-white rounded-xl p-5 border-t-4 shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative group" 
      onClick={handleClick} 
      style={{ borderTopColor: board.color || '#3B82F6' }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 m-0 flex-1">{board.title}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
          <button 
            className="bg-transparent border-none text-gray-500 cursor-pointer p-1 flex items-center justify-center rounded transition-all duration-200 hover:bg-gray-50 hover:text-gray-800" 
            onClick={handleEdit} 
            title="Edit board"
          >
            <FiEdit2 />
          </button>
          <button 
            className="bg-transparent border-none text-gray-500 cursor-pointer p-1 flex items-center justify-center rounded transition-all duration-200 hover:bg-gray-50 hover:text-gray-800" 
            onClick={handleDelete} 
            title="Delete board"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      {board.description && (
        <p className="text-gray-500 text-sm m-0 mb-3 leading-relaxed line-clamp-2">
          {board.description}
        </p>
      )}
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-400">
          {new Date(board.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}

export default BoardCard
