const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  user_Id: { type: String },
  tasks: [
    {
      title: { type: String, required: true },
      description: { type: String },
      dueDate: { type: Date },
      status: {
        type: String,
        default: 'Pending'
      }
    }
  ]
}, { timestamps: true });

const Task = model('Task', taskSchema);

module.exports = Task;
