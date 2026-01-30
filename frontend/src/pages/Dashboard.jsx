import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiLogOut } from 'react-icons/fi'
import { boardService } from '../services/boardService'
import BoardCard from '../components/BoardCard'
import BoardModal from '../components/BoardModal'

const Dashboard = () => {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBoard, setEditingBoard] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      setLoading(true)
      const response = await boardService.getAll()
      setBoards(response.data)
    } catch (error) {
      console.error('Error fetching boards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBoard = () => {
    setEditingBoard(null)
    setIsModalOpen(true)
  }

  const handleEditBoard = (board) => {
    setEditingBoard(board)
    setIsModalOpen(true)
  }

  const handleSaveBoard = async (boardData) => {
    try {
      if (editingBoard) {
        await boardService.update(editingBoard._id, boardData)
      } else {
        await boardService.create(boardData)
      }
      setIsModalOpen(false)
      setEditingBoard(null)
      fetchBoards()
    } catch (error) {
      console.error('Error saving board:', error)
      alert(error.response?.data?.message || 'Failed to save board')
    }
  }

  const handleDeleteBoard = async (boardId) => {
    try {
      await boardService.delete(boardId)
      fetchBoards()
    } catch (error) {
      console.error('Error deleting board:', error)
      alert(error.response?.data?.message || 'Failed to delete board')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-[400px] text-lg text-gray-500">Loading boards...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 m-0 mb-1">My Boards</h1>
            <p className="text-gray-500 text-sm m-0">Welcome back, {user?.name || user?.email}!</p>
          </div>
          <button 
            className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-300" 
            onClick={handleLogout}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 m-0">Your Boards ({boards.length})</h2>
            <button 
              className="flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30" 
              onClick={handleCreateBoard}
            >
              <FiPlus /> Create Board
            </button>
          </div>

          {boards.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-800 m-0 mb-2">No boards yet</h3>
              <p className="text-gray-500 text-sm m-0 mb-6">Create your first board to start organizing your tasks</p>
              <button 
                className="flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none px-6 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 mx-auto" 
                onClick={handleCreateBoard}
              >
                <FiPlus /> Create Your First Board
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {boards.map((board) => (
                <BoardCard
                  key={board._id}
                  board={board}
                  onEdit={handleEditBoard}
                  onDelete={handleDeleteBoard}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <BoardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingBoard(null)
        }}
        onSave={handleSaveBoard}
        board={editingBoard}
      />
    </div>
  )
}

export default Dashboard
