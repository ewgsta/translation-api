# AI Çeviri API

SRT ve VTT altyazı dosyalarını Türkçeye çeviren API.

## Kurulum

```bash
npm install
```

`.env` dosyası oluştur:

```env
OPENROUTER_API_KEY=your_openrouter_key
API_KEY=your_secret_key
PORT=3000
```

## Çalıştırma

```bash
npm start
```

## API Kullanımı

### Endpoint

```
POST /api/translate
```

### Headers

| Header | Zorunlu | Açıklama |
|--------|---------|----------|
| x-api-key | Evet | .env'deki API_KEY değeri |
| Content-Type | Evet | multipart/form-data |

### Body

| Alan | Tip | Açıklama |
|------|-----|----------|
| file | File | .srt veya .vtt dosyası |

### Örnek İstek (cURL)

```bash
curl -X POST http://localhost:3000/api/translate \
  -H "x-api-key: your_secret_key" \
  -F "file=@subtitle.vtt"
```

### Örnek İstek (JavaScript)

```javascript
const formData = new FormData();
formData.append('file', file);

const response = await fetch('http://localhost:3000/api/translate', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_secret_key'
  },
  body: formData
});

const blob = await response.blob();
```

### Başarılı Yanıt

- Status: 200
- Content-Type: text/plain
- Content-Disposition: attachment; filename="original_filename.vtt"
- Body: Çevrilmiş altyazı içeriği

### Hata Yanıtları

```json
{
  "error": {
    "code": 1001,
    "message": "Dosya yüklenmedi"
  }
}
```

| Kod | Açıklama |
|-----|----------|
| 1001 | Dosya yüklenmedi |
| 1002 | Desteklenmeyen format |
| 1003 | Dosya okunamadı |
| 1004 | Dosya boyutu çok büyük (max 5MB) |
| 2001 | API key eksik |
| 2002 | API key geçersiz |
| 3001 | OpenRouter API hatası |
| 3002 | Model yanıt vermedi |
| 3004 | Rate limit aşıldı |

## Vercel'e Deploy

1. GitHub'a push et
2. Vercel'de import et
3. Environment variables ekle:
   - `OPENROUTER_API_KEY`
   - `API_KEY`
4. Deploy

```bash
npm i -g vercel
vercel
```

## Limitler

- Max dosya boyutu: 5MB
- Desteklenen formatlar: .srt, .vtt
