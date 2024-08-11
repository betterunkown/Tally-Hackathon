const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new problem
router.post('/', async (req, res) => {
  const problem = new Problem({
    title: req.body.title,
    difficulty: req.body.difficulty,
    topic: req.body.topic,
    completed: req.body.completed,
  });

  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem == null) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a problem by ID
router.patch('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem == null) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    if (req.body.title != null) {
      problem.title = req.body.title;
    }
    if (req.body.difficulty != null) {
      problem.difficulty = req.body.difficulty;
    }
    if (req.body.topic != null) {
      problem.topic = req.body.topic;
    }
    if (req.body.completed != null) {
      problem.completed = req.body.completed;
    }

    const updatedProblem = await problem.save();
    res.json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a problem by ID
router.delete('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem == null) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    await problem.remove();
    res.json({ message: 'Problem deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
