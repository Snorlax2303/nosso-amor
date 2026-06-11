// ============================================
// 💕 NFC LANDING — Tocou na tag → Animação → Botão entra
// ============================================

(function() {
  'use strict';

  // Corações caindo — 20 ao mesmo tempo com delays aleatórios
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
  // Cria 20 corações com delays escalonados
  for (let i = 0; i < 20; i++) {
    setTimeout(spawnHeart, i * 200);
  }
  // E continua criando (1 a cada 600ms)
  setInterval(spawnHeart, 600);

  // Personalização: detecta modo 18+ (se vier ?18=1 na URL)
  const url = new URL(window.location.href);
  const is18 = url.searchParams.get('18') === '1';
  if (is18) {
    document.body.classList.add('nfc-18');
    const emojiEl = document.getElementById('nfc-emoji');
    if (emojiEl) emojiEl.textContent = '🔥';
    const subEl = document.getElementById('nfc-sub');
    if (subEl) subEl.textContent = 'Você tocou na tag picante... 💋';
  }

  // Vibra o celular quando abre (se suportado)
  function vibrate(pattern) {
    if (navigator.vibrate) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }
  // Vibração de "oi!" — 3 pulsos curtos
  setTimeout(() => vibrate([80, 50, 80, 50, 200]), 300);

  // Botão: vai pra home (que abre direto, gate pulado se voltou)
  const btn = document.getElementById('nfc-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      vibrate(100);
      // Marca que veio via NFC (a home vai pular o gate)
      try { sessionStorage.setItem('nosso-amor-via-nfc', '1'); } catch (e) {}
      // Redireciona pra home
      window.location.href = './?from=nfc';
    });
  }

  // Se ela já entrou via NFC antes (PWA instalado), pula o botão e vai direto
  if (window.matchMedia('(display-mode: standalone)').matches) {
    const jaEntrouNFC = localStorage.getItem('nosso-amor-nfc-visto');
    if (jaEntrouNFC) {
      // Vai direto pra home
      try { sessionStorage.setItem('nosso-amor-via-nfc', '1'); } catch (e) {}
      setTimeout(() => { window.location.href = './?from=nfc'; }, 1500);
    } else {
      try { localStorage.setItem('nosso-amor-nfc-visto', '1'); } catch (e) {}
    }
  }
})();
