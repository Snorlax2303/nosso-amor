// ============================================
// APP — Lógica principal do site
// ============================================

// Estado global
let currentTab = 'home';
let currentLightboxIdx = 0;
let ambientMusicIdx = 0;
let ambientPlaying = true;

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
  document.querySelector('.gate-sub').textContent = CONFIG.perguntaGate;
  document.querySelector('.gate-hint').textContent = CONFIG.dicaGate;

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
  document.getElementById('letter-from').textContent = `— ${CONFIG.seuNome}`;
  document.getElementById('year').textContent = new Date().getFullYear();

  renderTimeline();
  renderGaleria();
  renderMusicas();
  renderCarta();
  renderMensagemDoDia();
  renderFotoDoDia();
  startContador();
  criarCoracoes();
  initTabs();
  initLightbox();
  initAmbientPlayer();
  initSecret();
  updateClock();
  setInterval(updateClock, 1000);
  // já começa a música
  setTimeout(() => tocarMusica(0), 1500);
}

// ============================================
// 4. Relógio + Contador ao vivo
// ============================================
function updateClock() {
  const agora = new Date();
  document.getElementById('header-time').textContent =
    agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

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
    document.getElementById('c-dias').textContent = dias;
    document.getElementById('c-horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('c-min').textContent = String(min).padStart(2, '0');
    document.getElementById('c-seg').textContent = String(seg).padStart(2, '0');

    // Countdown dia dos namorados
    const prox = new Date(agora.getFullYear(), 5, 12); // 12 de junho
    if (prox < agora) prox.setFullYear(agora.getFullYear() + 1);
    const diasRest = Math.ceil((prox - agora) / 86400000);
    document.getElementById('countdown-valentines').textContent = `${diasRest} dias ♡`;
  };
  atualizar();
  setInterval(atualizar, 1000);
}

// ============================================
// 5. Timeline
// ============================================
function renderTimeline() {
  const container = document.getElementById('timeline');
  // Ordena por data
  const ordenados = [...MARCOS].sort((a, b) => new Date(a.data) - new Date(b.data));
  container.innerHTML = ordenados.map(m => `
    <div class="timeline-item">
      <div class="timeline-date">${formatarData(m.data)}</div>
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
  document.getElementById('lightbox-close').addEventListener('click', fecharLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => navegarLightbox(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => navegarLightbox(1));
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox').style.display === 'block') {
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
// 8. Músicas
// ============================================
function renderMusicas() {
  const container = document.getElementById('music-list');
  container.innerHTML = MUSICAS.map((m, i) => `
    <div class="music-card" data-idx="${i}">
      <img src="${m.capa}" alt="${m.titulo}" />
      <div class="music-info">
        <div class="music-title">${m.titulo}</div>
        <div class="music-artist">${m.artista}</div>
        <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px; font-style: italic;">"${m.significado}"</p>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.music-card').forEach(el => {
    el.addEventListener('click', () => tocarMusica(parseInt(el.dataset.idx)));
  });
}

// ============================================
// 9. Player ambiente (YouTube Music via iframe)
// ============================================
function initAmbientPlayer() {
  document.getElementById('ap-prev').addEventListener('click', () => {
    ambientMusicIdx = (ambientMusicIdx - 1 + MUSICAS.length) % MUSICAS.length;
    tocarMusica(ambientMusicIdx);
  });
  document.getElementById('ap-next').addEventListener('click', () => {
    ambientMusicIdx = (ambientMusicIdx + 1) % MUSICAS.length;
    tocarMusica(ambientMusicIdx);
  });
  document.getElementById('ap-play').addEventListener('click', () => {
    ambientPlaying = !ambientPlaying;
    document.getElementById('ap-play').textContent = ambientPlaying ? '⏸' : '▶';
    // Recarrega pra pausar/retomar
    const iframe = document.getElementById('ap-iframe');
    if (!ambientPlaying) {
      iframe.src = '';
    } else {
      tocarMusica(ambientMusicIdx, true);
    }
  });
  document.getElementById('ap-vol').addEventListener('click', e => {
    e.target.textContent = e.target.textContent === '🔊' ? '🔇' : '🔊';
  });
}

function tocarMusica(idx, force = false) {
  if (!MUSICAS.length) return;
  ambientMusicIdx = idx;
  const m = MUSICAS[idx];
  document.getElementById('ap-title').textContent = `Tocando: ${m.titulo} - ${m.artista}`;
  // YouTube embed em autoplay
  const iframe = document.getElementById('ap-iframe');
  iframe.src = `https://www.youtube.com/embed/${m.youtubeId}?autoplay=1&loop=1&playlist=${m.youtubeId}&enablejsapi=1`;
  ambientPlaying = true;
  document.getElementById('ap-play').textContent = '⏸';
}

// ============================================
// 10. Mensagem do dia
// ============================================
function renderMensagemDoDia() {
  const msg = getMensagemDoDia();
  document.getElementById('daily-text').textContent = msg;
  document.getElementById('daily-date').textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });
}

// ============================================
// 11. Foto do dia (mesma do porta-retrato)
// ============================================
function renderFotoDoDia() {
  const hoje = new Date();
  const chave = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
  let foto;
  if (FOTOS_ESPECIAIS[chave]) {
    foto = FOTOS_ESPECIAIS[chave];
  } else {
    // Pega do array com base no dia do ano
    const inicio = new Date(hoje.getFullYear(), 0, 0);
    const diff = hoje - inicio;
    const diaDoAno = Math.floor(diff / 86400000);
    foto = FOTOS[(diaDoAno - 1) % FOTOS.length];
  }
  document.getElementById('photo-of-day-img').src = foto.url;
  document.getElementById('photo-of-day-caption').textContent = foto.legenda;
}

// ============================================
// 12. Carta
// ============================================
function renderCarta() {
  document.getElementById('letter-content').innerHTML = CARTA;
}

// ============================================
// 13. Tabs
// ============================================
function initTabs() {
  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      const target = t.dataset.tab;
      document.getElementById(`tab-${target}`).classList.add('active');
      currentTab = target;
    });
  });
}

// ============================================
// 14. Easter egg: digitar "te amo"
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
