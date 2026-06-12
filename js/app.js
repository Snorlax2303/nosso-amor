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

  // 📸 Hero cover — foto da família como capa do contador
  const heroCover = document.getElementById('hero-cover');
  if (heroCover && FOTOS && FOTOS.length) {
    const capa = FOTOS.find(f => f.capa) || FOTOS[0];
    heroCover.style.backgroundImage = `url('${capa.url}')`;
  }

  renderTimeline();
  renderGaleria();
  renderFloaters();
  renderCarta();
  renderMensagemDoDia();
  initPresente();
  startContador();
  criarCoracoes();
  initBackToTop();
  initStories();
  initMusicFab();
  initSpotifyButtons();
  initSecret();
  initRevealOnScroll();

  // Música aleatória a cada visita
  setTimeout(() => tocarMusicaAleatoria(), 1500);
}

// ============================================
// 4. Contador ao vivo (grid 3x2) + Countdown 01/01
// ============================================
function startContador() {
  const dataInicio = new Date(CONFIG.dataInicio);
  const elAnos = document.getElementById('c-anos');
  const elMeses = document.getElementById('c-meses');
  const elDias = document.getElementById('c-dias');
  const elHoras = document.getElementById('c-horas');
  const elMin = document.getElementById('c-min');
  const elSeg = document.getElementById('c-seg');

  const atualizar = () => {
    const agora = new Date();
    // Calcula anos/meses/dias "reais" (calendário)
    // +1 na conta de anos pra usar contagem inclusiva (tipo aniversário):
    // 01/01/2014 → 01/01/2026 = "13 anos" (conta 2014, 2015... 2026 = 13)
    let anos = agora.getFullYear() - dataInicio.getFullYear() + 1;
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();
    if (dias < 0) {
      meses -= 1;
      // Dias no mês anterior
      const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
      dias += mesAnterior.getDate();
    }
    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }
    // Calcula horas/min/seg do dia de hoje
    const horas = agora.getHours();
    const min = agora.getMinutes();
    const seg = agora.getSeconds();
    if (elAnos) elAnos.textContent = anos.toLocaleString('pt-BR');
    if (elMeses) elMeses.textContent = meses;
    if (elDias) elDias.textContent = dias;
    if (elHoras) elHoras.textContent = String(horas).padStart(2, '0');
    if (elMin) elMin.textContent = String(min).padStart(2, '0');
    if (elSeg) elSeg.textContent = String(seg).padStart(2, '0');

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
  const ordenados = [...MARCOS].sort((a, b) => new Date(a.data) - new Date(b.data));
  container.innerHTML = ordenados.map((m, i) => `
    <div class="timeline-item reveal-on-scroll" style="animation-delay: ${i * 0.1}s">
      <div class="timeline-date">${m.dataLabel || formatarData(m.data)}</div>
      <h3 class="timeline-title">${m.titulo}</h3>
      <p class="timeline-text">${m.texto}</p>
      ${m.imagem ? `<img class="timeline-img" src="${m.imagem}" alt="${m.titulo}" loading="lazy" />` : ''}
    </div>
  `).join('');
  // Inicializa reveal no scroll
  setTimeout(initRevealOnScroll, 200);
}

function formatarData(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ============================================
// 6. Galeria — Polaroides espalhadas (scatter style)
// ============================================
function renderGaleria() {
  const container = document.getElementById('gallery');
  if (!container) return;
  // Filtra a foto marcada como capa (já usada no hero)
  const galeria = FOTOS.filter(f => !f.capa);
  if (!galeria || !galeria.length) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Em breve, nossas fotos 📸</p>';
    return;
  }
  container.innerHTML = galeria.map((f, i) => {
    const p = f.pos || {};
    const s = f.size || { w: 200, h: 260 };
    const tape = f.tape || 'tl';
    const cor = f.cor || 'rose';
    // Constrói o position style a partir do objeto pos
    const posStyle = [
      p.top ? `top: ${p.top};` : '',
      p.left ? `left: ${p.left};` : '',
      p.right ? `right: ${p.right};` : '',
      p.bottom ? `bottom: ${p.bottom};` : ''
    ].filter(Boolean).join(' ');
    return `
      <div class="polaroid reveal-on-scroll cor-${cor} tape-${tape}"
           data-idx="${i}"
           style="${posStyle}
                  --rot: ${p.rot || 0}deg;
                  --w: ${s.w}px;
                  --h: ${s.h}px;
                  animation-delay: ${i * 0.18}s;">
        <div class="polaroid-tape"></div>
        <div class="polaroid-img">
          <img src="${f.url}" alt="${f.legenda}" loading="lazy" />
        </div>
        <div class="polaroid-caption">
          <span class="polaroid-legenda">${f.legenda}</span>
          <span class="polaroid-data">${f.data || ''}</span>
        </div>
      </div>
    `;
  }).join('');
  container.querySelectorAll('.polaroid').forEach(el => {
    el.addEventListener('click', () => abrirLightbox(parseInt(el.dataset.idx)));
  });

  // 📐 Calcula altura dinâmica da galeria pra todas as polaroides caberem
  requestAnimationFrame(() => {
    const galeria = container;
    let maxBottom = 0;
    container.querySelectorAll('.polaroid').forEach(el => {
      const r = el.getBoundingClientRect();
      const bottomRel = (r.bottom - galeria.getBoundingClientRect().top);
      if (bottomRel > maxBottom) maxBottom = bottomRel;
    });
    if (maxBottom > 0) {
      galeria.style.minHeight = (maxBottom + 80) + 'px'; // 80px de respiro
    }
  });
}

// ============================================
// 6b. Floaters — polaroides decorativas espalhadas em toda a página
// position: fixed com opacidade reduzida, só enfeita o scroll
// ============================================
function renderFloaters() {
  if (typeof FLOATERS === 'undefined' || !FLOATERS.length) return;
  let layer = document.getElementById('floaters-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'floaters-layer';
    layer.className = 'floaters-layer';
    document.body.appendChild(layer);
  }
  layer.innerHTML = FLOATERS.map((f, i) => {
    const s = f.size || { w: 130, h: 170 };
    const tape = f.tape || 'tl';
    const op = f.op != null ? f.op : 0.7;
    const posStyle = [
      f.top ? `top: ${f.top};` : '',
      f.left ? `left: ${f.left};` : '',
      f.right ? `right: ${f.right};` : '',
      f.bottom ? `bottom: ${f.bottom};` : ''
    ].filter(Boolean).join(' ');
    return `
      <div class="polaroid-floater reveal-on-scroll tape-${tape}"
           style="${posStyle}
                  --rot: ${f.rot || 0}deg;
                  --w: ${s.w}px;
                  --h: ${s.h}px;
                  --op: ${op};
                  animation-delay: ${i * 0.12}s;">
        <div class="polaroid-tape"></div>
        <div class="polaroid-img">
          <img src="${f.url}" alt="" loading="lazy" />
        </div>
      </div>
    `;
  }).join('');
}

// ============================================
// 7. Stories — carrossel fullscreen estilo Instagram
// ============================================
let storiesIdx = 0;
let storiesStartX = 0;
let storiesStartY = 0;

function initStories() {
  document.querySelectorAll('.polaroid').forEach(el => {
    el.addEventListener('click', () => abrirStories(parseInt(el.dataset.idx)));
  });
  document.getElementById('stories-close').addEventListener('click', fecharStories);
  document.getElementById('stories-prev').addEventListener('click', () => navegarStories(-1));
  document.getElementById('stories-next').addEventListener('click', () => navegarStories(1));
  document.addEventListener('keydown', e => {
    if (document.getElementById('stories-overlay').style.display === 'flex') {
      if (e.key === 'Escape') fecharStories();
      if (e.key === 'ArrowLeft') navegarStories(-1);
      if (e.key === 'ArrowRight') navegarStories(1);
    }
  });
  // Touch/swipe
  const slide = document.getElementById('stories-slide');
  slide.addEventListener('touchstart', e => {
    storiesStartX = e.touches[0].clientX;
    storiesStartY = e.touches[0].clientY;
  });
  slide.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - storiesStartX;
    const dy = e.changedTouches[0].clientY - storiesStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      navegarStories(dx < 0 ? 1 : -1);
    } else if (dy > 80 && Math.abs(dx) < 50) {
      fecharStories();
    }
  });
}

function abrirStories(idx) {
  storiesIdx = idx;
  atualizarStoriesSlide();
  document.getElementById('stories-overlay').style.display = 'flex';
  document.getElementById('stories-hint').style.opacity = '1';
  setTimeout(() => document.getElementById('stories-hint').style.opacity = '0', 2000);
  // Barra de progresso
  iniciarStoriesProgresso();
  // 🦊 Avisa o mascote
  document.dispatchEvent(new CustomEvent('stories:aberto', { detail: { idx } }));
}
function fecharStories() {
  document.getElementById('stories-overlay').style.display = 'none';
  pararStoriesProgresso();
  // 🦊 Avisa o mascote
  document.dispatchEvent(new CustomEvent('stories:fechado'));
}
function navegarStories(delta) {
  storiesIdx = (storiesIdx + delta + FOTOS.length) % FOTOS.length;
  atualizarStoriesSlide();
  iniciarStoriesProgresso();
}
function atualizarStoriesSlide() {
  const f = FOTOS[storiesIdx];
  document.getElementById('stories-img').src = f.url;
  document.getElementById('stories-caption').textContent = f.legenda;
}
let storiesTimer = null;
function iniciarStoriesProgresso() {
  pararStoriesProgresso();
  const bar = document.getElementById('stories-progress');
  const total = 5; // 5s de duração
  let elapsed = 0;
  bar.style.width = '0%';
  storiesTimer = setInterval(() => {
    elapsed += 0.1;
    bar.style.width = (elapsed / total * 100) + '%';
    if (elapsed >= total) {
      navegarStories(1);
    }
  }, 100);
}
function pararStoriesProgresso() {
  if (storiesTimer) { clearInterval(storiesTimer); storiesTimer = null; }
}

// ============================================
// 8. Música — Player Spotify (novo) + FAB (compatível)
// ============================================
function initMusicFab() {
  const fab = document.getElementById('music-fab');
  if (!fab) return;
  fab.addEventListener('click', toggleMusica);
}

function tocarMusicaAleatoria() {
  if (!MUSICAS || !MUSICAS.length) return;
  let novoIdx;
  if (MUSICAS.length === 1) {
    novoIdx = 0;
  } else {
    do { novoIdx = Math.floor(Math.random() * MUSICAS.length); }
    while (novoIdx === ambientMusicIdx);
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
  // FAB
  const fab = document.getElementById('music-fab');
  const icon = document.getElementById('music-fab-icon');
  if (fab) fab.classList.remove('paused');
  if (icon) icon.textContent = '🎵';
  if (fab) fab.setAttribute('title', `Tocando: ${m.titulo} - ${m.artista}`);
  // Spotify player
  updateSpotifyPlayer(m, true);
}

function toggleMusica() {
  const iframe = document.getElementById('ap-iframe');
  const fab = document.getElementById('music-fab');
  const icon = document.getElementById('music-fab-icon');
  if (ambientPlaying) {
    iframe.src = '';
    ambientPlaying = false;
    if (fab) { fab.classList.add('paused'); fab.setAttribute('title', 'Tocar música'); }
    if (icon) icon.textContent = '🔇';
    updateSpotifyPlayer(null, false);
  } else {
    const idValido = currentMusicId && MUSICAS && MUSICAS.some(m => m.youtubeId === currentMusicId);
    if (idValido) {
      iframe.src = `https://www.youtube.com/embed/${currentMusicId}?autoplay=1&loop=1&playlist=${currentMusicId}&enablejsapi=1`;
      ambientPlaying = true;
      if (fab) { fab.classList.remove('paused'); }
      if (icon) icon.textContent = '🎵';
      const m = MUSICAS.find(x => x.youtubeId === currentMusicId);
      if (fab && m) fab.setAttribute('title', `Pausar música: ${m.titulo} - ${m.artista}`);
      updateSpotifyPlayer(m, true);
    } else {
      tocarMusicaAleatoria();
      return;
    }
  }
}

// ===== Spotify Player =====
function updateSpotifyPlayer(musica, playing) {
  const cover = document.getElementById('spotify-img');
  const title = document.getElementById('spotify-title');
  const artist = document.getElementById('spotify-artist');
  const playBtn = document.getElementById('spotify-play');
  const fill = document.getElementById('spotify-fill');
  if (!title) return;

  // 🦊 Avisa o mascote que a música mudou de estado
  document.dispatchEvent(new CustomEvent(playing ? 'musica:tocando' : 'musica:pausada', {
    detail: { musica }
  }));

  if (musica && playing) {
    if (cover) { cover.src = musica.capa || ''; cover.style.display = 'block'; }
    title.textContent = musica.titulo;
    artist.textContent = musica.artista;
    if (playBtn) playBtn.textContent = '⏸';
    // Simula barra de progresso (fake, YT não expõe API via iframe simples)
    iniciarProgressoFake();
  } else {
    if (cover) cover.style.display = 'none';
    title.textContent = playing ? 'Tocando...' : 'Pausado';
    artist.textContent = '—';
    if (playBtn) playBtn.textContent = '▶';
    if (fill) fill.style.width = '0%';
    pararProgressoFake();
  }
}

let progressoInterval = null;
function iniciarProgressoFake() {
  pararProgressoFake();
  const fill = document.getElementById('spotify-fill');
  if (!fill) return;
  fill.style.width = '0%';
  let w = 0;
  progressoInterval = setInterval(() => {
    w += 0.15;
    if (w >= 95) { w = 0; } // reinicia
    fill.style.width = w + '%';
  }, 300);
}
function pararProgressoFake() {
  if (progressoInterval) { clearInterval(progressoInterval); progressoInterval = null; }
}

function initSpotifyButtons() {
  const prev = document.getElementById('spotify-prev');
  const play = document.getElementById('spotify-play');
  const next = document.getElementById('spotify-next');
  if (prev) prev.addEventListener('click', () => {
    ambientMusicIdx = (ambientMusicIdx - 1 + MUSICAS.length) % MUSICAS.length;
    tocarMusica(ambientMusicIdx);
  });
  if (play) play.addEventListener('click', toggleMusica);
  if (next) next.addEventListener('click', () => {
    ambientMusicIdx = (ambientMusicIdx + 1) % MUSICAS.length;
    tocarMusica(ambientMusicIdx);
  });
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
    // Efeito: pacote "explode" pra cima com partículas (estilo unboxing)
    box.classList.add('opened');
    hint.style.display = 'none';
    // 🦊 Avisa o mascote que presente abriu
    document.dispatchEvent(new CustomEvent('presente:aberto'));
    // depois da animação, mostra o card
    setTimeout(() => {
      card.classList.add('visible');
      // digita a mensagem letra a letra
      typeMessage(text, mensagemDoDiaCache || 'Te amo. ♡', 35);
      // 🦊 Avisa que mensagem está aberta (mascote segura o pergaminho)
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('mensagem:aberta'));
      }, 500);
    }, 1100);
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
// Back to top — aparece ao rolar, scroll suave
// ============================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  let visible = false;
  const toggle = () => {
    const shouldShow = window.scrollY > 400;
    if (shouldShow !== visible) {
      visible = shouldShow;
      btn.classList.toggle('visible', visible);
    }
  };
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  toggle();
}


// ============================================
// 13. Reveal on scroll (IntersectionObserver)
// ============================================
function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
  items.forEach(el => observer.observe(el));
}


// BOOT
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  // Se veio via tag NFC (nfc.html setou a flag), pula o gate
  const viaNFC = sessionStorage.getItem('nosso-amor-via-nfc') === '1';
  if (viaNFC || sessionStorage.getItem('gate-ok') === '1') {
    document.getElementById('gate').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    sessionStorage.setItem('gate-ok', '1');
    if (typeof initApp === 'function') initApp();
  } else {
    initGate();
  }
});
