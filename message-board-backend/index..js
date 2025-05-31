const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  if (message) {
    messages.push(message);
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ error: 'Message is required' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
