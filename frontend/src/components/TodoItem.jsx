import React, { useState } from 'react'
import { FiEdit2, FiTrash2, FiCalendar, FiFlag } from 'react-icons/fi'

const TodoItem = ({ todo, onEdit, onDelete, onStatusChange }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#EF4444'
      case 'medium':
        return '#F59E0B'
      case 'low':
        return '#10B981'
      default:
        return '#718096'
    }
  }
    const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10B981'
      case 'in-progress':
        return '#3B82F6'
      case 'pending':
        return '#F59E0B'
      default:
        return '#718096'
    }
  }

  const handleStatusChange = (e) => {
    onStatusChange(todo._id, e.target.value)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(todo)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-3 shadow-sm transition-all duration-200 border-l-4 border-transparent hover:shadow-md hover:translate-x-1 ${
        todo.status === 'completed' ? 'opacity-70' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3 flex-wrap md:flex-nowrap">
        <div className="mt-0.5">
          <input
            type="checkbox"
            checked={todo.status === 'completed'}
            onChange={(e) => {
              onStatusChange(todo._id, e.target.checked ? 'completed' : 'pending')
            }}
            className="w-5 h-5 cursor-pointer accent-emerald-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-base font-semibold text-gray-800 m-0 mb-1 ${
            todo.status === 'completed' ? 'line-through text-gray-400' : ''
          }`}>
            {todo.title}
          </h4>
          {todo.description && (
            <p className="text-sm text-gray-500 m-0 leading-relaxed">
              {todo.description}
            </p>
          )}
        </div>
        <div className={`flex gap-2 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'
        }`}>
          <button 
            className="bg-transparent border-none text-gray-500 cursor-pointer p-1 flex items-center justify-center rounded transition-all duration-200 hover:bg-gray-50 hover:text-gray-800" 
            onClick={handleEdit} 
            title="Edit todo"
          >
            <FiEdit2 />
          </button>
          <button 
            className="bg-transparent border-none text-gray-500 cursor-pointer p-1 flex items-center justify-center rounded transition-all duration-200 hover:bg-gray-50 hover:text-gray-800" 
            onClick={handleDelete} 
            title="Delete todo"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={todo.status}
            onChange={handleStatusChange}
            className="px-2 py-1 border-2 rounded-md text-xs font-semibold cursor-pointer bg-white outline-none transition-all duration-200 hover:bg-gray-50"
            style={{ borderColor: getStatusColor(todo.status) }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold capitalize"
            style={{ backgroundColor: getPriorityColor(todo.priority) + '20', color: getPriorityColor(todo.priority) }}
          >
            <FiFlag /> {todo.priority}
          </div>
          {todo.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiCalendar />
              {new Date(todo.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoItem
