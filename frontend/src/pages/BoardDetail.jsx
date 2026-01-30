import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPlus, FiFilter } from 'react-icons/fi'
import { boardService } from '../services/boardService'
import { todoService } from '../services/todoService'
import TodoItem from '../components/TodoItem'
import TodoModal from '../components/TodoModal'

const BoardDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState(null)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [filter, setFilter] = useState('all') // all, pending, in-progress, completed

  useEffect(() => {
    fetchBoard()
    fetchTodos()
  }, [id])

  const fetchBoard = async () => {
    try {
      const response = await boardService.getById(id)
      setBoard(response.data)
    } catch (error) {
      console.error('Error fetching board:', error)
      navigate('/dashboard')
    }
  }

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await todoService.getByBoard(id)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTodo = () => {
    setEditingTodo(null)
    setIsModalOpen(true)
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleSaveTodo = async (todoData) => {
    try {
      if (editingTodo) {
        await todoService.update(editingTodo._id, todoData)
      } else {
        await todoService.create(id, todoData)
      }
      setIsModalOpen(false)
      setEditingTodo(null)
      fetchTodos()
    } catch (error) {
      console.error('Error saving todo:', error)
      alert(error.response?.data?.message || 'Failed to save todo')
    }
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      await todoService.delete(todoId)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert(error.response?.data?.message || 'Failed to delete todo')
    }
  }

  const handleStatusChange = async (todoId, newStatus) => {
    try {
      await todoService.update(todoId, { status: newStatus })
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo status:', error)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true
    return todo.status === filter
  })

  const todosByStatus = {
    all: todos.length,
    pending: todos.filter((t) => t.status === 'pending').length,
    'in-progress': todos.filter((t) => t.status === 'in-progress').length,
    completed: todos.filter((t) => t.status === 'completed').length
  }

  if (loading && !board) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px] text-lg text-gray-500">Loading board...</div>
      </div>
    )
  }

  if (!board) {
    return null
  }

  const boardColor = board.color || '#3B82F6'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <button 
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-300 mb-4" 
            onClick={() => navigate('/dashboard')}
          >
            <FiArrowLeft /> Back to Boards
          </button>
          <div>
            <h1 
              className="text-3xl md:text-4xl font-bold text-gray-800 m-0 mb-2 pl-4 border-l-4" 
              style={{ borderLeftColor: boardColor }}
            >
              {board.title}
            </h1>
            {board.description && (
              <p className="text-gray-500 text-base m-0 pl-5">{board.description}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 flex-wrap">
            <div className="flex gap-2 flex-wrap w-full md:w-auto">
              <button
                className={`px-4 py-2 border-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setFilter('all')}
                style={filter === 'all' ? { backgroundColor: boardColor, borderColor: boardColor } : {}}
              >
                All ({todosByStatus.all})
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 ${
                  filter === 'pending'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setFilter('pending')}
                style={filter === 'pending' ? { backgroundColor: boardColor, borderColor: boardColor } : {}}
              >
                Pending ({todosByStatus.pending})
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 ${
                  filter === 'in-progress'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setFilter('in-progress')}
                style={filter === 'in-progress' ? { backgroundColor: boardColor, borderColor: boardColor } : {}}
              >
                In Progress ({todosByStatus['in-progress']})
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 ${
                  filter === 'completed'
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setFilter('completed')}
                style={filter === 'completed' ? { backgroundColor: boardColor, borderColor: boardColor } : {}}
              >
                Completed ({todosByStatus.completed})
              </button>
            </div>
            <button 
              className="flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 w-full md:w-auto justify-center" 
              onClick={handleCreateTodo}
            >
              <FiPlus /> Create Todo
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px] text-lg text-gray-500">Loading todos...</div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 m-0 mb-2">No todos yet</h3>
              <p className="text-gray-500 text-sm m-0 mb-6">
                {filter === 'all'
                  ? 'Create your first todo to get started'
                  : `No ${filter} todos`}
              </p>
              {filter === 'all' && (
                <button 
                  className="flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 mx-auto" 
                  onClick={handleCreateTodo}
                >
                  <FiPlus /> Create Your First Todo
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTodo(null)
        }}
        onSave={handleSaveTodo}
        todo={editingTodo}
      />
    </div>
  )
}

export default BoardDetail
