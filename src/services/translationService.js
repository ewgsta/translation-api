import { config } from '../config/config.js';
import { ApiError } from '../utils/errors.js';

export async function translateSubtitle(content, format, apiKey) {
  const prompt = `Sen profesyonel bir altyazı çevirmenisin. Aşağıdaki ${format.toUpperCase()} formatındaki altyazı dosyasını Türkçeye çevir.

ÖNEMLİ KURALLAR:
1. Zaman kodlarını (timestamps) AYNEN koru, DEĞİŞTİRME
2. Dosya formatını (${format.toUpperCase()}) tam olarak koru
3. Numaralandırmayı koru
4. Sadece metinleri çevir
5. Duygu ve ton'u koru
6. Doğal Türkçe kullan
7. Hiçbir açıklama ekleme, sadece çevrilmiş dosyayı döndür

Altyazı dosyası:

${content}`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'translation-api'
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new ApiError(2002, 'API anahtarı geçersiz');
      }
      
      if (response.status === 429) {
        throw new ApiError(3004, 'Rate limit aşıldı');
      }

      throw new ApiError(3001, `OpenRouter API hatası: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new ApiError(3002, 'Model yanıt vermedi');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(3003, `Çeviri işlemi başarısız: ${error.message}`);
  }
}
