// ============================================
// 📱 PÁGINA DE INSTALAÇÃO — QR Code + Instruções
// ============================================

(function() {
  'use strict';

  // URL do site (auto-detecta o domínio atual)
  const siteURL = window.location.origin + window.location.pathname.replace(/install\.html$/, '');
  const displayURL = siteURL.replace(/^https?:\/\//, '').replace(/\/$/, '');

  // Gera o QR Code
  const qrContainer = document.getElementById('qrcode');
  if (qrContainer && typeof QRCode !== 'undefined') {
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
      text: siteURL,
      width: 260,
      height: 260,
      colorDark: '#1a1a2e',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else if (qrContainer) {
    // Fallback se a CDN falhar
    qrContainer.innerHTML = '<p style="color: #1a1a2e; padding: 40px;">QR Code<br>falhou ao carregar.<br>Acesse:<br><strong>' + siteURL + '</strong></p>';
  }

  // Mostra URL
  const urlEl = document.getElementById('url-display');
  if (urlEl) urlEl.textContent = displayURL;

  // Botão de copiar
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(siteURL);
        const original = copyBtn.textContent;
        copyBtn.textContent = '✓ Copiado!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (e) {
        // Fallback antigo
        const ta = document.createElement('textarea');
        ta.value = siteURL;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        copyBtn.textContent = '✓ Copiado!';
        setTimeout(() => copyBtn.textContent = '📋 Copiar link', 2000);
      }
    });
  }

  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      contents.forEach(c => {
        c.classList.toggle('active', c.dataset.content === target);
      });
    });
  });

  // Detecta iOS pra já abrir na tab certa
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isIOS) {
    const iosTab = document.querySelector('[data-tab="ios"]');
    if (iosTab) iosTab.click();
  }
  const isAndroid = /Android/i.test(navigator.userAgent);
  if (isAndroid) {
    const androidTab = document.querySelector('[data-tab="android"]');
    if (androidTab) androidTab.click();
  }
})();
