// ============================================
// APP — Lógica principal do site (landing única)
// ============================================

// Estado global
let currentLightboxIdx = 0;
let ambientMusicIdx = 0;
let ambientPlaying = true;
let currentMusicId = null;

// ============================================
// 1. Corações flutuantes
// ============================================
function criarCoracoes() {
  const container = document.getElementById('hearts-bg');
  const simbolos = ['♡', '❤', '💕', '💖', '💗'];
  setInterval(() => {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (14 + Math.random() * 18) + 'px';
    h.style.animationDuration = (10 + Math.random() * 10) + 's';
    container.appendChild(h);
    setTimeout(() => h.remove(), 20000);
  }, 800);
}

// ============================================
// 2. Tela de entrada (gate)
// ============================================
function initGate() {
  document.getElementById('gate-sub').textContent = CONFIG.perguntaGate;
  document.getElementById('gate-hint').textContent = CONFIG.dicaGate;

  const input = document.getElementById('gate-input');
  const btn = document.getElementById('gate-btn');
  const msg = document.getElementById('gate-msg');

  // Se senha vazia, esconde input (acesso livre só pra dev/teste)
  if (CONFIG.senhaGate === '') {
    input.style.display = 'none';
    btn.textContent = 'Entrar ♡';
  }

  const tentar = () => {
    // Normaliza: tira barras/separadores e compara só os números
    const valor = input.value.replace(/\D/g, '');
    const senhaNumeros = CONFIG.senhaGate.replace(/\D/g, '');
    // Se senha vazia, pula direto (gate desabilitado)
    if (CONFIG.senhaGate === '' || valor === senhaNumeros) {
      msg.textContent = '♡ Acertou! Entrando...';
      msg.style.color = '#3fb950';
      setTimeout(() => {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        sessionStorage.setItem('gate-ok', '1');
        initApp();
      }, 800);
    } else {
      msg.textContent = 'Hmm... tenta de novo 💭';
      msg.style.color = '#ff4f8b';
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
  };

  btn.addEventListener('click', tentar);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') tentar(); });
  input.addEventListener('input', e => {
    // Aceita números, barras e traços. Auto-formata tipo 12/06/2023
    let v = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
    if (v.length >= 5) v = v.slice(0,2) + '/' + v.slice(2,4) + '/' + v.slice(4);
    else if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });
}

// Shake animation
const style = document.createElement('style');
style.textContent = `.shake { animation: shake 0.4s; } @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }`;
document.head.appendChild(style);

// ============================================
// 3. Inicialização do app
// ============================================
function initApp() {
  document.getElementById('hero-name').textContent = CONFIG.nomeCasal;
  document.getElementById('hero-subtitle').textContent = CONFIG.subtitle || 'Cada dia ao seu lado é o melhor dia';
  document.getElementById('letter-from').textContent = `— ${CONFIG.seuNome}`;
  document.getElementById('year').textContent = new Date().getFullYear();

  renderTimeline();
  renderGaleria();
  renderCarta();
  renderMensagemDoDia();
  initPresente();
  startContador();
  criarCoracoes();
  initLightbox();
  initMusicFab();
  initSecret();

  // Música aleatória a cada visita
  setTimeout(() => tocarMusicaAleatoria(), 1500);
}

// ============================================
// 4. Contador ao vivo + Countdown dia dos namorados
// ============================================
function startContador() {
  const dataInicio = new Date(CONFIG.dataInicio);
  const atualizar = () => {
    const agora = new Date();
    let diff = Math.floor((agora - dataInicio) / 1000);
    const dias = Math.floor(diff / 86400);
    diff -= dias * 86400;
    const horas = Math.floor(diff / 3600);
    diff -= horas * 3600;
    const min = Math.floor(diff / 60);
    const seg = diff - min * 60;
    document.getElementById('c-dias').textContent = dias.toLocaleString('pt-BR');
    document.getElementById('c-horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('c-min').textContent = String(min).padStart(2, '0');
    document.getElementById('c-seg').textContent = String(seg).padStart(2, '0');

    // Countdown aniversário de casamento (01/01 do próximo ano)
    const prox = new Date(agora.getFullYear(), 0, 1); // 01 de janeiro
    if (prox <= agora) prox.setFullYear(agora.getFullYear() + 1);
    const diasRest = Math.ceil((prox - agora) / 86400000);
    const el = document.getElementById('countdown-valentines');
    if (el) el.textContent = diasRest;
    const sub = document.getElementById('countdown-sub');
    if (sub) sub.textContent = diasRest === 1 ? 'dia pro nosso aniversário de casamento ♡' : 'dias pro nosso aniversário de casamento ♡';
  };
  atualizar();
  setInterval(atualizar, 1000);
}

// ============================================
// 5. Timeline
// ============================================
function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container || !MARCOS || !MARCOS.length) {
    if (container) container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Em breve, nossos marcos 💕</p>';
    return;
  }
  // Ordena por data (campo data é só pra ordenação; usa dataLabel na exibição)
  const ordenados = [...MARCOS].sort((a, b) => new Date(a.data) - new Date(b.data));
  container.innerHTML = ordenados.map(m => `
    <div class="timeline-item">
      <div class="timeline-date">${m.dataLabel || formatarData(m.data)}</div>
      <h3 class="timeline-title">${m.titulo}</h3>
      <p class="timeline-text">${m.texto}</p>
      ${m.imagem ? `<img class="timeline-img" src="${m.imagem}" alt="${m.titulo}" loading="lazy" />` : ''}
    </div>
  `).join('');
}

function formatarData(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ============================================
// 6. Galeria
// ============================================
function renderGaleria() {
  const container = document.getElementById('gallery');
  if (!container) return;
  if (!FOTOS || !FOTOS.length) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Em breve, nossas fotos 📸</p>';
    return;
  }
  container.innerHTML = FOTOS.map((f, i) => `
    <div class="gallery-item" data-idx="${i}">
      <img src="${f.url}" alt="${f.legenda}" loading="lazy" />
      <div class="gallery-caption">${f.legenda}</div>
    </div>
  `).join('');
  container.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => abrirLightbox(parseInt(el.dataset.idx)));
  });
}

// ============================================
// 7. Lightbox
// ============================================
function initLightbox() {
  const close = document.getElementById('lightbox-close');
  const prev = document.getElementById('lightbox-prev');
  const next = document.getElementById('lightbox-next');
  if (!close) return;
  close.addEventListener('click', fecharLightbox);
  prev.addEventListener('click', () => navegarLightbox(-1));
  next.addEventListener('click', () => navegarLightbox(1));
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox').style.display === 'flex') {
      if (e.key === 'Escape') fecharLightbox();
      if (e.key === 'ArrowLeft') navegarLightbox(-1);
      if (e.key === 'ArrowRight') navegarLightbox(1);
    }
  });
}
function abrirLightbox(idx) {
  currentLightboxIdx = idx;
  atualizarLightbox();
  document.getElementById('lightbox').style.display = 'flex';
}
function fecharLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function navegarLightbox(delta) {
  currentLightboxIdx = (currentLightboxIdx + delta + FOTOS.length) % FOTOS.length;
  atualizarLightbox();
}
function atualizarLightbox() {
  const f = FOTOS[currentLightboxIdx];
  document.getElementById('lightbox-img').src = f.url;
  document.getElementById('lightbox-caption').textContent = `${f.legenda} · ${formatarData(f.data)}`;
}

// ============================================
// 8. Música — botão flutuante (FAB) + aleatoriedade
// ============================================
function initMusicFab() {
  const fab = document.getElementById('music-fab');
  if (!fab) return;
  fab.addEventListener('click', toggleMusica);
}

function tocarMusicaAleatoria() {
  if (!MUSICAS || !MUSICAS.length) return;
  // Sorteia um índice diferente do anterior (se houver mais de 1)
  let novoIdx;
  if (MUSICAS.length === 1) {
    novoIdx = 0;
  } else {
    do {
      novoIdx = Math.floor(Math.random() * MUSICAS.length);
    } while (novoIdx === ambientMusicIdx);
  }
  ambientMusicIdx = novoIdx;
  tocarMusica(novoIdx);
}

function tocarMusica(idx) {
  if (!MUSICAS || !MUSICAS.length) return;
  const m = MUSICAS[idx];
  if (!m) return;
  currentMusicId = m.youtubeId;
  const iframe = document.getElementById('ap-iframe');
  iframe.src = `https://www.youtube.com/embed/${m.youtubeId}?autoplay=1&loop=1&playlist=${m.youtubeId}&enablejsapi=1`;
  ambientPlaying = true;
  const fab = document.getElementById('music-fab');
  const icon = document.getElementById('music-fab-icon');
  if (fab) fab.classList.remove('paused');
  if (icon) icon.textContent = '🎵';
  fab.setAttribute('title', `Tocando: ${m.titulo} - ${m.artista}`);
}

function toggleMusica() {
  const fab = document.getElementById('music-fab');
  const icon = document.getElementById('music-fab-icon');
  const iframe = document.getElementById('ap-iframe');
  if (ambientPlaying) {
    // Pausar: esvazia o src (YouTube para de tocar)
    iframe.src = '';
    ambientPlaying = false;
    fab.classList.add('paused');
    icon.textContent = '🔇';
    fab.setAttribute('title', 'Tocar música');
  } else {
    // Tocar de novo: recarrega o iframe com o id atual
    if (currentMusicId) {
      iframe.src = `https://www.youtube.com/embed/${currentMusicId}?autoplay=1&loop=1&playlist=${currentMusicId}&enablejsapi=1`;
    } else {
      tocarMusicaAleatoria();
      return;
    }
    ambientPlaying = true;
    fab.classList.remove('paused');
    icon.textContent = '🎵';
    fab.setAttribute('title', 'Pausar música');
  }
}

// ============================================
// 9. Mensagem do dia — caixa de presente 3D
// ============================================
let mensagemDoDiaCache = null;
let presenteAberto = false;

function renderMensagemDoDia() {
  if (typeof getMensagemDoDia !== 'function') return;
  mensagemDoDiaCache = getMensagemDoDia();
  // Guarda a data também
  document.getElementById('daily-date').textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
}

function initPresente() {
  const box = document.getElementById('gift-box');
  const card = document.getElementById('gift-card');
  const text = document.getElementById('daily-text');
  const hint = document.getElementById('gift-hint');
  if (!box) return;

  const abrir = () => {
    if (presenteAberto) return;
    presenteAberto = true;
    box.classList.add('opened');
    hint.style.display = 'none';
    // depois da animação, mostra o card
    setTimeout(() => {
      card.classList.add('visible');
      // digita a mensagem letra a letra
      typeMessage(text, mensagemDoDiaCache || 'Te amo. ♡', 35);
    }, 900);
  };

  box.addEventListener('click', abrir);
  box.addEventListener('keypress', e => { if (e.key === 'Enter' || e.key === ' ') abrir(); });
}

function typeMessage(el, msg, speed) {
  el.textContent = '';
  el.classList.add('typing');
  let i = 0;
  const tick = () => {
    if (i <= msg.length) {
      el.textContent = msg.slice(0, i);
      i++;
      setTimeout(tick, speed);
    } else {
      el.classList.remove('typing');
    }
  };
  tick();
}

// ============================================
// 10. Carta
// ============================================
function renderCarta() {
  if (typeof CARTA === 'string') {
    document.getElementById('letter-content').innerHTML = CARTA;
  }
}

// ============================================
// 11. Easter egg: digitar "te amo"
// ============================================
function initSecret() {
  let buffer = '';
  const target = 'teamo';
  document.addEventListener('keypress', e => {
    buffer += e.key.toLowerCase();
    if (buffer.length > target.length) buffer = buffer.slice(-target.length);
    if (buffer === target) {
      document.getElementById('secret-overlay').style.display = 'flex';
      buffer = '';
    }
  });
  document.getElementById('secret-close').addEventListener('click', () => {
    document.getElementById('secret-overlay').style.display = 'none';
  });
}

// ============================================
// BOOT
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('gate-ok') === '1') {
    document.getElementById('gate').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    initApp();
  } else {
    initGate();
  }
});
