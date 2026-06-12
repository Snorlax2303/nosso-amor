// ============================================
// 💕 NFC LANDING ÉPICA — 4 fases + Smart Routing
// 1) Tap 3x no coração
// 2) Foto + frase
// 3) Música + texto letra por letra
// 4) Entrar no app + Instalar PWA (se não instalado)
// ============================================

(function() {
  'use strict';

  // ============================================
  // Detecção: PWA já instalado?
  // ============================================
  // display-mode: standalone = PWA instalado
  // iOS usa navigator.standalone
  const isInstalled = (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    window.navigator.standalone === true  // iOS
  );

  // ============================================
  // Corações caindo (sempre rodando)
  // ============================================
  const EMOJIS = ['💕', '💖', '💗', '💝', '💘', '🌹', '✨', '💫'];
  const rainEl = document.getElementById('hearts-rain');
  function spawnHeart() {
    if (!rainEl) return;
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = (16 + Math.random() * 24) + 'px';
    h.style.animationDuration = (5 + Math.random() * 6) + 's';
    h.style.animationDelay = Math.random() * 2 + 's';
    rainEl.appendChild(h);
    setTimeout(() => h.remove(), 13000);
  }
  for (let i = 0; i < 20; i++) setTimeout(spawnHeart, i * 200);
  setInterval(spawnHeart, 600);

  // ============================================
  // Vibração
  // ============================================
  function vibrate(pattern) {
    if (navigator.vibrate) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }
  setTimeout(() => vibrate([80, 50, 80, 50, 200]), 300);

  // ============================================
  // FASE 1 — Tap 3 vezes no coração
  // ============================================
  const TAP_TARGET = 3;
  let tapCount = 0;
  const heartBtn = document.getElementById('heart-tap');
  const tapCounter = document.getElementById('tap-counter');
  const phase1 = document.getElementById('phase-1');
  const phase2 = document.getElementById('phase-2');

  function advanceToPhase2() {
    vibrate([100, 30, 100, 30, 300]);
    phase1.style.animation = 'none';
    phase1.style.opacity = '0';
    phase1.style.transform = 'scale(1.1)';
    phase1.style.transition = 'opacity 0.5s, transform 0.5s';
    setTimeout(() => {
      phase1.style.display = 'none';
      phase2.style.display = '';
      phase2.style.animation = 'none';
      void phase2.offsetWidth;
      phase2.style.animation = 'fade-in 0.8s ease-out';
    }, 500);
  }

  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      tapCount++;
      vibrate(60);
      heartBtn.style.transform = 'scale(0.85)';
      setTimeout(() => heartBtn.style.transform = '', 150);
      if (tapCounter) tapCounter.textContent = tapCount + '/' + TAP_TARGET;
      if (tapCount >= TAP_TARGET) {
        heartBtn.style.pointerEvents = 'none';
        setTimeout(advanceToPhase2, 400);
      }
    });
  }

  // ============================================
  // FASE 2 → 3 — Botão "Toque pra abrir"
  // ============================================
  const phase3 = document.getElementById('phase-3');
  const btnOpenLetter = document.getElementById('btn-open-letter');

  function startMusic() {
    const MUSIC_ID = 'rCkDEfM76CQ'; // Nossa - Thiaguinho
    const ytContainer = document.getElementById('yt-audio');
    if (ytContainer && MUSIC_ID) {
      ytContainer.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${MUSIC_ID}?autoplay=1&loop=1&playlist=${MUSIC_ID}&controls=0&disablekb=1&fs=0&modestbranding=1"
        allow="autoplay; encrypted-media"
        style="position:absolute;width:1px;height:1px;opacity:0.01;top:-9999px;"
      ></iframe>`;
    }
  }

  function typeWriter(text, el, speed = 55) {
    return new Promise(resolve => {
      let i = 0;
      el.textContent = '';
      const caret = document.getElementById('caret');
      function tick() {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(tick, speed);
        } else {
          if (caret) caret.style.display = 'none';
          resolve();
        }
      }
      tick();
    });
  }

  async function advanceToPhase3() {
    vibrate(120);
    phase2.style.animation = 'none';
    phase2.style.opacity = '0';
    phase2.style.transition = 'opacity 0.4s';
    setTimeout(() => {
      phase2.style.display = 'none';
      phase3.style.display = '';
      phase3.style.animation = 'fade-in 0.8s ease-out';
      startMusic();
      const tw = document.getElementById('typewriter');
      const sig = document.getElementById('signature');
      const MENSAGEM = "Esse presente é o que a gente é. Tem nossos marcos, nossas músicas, nossas brincadeiras, nosso 18+ e tem a gente se amando de um jeito que o tempo não apaga. ♡";
      typeWriter(MENSAGEM, tw, 55).then(() => {
        if (sig) {
          sig.style.display = '';
          sig.style.animation = 'fade-in 1s ease-out';
        }
        setTimeout(advanceToPhase4, 2500);
      });
    }, 400);
  }

  if (btnOpenLetter) {
    btnOpenLetter.addEventListener('click', advanceToPhase3);
  }

  // ============================================
  // FASE 3 → 4 — Automático (depois do texto)
  // ============================================
  const phase4 = document.getElementById('phase-4');

  function advanceToPhase4() {
    vibrate([60, 40, 60, 40, 200]);
    phase3.style.animation = 'none';
    phase3.style.opacity = '0';
    phase3.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      phase3.style.display = 'none';
      phase4.style.display = '';
      phase4.style.animation = 'fade-in 0.8s ease-out';
      // Personaliza textos da Fase 4 baseado em se PWA tá instalado
      setupPhase4();
    }, 500);
  }

  // ============================================
  // FASE 4 — Setup inteligente (instalar vs só entrar)
  // ============================================
  const btnEnter = document.getElementById('btn-enter');
  const btnInstall = document.getElementById('btn-install');
  const btnEnterText = document.getElementById('btn-enter-text');
  const phase4Title = document.getElementById('phase4-title');
  const phase4Sub = document.getElementById('phase4-sub');
  const phase4Hint = document.getElementById('phase4-hint');

  // Antes do prompt de instalação ficar disponível, escuta
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o prompt automático
    e.preventDefault();
    deferredPrompt = e;
    console.log('[nfc] beforeinstallprompt capturado');
  });

  window.addEventListener('appinstalled', () => {
    console.log('[nfc] PWA instalado!');
    deferredPrompt = null;
    if (btnInstall) btnInstall.style.display = 'none';
    if (btnEnterText) btnEnterText.textContent = '✨ Abrir nosso cantinho';
    if (phase4Hint) phase4Hint.textContent = 'Agora é só encostar no chaveiro ♡';
  });

  function setupPhase4() {
    if (isInstalled) {
      // JÁ instalado: só mostra o botão de entrar (com texto épico)
      if (btnEnterText) btnEnterText.textContent = '✨ Abrir nosso cantinho';
      if (phase4Title) phase4Title.textContent = 'Que bom que voltou!';
      if (phase4Sub) phase4Sub.textContent = 'Toca no coração ♡';
      if (phase4Hint) phase4Hint.textContent = 'ou encoste de novo no chaveiro 💫';
      if (btnInstall) btnInstall.style.display = 'none';
    } else {
      // NÃO instalado: mostra botão de instalar (se disponível) + entrar
      if (btnInstall && deferredPrompt) {
        btnInstall.style.display = 'flex';
      }
      if (phase4Sub) {
        phase4Sub.textContent = deferredPrompt
          ? 'Instala pra acessar mais rápido depois ✨'
          : 'Vem pro nosso cantinho ✨';
      }
    }
  }

  if (btnEnter) {
    btnEnter.addEventListener('click', () => {
      vibrate([100, 30, 100]);
      try { sessionStorage.setItem('nosso-amor-via-nfc', '1'); } catch (e) {}
      window.location.href = './?from=nfc';
    });
  }

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      vibrate([100, 30, 100]);
      if (!deferredPrompt) {
        // Fallback: mostra instrução de instalação manual
        if (phase4Hint) {
          phase4Hint.innerHTML = 'No menu do Chrome (⋮), toque em <strong>"Adicionar à tela inicial"</strong>';
          phase4Hint.style.opacity = '1';
        }
        return;
      }
      // Mostra o prompt nativo
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('[nfc] User aceitou instalar');
      } else {
        console.log('[nfc] User recusou instalar');
      }
      deferredPrompt = null;
    });
  }

  // ============================================
  // Pula apresentação se PWA já instalado (quick path)
  // ============================================
  if (isInstalled) {
    try { sessionStorage.setItem('nosso-amor-via-nfc', '1'); } catch (e) {}
    // Esconde todas as fases e vai direto pra Fase 4 (com setupPhase4)
    if (phase1) phase1.style.display = 'none';
    if (phase2) phase2.style.display = 'none';
    if (phase3) phase3.style.display = 'none';
    if (phase4) phase4.style.display = '';
    // Setup texto da Fase 4 (sem esperar typewriter)
    setTimeout(setupPhase4, 100);
  }

})();
