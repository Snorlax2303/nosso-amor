# Nosso Amor ♡

Site de presente de Dia dos Namorados + porta-retrato inteligente com ESP32.

## Stack
- HTML/CSS/JS puro (sem build step)
- YouTube Music embed (player ambiente)
- Deploy: Vercel via Git
- Porta-retrato: ESP32 + ILI9341 2.8" TFT

## Como rodar localmente
```bash
# Abra o index.html no navegador, ou sirva com:
npx serve .
```

## Estrutura
```
/
├── index.html         # Página principal
├── css/style.css      # Estilos (tema dark romântico)
├── js/
│   ├── config.js      # ⭐ EDITE AQUI: nomes, datas, senha
│   ├── marcos.js      # ⭐ EDITE AQUI: timeline de vocês
│   ├── musicas.js     # ⭐ EDITE AQUI: playlist (YouTube IDs)
│   ├── fotos.js       # ⭐ EDITE AQUI: URLs das fotos
│   ├── mensagens.js   # 365 mensagens (já prontas, mas personalize)
│   ├── carta.js       # ⭐ EDITE AQUI: a carta de amor
│   └── app.js         # Lógica (não mexer)
├── img/               # Coloque suas fotos aqui
└── vercel.json        # Config do deploy
```

## O que editar (em ordem de prioridade)

### 1. `js/config.js` ⭐
- `nomeCasal`: "Nomes de vocês"
- `seuNome`: sua assinatura
- `dataInicio`: data que começaram a namorar
- `senhaGate`: senha da tela de entrada (DDMMAAAA do primeiro beijo)

### 2. `js/marcos.js` ⭐
Adicione os momentos importantes (mínimo 5-8 marcos). Foto opcional.

### 3. `js/fotos.js` ⭐
Substitua as URLs pelas suas fotos. Pode hospedar no imgur, Cloudinary, ou colocar em `./img/`.

### 4. `js/musicas.js` ⭐
Pegue o ID das músicas no YouTube Music (URL: youtube.com/watch?v=**ID**).

### 5. `js/carta.js` ⭐
Escreva sua própria carta. Pode ser curta, mas tem que ser de verdade.

### 6. `js/mensagens.js` (opcional)
Já tem 365 mensagens prontas. Edite as que quiser.

## Deploy no Vercel
1. Suba pra um repositório Git (github.com/seuuser/nosso-amor)
2. Acesse vercel.com → New Project → Importar do Git
3. Deploy automático. URL: `nosso-amor.vercel.app`

## Senha da tela de entrada
Por padrão: `12062023` (12/06/2023 — edite em `config.js`).

Sugestões de pergunta:
- Data do primeiro beijo
- Data do "sim" (namoro)
- Data do primeiro encontro
- Local do primeiro encontro (palavra)

## Porta-Retrato Inteligente (ESP32)
Veja a pasta `firmware/` pra rodar no ESP32 com display ILI9341.

O ESP32 consulta uma API e mostra no display:
- Foto do dia
- Mensagem do dia
- Contador de dias juntos
- Acorda quando detecta movimento (sensor PIR)

## Recursos do site
- ✅ Tela de entrada com senha
- ✅ Contador ao vivo (dias, horas, min, seg juntos)
- ✅ Mensagem do dia (muda todo dia, 365 prontas)
- ✅ Timeline com marcos do casal
- ✅ Galeria de fotos com lightbox
- ✅ Player ambiente de música (YouTube Music)
- ✅ Carta aberta de amor
- ✅ Easter egg: digite "te amo" em qualquer lugar
- ✅ Corações flutuantes de fundo
- ✅ Countdown pro próximo dia dos namorados
- ✅ Foto do dia (mesma do porta-retrato)
- ✅ Totalmente responsivo (mobile-first)
- ✅ Tema dark romântico
