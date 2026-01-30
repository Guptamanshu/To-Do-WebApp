const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');
const { protect } = require('../middleware/auth');

// Validation rules
const boardValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color code')
];

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
  .get(getBoards)
  .post(boardValidation, createBoard);

router.route('/:id')
  .get(getBoard)
  .put(boardValidation, updateBoard)
  .delete(deleteBoard);

module.exports = router;
