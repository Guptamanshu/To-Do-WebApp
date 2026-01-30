const { validationResult } = require('express-validator');
const Todo = require('../models/Todo');
const Board = require('../models/Board');

// @desc    Get all todos for a board
// @route   GET /api/boards/:boardId/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    // Verify board belongs to user
    const board = await Board.findOne({
      _id: req.params.boardId,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const todos = await Todo.find({ board: req.params.boardId })
      .sort({ order: 1, createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single todo by ID
// @route   GET /api/todos/:id
// @access  Private
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new todo
// @route   POST /api/boards/:boardId/todos
// @access  Private
const createTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Verify board belongs to user
    const board = await Board.findOne({
      _id: req.params.boardId,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Get the highest order number for this board
    const lastTodo = await Todo.findOne({ board: req.params.boardId })
      .sort({ order: -1 });
    const nextOrder = lastTodo ? lastTodo.order + 1 : 0;

    const { title, description, status, priority, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate,
      board: req.params.boardId,
      user: req.user._id,
      order: nextOrder
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, description, status, priority, dueDate, order } = req.body;

    if (title) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status) todo.status = status;
    if (priority) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (order !== undefined) todo.order = order;

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.deleteOne({ _id: todo._id });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update todo order (for drag and drop)
// @route   PUT /api/todos/:id/order
// @access  Private
const updateTodoOrder = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { order } = req.body;
    if (order === undefined) {
      return res.status(400).json({ message: 'Order is required' });
    }

    todo.order = order;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Update todo order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoOrder
};
