// ============================================
// PORTA-RETRATO INTELIGENTE — ESP32 + ILI9341
// Mostra foto + msg do dia, sincronizado com o site
// ============================================

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <SPI.h>
#include <TFT_eSPI.h>

// ---------- CONFIGURAÇÃO ----------
const char* WIFI_SSID     = "SEU_WIFI";
const char* WIFI_PASS     = "SUA_SENHA";
// Endpoint da API que retorna {mensagem, foto_url, dias_juntos}
// Pode ser uma Vercel Function, ou um JSON estático no GitHub
const char* API_URL       = "https://nosso-amor.vercel.app/api/dia.json";

const int PIN_PIR          = 13;
const unsigned long SLEEP_US = 60UL * 60UL * 1000000UL; // 1 hora entre atualizações

// ---------- DISPLAY ----------
TFT_eSPI tft = TFT_eSPI();

// ---------- ESTADO ----------
struct DiaData {
  String mensagem;
  String foto_url;
  int dias;
};

DiaData hoje;

// ---------- SETUP ----------
void setup() {
  Serial.begin(115200);
  pinMode(PIN_PIR, INPUT);

  tft.init();
  tft.setRotation(1); // paisagem
  tft.fillScreen(TFT_BLACK);

  // Mensagem de boot
  tft.setTextColor(TFT_PINK, TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(40, 100);
  tft.println("Conectando...");
  tft.setCursor(40, 130);
  tft.setTextSize(1);
  tft.println("Nosso Amor ♡");

  conectarWiFi();
  carregarDia();
  desenharTela();

  // Deep sleep
  esp_sleep_enable_timer_wakeup(SLEEP_US);
  esp_deep_sleep_start();
}

// ---------- LOOP (nunca executa) ----------
void loop() {}

// ---------- FUNÇÕES ----------
void conectarWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  int tentativas = 0;
  while (WiFi.status() != WL_CONNECTED && tentativas < 20) {
    delay(500);
    Serial.print(".");
    tentativas++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi OK: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWiFi falhou. Usando dados em cache.");
  }
}

void carregarDia() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(API_URL);
  http.setTimeout(10000);
  int code = http.GET();
  if (code == 200) {
    String body = http.getString();
    StaticJsonDocument<512> doc;
    if (deserializeJson(doc, body) == DeserializationError::Ok) {
      hoje.mensagem = doc["mensagem"].as<String>();
      hoje.foto_url = doc["foto_url"].as<String>();
      hoje.dias     = doc["dias_juntos"].as<int>();
      Serial.println("Dados do dia carregados.");
    }
  } else {
    Serial.println("Erro HTTP: " + String(code));
  }
  http.end();
}

void desenharTela() {
  tft.fillScreen(TFT_BLACK);

  // Header
  tft.setTextColor(TFT_PINK, TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(10, 5);
  tft.print("Nosso Amor ♡");

  // Contador de dias
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(1);
  tft.setCursor(10, 30);
  tft.printf("%d dias juntos", hoje.dias);

  // Linha divisória
  tft.drawFastHLine(0, 50, tft.width(), TFT_PINK);

  // Mensagem do dia
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);
  desenharTextoQuebrado(hoje.mensagem, 10, 70, tft.width() - 20, 18);

  // Foto (placeholder — em produção, decodificar JPG via TJpgDec)
  // Para agora, desenha um quadrado rosa simbolizando a foto
  int y_foto = 200;
  tft.fillRoundRect(60, y_foto, 200, 80, 8, TFT_PINK);
  tft.setTextColor(TFT_WHITE, TFT_PINK);
  tft.setTextSize(2);
  tft.setCursor(110, y_foto + 30);
  tft.print("[FOTO]");
}

void desenharTextoQuebrado(String texto, int x, int y, int largura, int linha_h) {
  // Quebra simples por palavras
  String palavra = "";
  int cx = x, cy = y;
  for (unsigned int i = 0; i < texto.length(); i++) {
    char c = texto[i];
    if (c == ' ' || i == texto.length() - 1) {
      if (c != ' ') palavra += c;
      int w = tft.textWidth(palavra);
      if (cx + w > x + largura) {
        cy += linha_h;
        cx = x;
        if (cy > 190) break; // não desenha por cima da foto
      }
      tft.setCursor(cx, cy);
      tft.print(palavra);
      cx += w;
      palavra = "";
    } else {
      palavra += c;
    }
  }
}
