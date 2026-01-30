const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a board title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  color: {
    type: String,
    default: '#3B82F6' // Default blue color
  }
}, {
  timestamps: true
});

// Index for faster queries
boardSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Board', boardSchema);
