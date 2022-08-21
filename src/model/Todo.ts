const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    onEdit: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('todos', TodoSchema)
