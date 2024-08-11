const mongoose = require('mongoose');

// Define the Problem schema
const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  topic: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// Create the Problem model
const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
