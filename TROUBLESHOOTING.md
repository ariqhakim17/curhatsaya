# Troubleshooting Chat Gemini AI

## Masalah: "Error: Unexpected token 'T', "The page c"... is not valid JSON"

### Penyebab:
Error ini terjadi ketika server mengembalikan halaman HTML error alih-alih response JSON yang diharapkan.

### Solusi:
1. **Restart server**: Pastikan server berjalan dengan benar
   ```bash
   node server.js
   ```

2. **Periksa koneksi internet**: Pastikan koneksi internet stabil

3. **Periksa API key**: Pastikan API key Gemini valid dan aktif

4. **Buka Developer Tools**: 
   - Tekan F12 di browser
   - Buka tab Console
   - Lihat error yang muncul

## Masalah: Server tidak merespons

### Solusi:
1. **Periksa port**: Pastikan port 3001 tidak digunakan aplikasi lain
2. **Restart server**: Kill semua proses Node.js dan jalankan ulang
3. **Periksa firewall**: Pastikan firewall tidak memblokir port 3001

## Masalah: Gemini AI tidak merespons

### Solusi:
1. **Periksa API key**: Pastikan API key valid
2. **Periksa kuota**: Pastikan masih ada kuota API calls
3. **Periksa koneksi internet**: Pastikan bisa mengakses Google APIs

## Cara Debug:

1. **Buka file test-app.html** di browser untuk test koneksi
2. **Periksa console server** untuk melihat log request/response
3. **Periksa console browser** (F12) untuk melihat error frontend

## Log yang Berguna:

Server akan menampilkan log seperti:
```
2024-01-01T12:00:00.000Z - POST /chat
Request body: { message: 'Halo' }
Sending request to Gemini with prompt: ...
Gemini response status: 200
AI Response: Halo! Bagaimana kabarmu hari ini?...
```

## Kontak Support:
Jika masalah masih berlanjut, periksa:
1. Console browser (F12)
2. Console server (terminal)
3. Network tab di Developer Tools 