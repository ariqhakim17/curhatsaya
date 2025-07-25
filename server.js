const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

// API key Gemini dari user
const GEMINI_API_KEY = 'AIzaSyBWpmeOZtdDm9P5smprUKbYmIX4fR5hJDo';

app.use(cors());
app.use(express.json());

// Serve file statis dari folder frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Route root mengirimkan index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  // Prompt engineering: instruksi gaya bahasa psikolog profesional santai, lengkap, teliti
  const prompt = "Kamu adalah seorang psikolog profesional. Jawablah setiap curhatan dengan bahasa santai, ramah, lengkap, dan teliti, serta berikan saran yang bermanfaat. " + message;

  try {
    // Request ke Gemini AI (mengikuti contoh cURL user)
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          { parts: [{ text: prompt }] }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        }
      }
    );

    // Ambil respons AI
    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons dari Gemini AI.';
    res.json({ response: aiResponse });
  } catch (err) {
    console.error('Gemini AI error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to get response from Gemini AI', details: err.message });
  }
});

app.get('/test-internet', async (req, res) => {
  try {
    await axios.get('https://www.google.com');
    res.send('Koneksi internet dari backend: AKTIF');
  } catch (err) {
    res.send('Koneksi internet dari backend: GAGAL');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 