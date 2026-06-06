# Porta-Retrato Inteligente — ESP32 + ILI9341

Hardware:
- ESP32 DevKit
- Display ILI9341 2.8" (SPI)
- Sensor PIR HC-SR501 (detecta presença)
- Jumpers, protoboard ou PCB

## Pinagem (ESP32 → ILI9341)

| ILI9341 | ESP32 |
|---|---|
| VCC | 3.3V |
| GND | GND |
| CS | GPIO 15 |
| RESET | GPIO 4 |
| DC/RS | GPIO 2 |
| MOSI (SDA) | GPIO 23 |
| SCK (SCL) | GPIO 18 |
| LED | 3.3V (ou PWM pra controlar brilho) |
| T_IRQ | - (sem touch) |
| T_DO | - |
| T_DIN | - |
| T_CS | - |
| T_CLK | - |

## Pinagem PIR

| PIR | ESP32 |
|---|---|
| VCC | 5V (ou 3.3V, depende do módulo) |
| GND | GND |
| OUT | GPIO 13 |

## Setup Arduino IDE

1. Instale o suporte a ESP32 em `File > Preferences > Additional Board URLs`:
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
2. `Tools > Board > ESP32 Dev Module`
3. Instale as libs: **TFT_eSPI**, **ArduinoJson**, **HTTPClient** (já vem).

## Configuração do TFT_eSPI

Edite `User_Setup.h` da lib e descomente:
```
#define ILI9341_DRIVER
#define TFT_CS   15
#define TFT_DC    2
#define TFT_RST   4
#define TFT_MOSI 23
#define TFT_SCLK 18
```

## Configuração

Edite as constantes no início do `porta-retrato.ino`:
- `WIFI_SSID` e `WIFI_PASS`
- `API_URL` (endpoint que retorna a foto + msg do dia)

## Como funciona

1. ESP32 conecta no WiFi
2. A cada 1h (ou quando PIR detecta movimento) consulta a API
3. API retorna JSON com `mensagem`, `foto_url` e `dias_juntos`
4. ESP32 renderiza no display:
   - Fundo escuro
   - Foto em miniatura (desenhada pixel a pixel)
   - Mensagem curta do dia
   - Dias juntos em destaque
5. Volta a dormir (deep sleep) pra economizar energia
