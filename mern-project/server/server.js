const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const problemsRouter = require('./routes/problems');
const { exec } = require('child_process');
const performance = require('performance-now'); // Import performance-now

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/problemdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the problems routes
app.use('/problems', problemsRouter);

// Route to compile and execute code
app.post('/compile', (req, res) => {
    const { language, code, input } = req.body;

    let fileName;
    let command;

    if (language === 'python') {
        fileName = 'code.py';
        command = `python3 ${fileName}`;
    } else if (language === 'cpp') {
        fileName = 'code.cpp';
        const outputFileName = 'output';
        command = `g++ ${fileName} -o ${outputFileName} && ./${outputFileName}`;
    } else {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    // Write the code to a file
    const fs = require('fs');
    fs.writeFileSync(fileName, code);

    // If input is provided, add it to the command
    if (input) {
        command += ` < input.txt`;
        fs.writeFileSync('input.txt', input);
    }

    const startMemoryUsage = process.memoryUsage().heapUsed;
    const startTime = performance(); // Start the timer

    exec(command, (error, stdout, stderr) => {
        const endTime = performance(); // End the timer
        const executionTime = (endTime - startTime).toFixed(2) + ' ms'; // Calculate execution time

        const endMemoryUsage = process.memoryUsage().heapUsed;
        const memoryUsage = `${((endMemoryUsage - startMemoryUsage) / 1024).toFixed(2)} KB`;

        // Cleanup: delete files after execution
        fs.unlinkSync(fileName);
        if (input) fs.unlinkSync('input.txt');
        if (language === 'cpp') fs.unlinkSync('output');

        if (error) {
            return res.status(400).json({ error: stderr });
        }

        res.json({ output: stdout, memoryUsage, executionTime });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
