const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3001;

// API key Gemini dari user
const GEMINI_API_KEY = 'AIzaSyBWpmeOZtdDm9P5smprUKbYmIX4fR5hJDo';

// Konfigurasi CORS yang lebih spesifik
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true
}));

app.use(express.json());

// Middleware untuk logging semua request
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

// Serve file statis dari folder frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Route root mengirimkan index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    console.log('Received message:', message);

    // Prompt engineering: instruksi gaya bahasa psikolog profesional santai, lengkap, teliti
    const prompt = "Kamu adalah seorang psikolog profesional. Jawablah setiap curhatan dengan bahasa santai, ramah, lengkap, dan teliti, serta berikan saran yang bermanfaat. " + message;

    console.log('Sending request to Gemini with prompt:', prompt);

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
        },
        timeout: 30000 // 30 detik timeout
      }
    );

    console.log('Gemini response status:', response.status);
    console.log('Gemini response data:', JSON.stringify(response.data, null, 2));

    // Ambil respons AI
    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons dari Gemini AI.';
    console.log('AI Response:', aiResponse);
    
    // Pastikan response dalam format JSON yang valid
    res.setHeader('Content-Type', 'application/json');
    res.json({ response: aiResponse });
    
  } catch (err) {
    console.error('Error in /chat endpoint:', err);
    
    let errorMessage = 'Terjadi kesalahan internal server';
    let statusCode = 500;
    
    if (err.response) {
      // Error dari Gemini API
      console.error('Gemini API error:', err.response.data);
      errorMessage = `Error dari Gemini AI: ${err.response.status} - ${err.response.statusText}`;
      statusCode = err.response.status;
    } else if (err.request) {
      // Network error
      console.error('Network error:', err.request);
      errorMessage = 'Tidak dapat terhubung ke Gemini AI. Periksa koneksi internet Anda.';
    } else {
      // Other error
      console.error('Other error:', err.message);
      errorMessage = `Error: ${err.message}`;
    }
    
    // Pastikan response error juga dalam format JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode).json({ error: errorMessage });
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