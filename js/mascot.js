// ============================================
// 🦊 MASCOTE RAPOSA MAYA
// Acompanha a página, reage a eventos, faz interações
// ============================================

(function() {
  'use strict';

  const mascot = document.getElementById('mascot');
  const tooltip = document.getElementById('mascot-tooltip');
  const heartsLayer = document.getElementById('mascot-hearts');
  if (!mascot) return;

  // Frases fofas que ele diz em momentos diferentes
  const FRASES = {
    idle:    ['Oi amor! 🦊', 'Tô aqui 💕', 'Clica em mim!', 'Vamos passear?'],
    love:    ['Te amo! 💛', 'Você é o melhor 🎀', 'Me abraça? 🫂'],
    sleep:   ['zzZ 💤', 'tô tirando um cochilo...'],
    dance:   ['🎵 dançando!', 'love love love', '🎶'],
    surprised: ['Uau!!', 'Que legal!', 'Olha só! 👀'],
    peek:    ['psiu, tô olhando 👀', 'essa foto é linda!'],
    scroll:  ['rolando junto! 🎢', 'vamos devagar?']
  };

  // Estado interno
  let currentState = 'idle';
  let idleTimer = null;
  let lastInteraction = Date.now();

  // ========== Funções auxiliares ==========
  function setState(state, durationMs) {
    if (currentState === state && state !== 'surprised' && state !== 'loving') return;
    currentState = state;
    mascot.className = 'mascot ' + state;
    if (durationMs) {
      setTimeout(() => {
        if (currentState === state) {
          mascot.className = 'mascot';
          currentState = 'idle';
        }
      }, durationMs);
    }
  }

  function speak(text) {
    if (!tooltip) return;
    tooltip.textContent = text;
    mascot.classList.add('show-tooltip');
    setTimeout(() => mascot.classList.remove('show-tooltip'), 2500);
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function spawnHeart() {
    if (!heartsLayer) return;
    const heart = document.createElement('div');
    heart.className = 'mascot-heart';
    heart.textContent = ['💛', '💕', '💖', '✨', '🦊'][Math.floor(Math.random() * 5)];
    heart.style.left = (20 + Math.random() * 50) + 'px';
    heart.style.top = (20 + Math.random() * 30) + 'px';
    heart.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
    heart.style.setProperty('--dr', (Math.random() * 60 - 30) + 'deg');
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
  }

  // ========== Interações do próprio mascote ==========

  // Clique no mascote → corações + fala fofa
  mascot.addEventListener('click', (e) => {
    e.stopPropagation();
    lastInteraction = Date.now();
    // Spawn 5 corações
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnHeart, i * 100);
    }
    setState('loving', 2500);
    speak(randomFrom(FRASES.love));
  });

  // ========== Reações aos eventos da página ==========

  // 1) Pacote abre → surpresa
  function watchPresente() {
    // Tenta diferentes formas de detectar abertura do pacote
    const checkPresente = setInterval(() => {
      // Se a section de mensagem do dia aparece, é sinal que o presente abriu
      const msgSection = document.getElementById('mensagem-overlay') || document.querySelector('.mensagem-overlay');
      const opened = document.querySelector('[data-presente-opened="true"]');
      if (opened && currentState !== 'surprised') {
        setState('surprised', 2000);
        speak(randomFrom(FRASES.surprised));
        clearInterval(checkPresente);
      }
    }, 500);
  }

  // Escuta evento customizado se o presente emitir
  document.addEventListener('presente:aberto', () => {
    setState('surprised', 2000);
    speak(randomFrom(FRASES.surprised));
  });

  // 2) Mensagem do dia abre → vai segurar o pergaminho
  document.addEventListener('mensagem:aberta', () => {
    setState('holding-scroll', 6000);
    speak('Olha que linda mensagem! 📜');
  });
  document.addEventListener('mensagem:fechada', () => {
    setState('idle');
  });

  // 3) Música tocando → dança
  document.addEventListener('musica:tocando', () => {
    setState('dancing');
    speak(randomFrom(FRASES.dance));
  });
  document.addEventListener('musica:pausada', () => {
    setState('idle');
  });

  // 4) Hover em polaroid → cutuca
  document.addEventListener('mouseover', (e) => {
    const polaroid = e.target.closest('.polaroid');
    if (polaroid && currentState === 'idle') {
      setState('peeking', 2000);
      speak(randomFrom(FRASES.peek));
    }
  });

  // 5) Stories abre → fica curioso
  document.addEventListener('stories:aberto', () => {
    setState('surprised', 1500);
    speak('Que foto linda! ✨');
  });
  document.addEventListener('stories:fechado', () => {
    setState('idle');
  });

  // 6) Scroll da página → observa inatividade
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    lastInteraction = Date.now();
    // Reage ao scroll com uma fala aleatória se tava dormindo
    if (currentState === 'sleeping') {
      setState('idle');
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (currentState === 'idle' && Math.random() < 0.3) {
        speak(randomFrom(FRASES.scroll));
      }
    }, 2000);
  }, { passive: true });

  // 7) Idle detection: depois de muito tempo sem interação, dorme
  idleTimer = setInterval(() => {
    const elapsed = Date.now() - lastInteraction;
    // Depois de 45s parado, dorme
    if (elapsed > 45000 && currentState === 'idle' && !document.hidden) {
      setState('sleeping');
      speak(randomFrom(FRASES.sleep));
    }
    // A cada 20s parado, mostra amor
    else if (elapsed > 20000 && currentState === 'idle' && Math.random() < 0.3) {
      spawnHeart();
    }
  }, 10000);

  // 8) Visibilidade: dorme quando aba some, acorda quando volta
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      setState('sleeping');
    } else {
      setState('idle');
      speak('Oi, voltou! 💕');
    }
  });

  // ========== Z-index game: escondendo atrás de polaroids ==========
  // Quando passa por uma polaroid, o mascote fica com z-index menor
  function checkBehind() {
    const mRect = mascot.getBoundingClientRect();
    const mCx = mRect.left + mRect.width / 2;
    const mCy = mRect.top + mRect.height / 2;
    let behind = false;
    document.querySelectorAll('.polaroid').forEach(p => {
      const r = p.getBoundingClientRect();
      if (mCx >= r.left && mCx <= r.right && mCy >= r.top && mCy <= r.bottom) {
        behind = true;
      }
    });
    // Floaters também
    document.querySelectorAll('.polaroid-floater').forEach(p => {
      const r = p.getBoundingClientRect();
      if (mCx >= r.left && mCx <= r.right && mCy >= r.top && mCy <= r.bottom) {
        behind = true;
      }
    });
    if (behind && !mascot.classList.contains('behind-polaroid')) {
      mascot.classList.add('behind-polaroid');
    } else if (!behind && mascot.classList.contains('behind-polaroid')) {
      mascot.classList.remove('behind-polaroid');
    }
  }
  // Checagem periódica (não mata performance)
  setInterval(checkBehind, 200);

  // ========== Fala inicial ==========
  setTimeout(() => {
    speak(randomFrom(FRASES.idle));
  }, 1500);

  // Expõe API global pra outros scripts poderem disparar reações
  window.Mascot = {
    setState,
    speak,
    spawnHeart,
    surprised: () => { setState('surprised', 2000); speak(randomFrom(FRASES.surprised)); },
    dance: () => setState('dancing'),
    sleep: () => setState('sleeping'),
    love: () => { setState('loving', 2500); for (let i = 0; i < 3; i++) setTimeout(spawnHeart, i * 150); }
  };

  console.log('🦊 Mascote Raposa Maya carregada!');
})();
