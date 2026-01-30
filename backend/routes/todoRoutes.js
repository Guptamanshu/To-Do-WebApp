const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoOrder
} = require('../controllers/todoController');
const { protect } = require('../middleware/auth');

// Validation rules
const todoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
];

// All routes require authentication
router.use(protect);

// Routes for todos within a board
router.route('/boards/:boardId/todos')
  .get(getTodos)
  .post(todoValidation, createTodo);

// Routes for individual todos
router.route('/todos/:id')
  .get(getTodo)
  .put(todoValidation, updateTodo)
  .delete(deleteTodo);

// Route for updating todo order
router.put('/todos/:id/order', [
  body('order')
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer')
], updateTodoOrder);

module.exports = router;
