# Translation API

SRT ve VTT altyazı dosyalarını Türkçeye çeviren basit bir API.

## Kurulum

```bash
npm install
```

`.env` dosyası oluşturun:

```env
OPENROUTER_API_KEY=
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
  -F "file=@altyazi.srt"
```

Çevrilen dosya otomatik olarak indirilir.

## Özellikler

- SRT ve VTT format desteği
- Grok 4.1 Fast model ile çeviri
- Maksimum 5MB dosya boyutu
- Zaman kodları ve format korunur
