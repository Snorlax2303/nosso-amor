// ============================================
// 🦊 MASCOTE RAPOSA MAYA — Companheira de Página
// Acompanha a página, reage a seções, faz festinhas
// ============================================

(function() {
  'use strict';

  const mascot   = document.getElementById('mascot');
  const tooltip  = document.getElementById('mascot-tooltip');
  const hearts   = document.getElementById('mascot-hearts');
  const svg      = document.getElementById('mascot-svg');
  if (!mascot) return;

  // ========== Frases fofas ==========
  const FRASES = {
    idle:    ['Oi amor! 🦊', 'Tô aqui 💕', 'Clica em mim!', 'Vamos passear?'],
    love:    ['Te amo! 💛', 'Você é o melhor 🎀', 'Me abraça? 🫂'],
    sleep:   ['zzZ 💤', 'tô tirando um cochilo...'],
    dance:   ['🎵 dançando!', 'love love love', '🎶'],
    surprised: ['Uau!!', 'Que legal!', 'Olha só! 👀'],
    peek:    ['psiu, tô olhando 👀', 'essa foto é linda!'],
    scroll:  ['rolando junto! 🎢', 'vamos devagar?'],
    read:    ['Que linda carta 💌', 'palavras suas...', 'me emociona 🥹'],
    cling:   ['ei, essa foto é nossa!', 'tô espreitando 👀', 'linda!'],
    follow:  ['tô aqui do ladinho 💛', 'não vou te perder']
  };

  // ========== Estado interno ==========
  let currentState    = 'idle';
  let lastInteraction = Date.now();
  let targetX         = null; // % da largura
  let targetY         = null; // offset do scroll
  let currentX        = 0;    // posição atual em % (lateral)
  let currentY        = 0;    // offset scroll aplicado
  let isWalking       = false;
  let activeSection   = null;
  let walkInterval    = null;
  let rafId           = null;
  let isPlaying       = false;

  // ========== Helpers ==========
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
    clearTimeout(speak._t);
    speak._t = setTimeout(() => mascot.classList.remove('show-tooltip'), 2500);
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function spawnHeart() {
    if (!hearts) return;
    const h = document.createElement('div');
    h.className = 'mascot-heart';
    h.textContent = ['💛', '💕', '💖', '✨', '🦊'][Math.floor(Math.random() * 5)];
    h.style.left = (15 + Math.random() * 55) + 'px';
    h.style.top  = (15 + Math.random() * 35) + 'px';
    h.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
    h.style.setProperty('--dr', (Math.random() * 60 - 30) + 'deg');
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 1500);
  }

  // ========== Posicionamento: Maya viaja com a página ==========
  // Em vez de fixed no canto, ela "segue" o scroll com parallax
  // e pode andar para o lado de cada seção.
  function applyPosition() {
    if (targetX === null) return;
    // Suaviza o movimento
    currentX += (targetX - currentX) * 0.12;
    // Parallax Y: pega o scrollY atual
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = maxScroll > 0 ? scrollY / maxScroll : 0; // 0..1
    // Posição Y alvo: acompanha o scroll mas com offset pra não ser 1:1
    // (fica um pouco acima/abaixo do "esperado" pra parecer viva)
    const parallaxOffset = Math.sin(progress * Math.PI * 2) * 40; // oscila -40..40
    const targetYPos = window.innerHeight * 0.65 - parallaxOffset;
    // Suaviza Y também
    currentY += (targetYPos - currentY) * 0.10;
    // Aplica via transform (GPU)
    mascot.style.transform = `translate3d(${currentX}vw, ${currentY}px, 0) ${mascot.dataset.extraTransform || ''}`;
  }

  function setTargetX(percent) {
    targetX = percent;
  }

  // Loop de animação via requestAnimationFrame
  function loop() {
    applyPosition();
    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);

  // ========== Walker: Maya anda pra novas posições ==========
  function walkTo(xPercent) {
    if (isWalking) return;
    isWalking = true;
    setTargetX(xPercent);
    mascot.classList.add('walking');
    setTimeout(() => {
      mascot.classList.remove('walking');
      isWalking = false;
    }, 1200);
  }

  // A cada 8s, decide se anda pra outro canto
  function startWalker() {
    walkInterval = setInterval(() => {
      // Não anda se tá em estado de ação (dancing, sleeping, reading)
      if (['dancing', 'sleeping', 'holding-scroll', 'reading-letter'].includes(currentState)) return;
      // 50% chance de andar
      if (Math.random() < 0.5) {
        const newX = 5 + Math.random() * 80; // 5% a 85%
        walkTo(newX);
      }
    }, 8000);
  }

  // ========== Reações por seção (IntersectionObserver) ==========
  // Detecta qual seção está em foco e move a Maya pra perto dela
  const SECTIONS = [
    { id: 'hero',     side: 'right',  x: 78,  speak: 'follow' },
    { id: 'mensagem', side: 'left',   x: 12,  speak: 'read'   },
    { id: 'contador', side: 'right',  x: 82,  speak: 'follow' },
    { id: 'marcos',   side: 'left',   x: 8,   speak: 'follow' },
    { id: 'galeria',  side: 'right',  x: 80,  speak: 'cling'  },
    { id: 'carta',    side: 'left',   x: 14,  speak: 'read'   }
  ];

  function setupSectionObserver() {
    const seen = new Map(); // id -> intersectionRatio
    SECTIONS.forEach(cfg => {
      const el = document.getElementById(cfg.id);
      if (!el) return;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          seen.set(cfg.id, e.intersectionRatio);
        });
        // Pega a seção com maior visibilidade
        let best = null, bestRatio = 0;
        seen.forEach((r, id) => {
          if (r > bestRatio) { bestRatio = r; best = id; }
        });
        if (best && best !== activeSection && bestRatio > 0.25) {
          activeSection = best;
          const cfg2 = SECTIONS.find(s => s.id === best);
          if (cfg2) {
            walkTo(cfg2.x);
            // Ajusta lado preferido (afasta do conteúdo)
            mascot.classList.toggle('side-left',  cfg2.side === 'left');
            mascot.classList.toggle('side-right', cfg2.side === 'right');
            // Fala contextual
            setTimeout(() => speak(rand(FRASES[cfg2.speak] || FRASES.follow)), 900);
          }
        }
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
      obs.observe(el);
    });
  }

  // ========== Clique na Maya ==========
  mascot.addEventListener('click', (e) => {
    e.stopPropagation();
    lastInteraction = Date.now();
    for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 100);
    setState('loving', 2500);
    speak(rand(FRASES.love));
  });

  // ========== Hover em polaroid → Maya pula perto e cutuca ==========
  document.addEventListener('mouseover', (e) => {
    const polaroid = e.target.closest('.polaroid, .polaroid-floater');
    if (polaroid && currentState === 'idle') {
      // Pega a posição da polaroid e pula pra perto
      const r = polaroid.getBoundingClientRect();
      const xPct = Math.max(5, Math.min(85, (r.left / window.innerWidth) * 100));
      // Decide lado: se polaroid tá na esquerda, Maya vai pra direita (e vice-versa)
      const targetX = xPct < 50 ? Math.min(85, xPct + 30) : Math.max(5, xPct - 30);
      walkTo(targetX);
      setState('clinging-polaroid', 3000);
      setTimeout(() => speak(rand(FRASES.cling)), 500);
    }
  });

  // ========== Reações a eventos customizados ==========
  document.addEventListener('presente:aberto', () => {
    walkTo(50); // corre pro centro
    setState('surprised', 2000);
    setTimeout(() => speak(rand(FRASES.surprised)), 300);
  });

  document.addEventListener('mensagem:aberta', () => {
    setState('holding-scroll', 6000);
    speak('Olha que linda mensagem! 📜');
  });

  document.addEventListener('mensagem:fechada', () => setState('idle'));

  document.addEventListener('musica:tocando', () => {
    isPlaying = true;
    setState('dancing');
    speak(rand(FRASES.dance));
  });

  document.addEventListener('musica:pausada', () => {
    isPlaying = false;
    setState('idle');
  });

  document.addEventListener('stories:aberto', () => {
    setState('surprised', 1500);
    speak('Que foto linda! ✨');
  });

  document.addEventListener('stories:fechado', () => setState('idle'));

  // ========== Scroll: Maya "lê junto" perto da carta ==========
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    lastInteraction = Date.now();
    if (currentState === 'sleeping') setState('idle');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Se tá na seção da carta, fica em estado de leitura
      const carta = document.getElementById('carta');
      if (carta) {
        const r = carta.getBoundingClientRect();
        const inView = r.top < window.innerHeight * 0.7 && r.bottom > 0;
        if (inView && currentState === 'idle' && !isPlaying) {
          setState('reading-letter');
        }
      }
    }, 800);
  }, { passive: true });

  // ========== Idle detection ==========
  setInterval(() => {
    const elapsed = Date.now() - lastInteraction;
    if (elapsed > 45000 && currentState === 'idle' && !document.hidden) {
      setState('sleeping');
      speak(rand(FRASES.sleep));
    } else if (elapsed > 20000 && currentState === 'idle' && Math.random() < 0.3) {
      spawnHeart();
    }
  }, 10000);

  // ========== Visibilidade ==========
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      setState('sleeping');
    } else {
      setState('idle');
      setTimeout(() => speak('Oi, voltou! 💕'), 400);
    }
  });

  // ========== Z-index: escondida atrás de polaroides ==========
  function checkBehind() {
    const mR = mascot.getBoundingClientRect();
    const mCx = mR.left + mR.width / 2;
    const mCy = mR.top + mR.height / 2;
    let behind = false;
    document.querySelectorAll('.polaroid, .polaroid-floater').forEach(p => {
      const r = p.getBoundingClientRect();
      // Verifica se o CENTRO da Maya tá dentro da polaroid
      if (mCx >= r.left && mCx <= r.right && mCy >= r.top && mCy <= r.bottom) {
        behind = true;
      }
    });
    mascot.classList.toggle('behind-polaroid', behind);
  }
  setInterval(checkBehind, 250);

  // ========== Init ==========
  // Posição inicial: lado direito, um pouco acima do "default"
  setTargetX(78);
  startWalker();
  setupSectionObserver();
  setTimeout(() => speak(rand(FRASES.idle)), 1800);

  // Expõe API global
  window.Mascot = {
    setState,
    speak,
    spawnHeart,
    walkTo,
    surprised: () => { walkTo(50); setState('surprised', 2000); setTimeout(() => speak(rand(FRASES.surprised)), 300); },
    dance:     () => setState('dancing'),
    sleep:     () => setState('sleeping'),
    love:      () => { setState('loving', 2500); for (let i = 0; i < 3; i++) setTimeout(spawnHeart, i * 150); }
  };

  console.log('🦊 Maya Companheira de Página carregada!');
})();
