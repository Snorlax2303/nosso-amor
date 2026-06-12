// ============================================
// 💕 NFC LANDING ÉPICA — 4 fases
// 1) Tap 3x no coração
// 2) Foto + frase
// 3) Música + texto letra por letra
// 4) Botão final → app
// ============================================

(function() {
  'use strict';

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
  // Vibração inicial (3 pulsos curtos) ao tocar na tag
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
    // Vibra mais forte na transição
    vibrate([100, 30, 100, 30, 300]);
    // Fade out fase 1
    phase1.style.animation = 'none';
    phase1.style.opacity = '0';
    phase1.style.transform = 'scale(1.1)';
    phase1.style.transition = 'opacity 0.5s, transform 0.5s';
    setTimeout(() => {
      phase1.style.display = 'none';
      phase2.style.display = '';
      // Reseta a animação da fase 2 (re-trigger)
      phase2.style.animation = 'none';
      void phase2.offsetWidth;
      phase2.style.animation = 'fade-in 0.8s ease-out';
    }, 500);
  }

  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      tapCount++;
      vibrate(60);
      // Pulinho extra no botão
      heartBtn.style.transform = 'scale(0.85)';
      setTimeout(() => heartBtn.style.transform = '', 150);
      // Atualiza contador
      if (tapCounter) tapCounter.textContent = tapCount + '/' + TAP_TARGET;
      // Avança quando bater 3
      if (tapCount >= TAP_TARGET) {
        // Esconde o botão antes de avançar
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
    // Toca "Nossa" do Thiaguinho
    // YouTube ID: rCkDEfM76CQ (ou trocar por outra música)
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
          // Esconde o caret
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
      // Começa música + texto
      startMusic();
      const tw = document.getElementById('typewriter');
      const sig = document.getElementById('signature');
      const MENSAGEM = "Esse presente é o que a gente é. Tem nossos marcos, nossas músicas, nossas brincadeiras, nosso 18+ e tem a gente se amando de um jeito que o tempo não apaga. ♡";
      typeWriter(MENSAGEM, tw, 55).then(() => {
        if (sig) {
          sig.style.display = '';
          sig.style.animation = 'fade-in 1s ease-out';
        }
        // Avança pra fase 4 depois de 2.5s
        setTimeout(advanceToPhase4, 2500);
      });
    }, 400);
  }

  if (btnOpenLetter) {
    btnOpenLetter.addEventListener('click', advanceToPhase3);
  }

  // ============================================
  // FASE 3 → 4 — Automático (depois do texto + assinatura)
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
    }, 500);
  }

  // ============================================
  // FASE 4 → APP — Botão "Entrar"
  // ============================================
  const btnEnter = document.getElementById('btn-enter');

  if (btnEnter) {
    btnEnter.addEventListener('click', () => {
      vibrate([100, 30, 100]);
      // Marca que veio via NFC (a home vai pular o gate)
      try { sessionStorage.setItem('nosso-amor-via-nfc', '1'); } catch (e) {}
      // Redireciona pra home
      window.location.href = './?from=nfc';
    });
  }

  // ============================================
  // Pula tudo se ela já entrou via NFC antes (PWA instalado)
  // ============================================
  if (window.matchMedia('(display-mode: standalone)').matches) {
    const jaEntrouNFC = localStorage.getItem('nosso-amor-nfc-visto');
    if (jaEntrouNFC) {
      // Vai direto pra fase 4 (pula a apresentação)
      try { sessionStorage.setItem('nosso-amor-via-nfc', '1'); } catch (e) {}
      if (phase1) phase1.style.display = 'none';
      if (phase2) phase2.style.display = 'none';
      if (phase3) phase3.style.display = 'none';
      if (phase4) phase4.style.display = '';
    } else {
      try { localStorage.setItem('nosso-amor-nfc-visto', '1'); } catch (e) {}
    }
  }

})();
