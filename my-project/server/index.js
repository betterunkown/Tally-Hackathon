const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to compile and execute code
// ... (same imports and initial setup as before)

app.post('/compile', (req, res) => {
    const { language, code, input } = req.body;

    let fileName;
    let command;

    if (language === 'python') {
        fileName = 'code.py';
        command = `python ${fileName}`;
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

    exec(command, (error, stdout, stderr) => {
        const endMemoryUsage = process.memoryUsage().heapUsed;
        const memoryUsage = `${((endMemoryUsage - startMemoryUsage) / 1024).toFixed(2)} KB`;

        if (error) {
            return res.status(400).json({ error: stderr });
        }

        res.json({ output: stdout, memoryUsage });
    });
});

// ... (same server listening setup)


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
