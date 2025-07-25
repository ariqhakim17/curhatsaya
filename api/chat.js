const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyBWpmeOZtdDm9P5smprUKbYmIX4fR5hJDo';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'No message provided' });
    }

    const promptSantai = `Kamu adalah psikolog santai, ramah, dan tidak perlu menjawab terlalu panjang. Jawab pertanyaan berikut dengan singkat, jelas, dan tetap empati: ${message}`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          { parts: [{ text: promptSantai }] }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        },
        timeout: 30000
      }
    );

    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada respons dari Gemini AI.';
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    let errorMessage = 'Terjadi kesalahan internal server';
    let statusCode = 500;

    if (err.response) {
      errorMessage = `Error dari Gemini AI: ${err.response.status} - ${err.response.statusText}`;
      statusCode = err.response.status;
    } else if (err.request) {
      errorMessage = 'Tidak dapat terhubung ke Gemini AI. Periksa koneksi internet Anda.';
    } else {
      errorMessage = `Error: ${err.message}`;
    }

    res.status(statusCode).json({ error: errorMessage });
  }
};