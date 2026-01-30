const { validationResult } = require('express-validator');
const Board = require('../models/Board');
const Todo = require('../models/Todo');

// @desc    Get all boards for a user
// @route   GET /api/boards
// @access  Private
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(boards);
  } catch (error) {
    console.error('Get boards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single board by ID
// @route   GET /api/boards/:id
// @access  Private
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.json(board);
  } catch (error) {
    console.error('Get board error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new board
// @route   POST /api/boards
// @access  Private
const createBoard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, color } = req.body;

    const board = await Board.create({
      title,
      description,
      color: color || '#3B82F6',
      user: req.user._id
    });

    res.status(201).json(board);
  } catch (error) {
    console.error('Create board error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a board
// @route   PUT /api/boards/:id
// @access  Private

const updateBoard = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const { title, description, color } = req.body;

    if (title) board.title = title;
    if (description !== undefined) board.description = description;
    if (color) board.color = color;

    await board.save();
    res.json(board);
  } catch (error) {
    console.error('Update board error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a board
// @route   DELETE /api/boards/:id
// @access  Private

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Delete all todos associated with this board
    await Todo.deleteMany({ board: board._id });

    // Delete the board
    await Board.deleteOne({ _id: board._id });

    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Delete board error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBoards,getBoard,createBoard, updateBoard,deleteBoard};
