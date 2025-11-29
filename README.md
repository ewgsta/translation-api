# Translation API

SRT ve VTT altyazı dosyalarını Türkçeye çeviren basit bir API.

## Kurulum

```bash
npm install
```

`.env` dosyası oluşturun:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
API_KEY=your_api_key
PORT=3000
```

## Kullanım

Sunucuyu başlatın:

```bash
npm start
```

Altyazı dosyası gönderin:

```bash
curl -X POST http://localhost:3000/api/translate \
  -H "x-api-key: your_api_key" \
  -F "file=@altyazi.srt"
```

Çevrilen dosya otomatik olarak indirilir.

## Özellikler

- SRT ve VTT format desteği
- Grok 4.1 Fast model ile çeviri
- Maksimum 5MB dosya boyutu
- Zaman kodları ve format korunur

## Vercel'e Deploy

1. Vercel hesabınıza giriş yapın
2. Projeyi GitHub'a yükleyin
3. Vercel'de "New Project" ile projeyi import edin
4. Environment Variables ekleyin:
   - `OPENROUTER_API_KEY`
   - `API_KEY`
5. Deploy edin

Alternatif olarak Vercel CLI ile:

```bash
npm i -g vercel
vercel
```
