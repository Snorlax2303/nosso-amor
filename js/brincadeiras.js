// ============================================
// 🎨 BRINCADEIRAS DO CASAL
// Lousa + Dados + Roleta + Baralho
// Tudo num único arquivo, organizado por seção
// ============================================

(function() {
  'use strict';

  // ============================================
  // 1. 🎨 LOUSA — Canvas com persistência
  // ============================================
  function initLousa() {
    const canvas = document.getElementById('lousa-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const STORAGE_KEY = 'nosso-amor-lousa-v1';

    // Ajusta resolução do canvas (HiDPI)
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      // Restaura desenho se houver
      loadFromStorage();
    }

    // Estado
    let drawing = false;
    let lastX = 0, lastY = 0;
    let color = '#FF6B35';
    let size = 4;
    let isEraser = false;

    // Controles
    const colorBtns = document.querySelectorAll('.lousa-color');
    const sizeInput = document.getElementById('lousa-size');
    const sizeVal = document.getElementById('lousa-size-val');
    const eraserBtn = document.getElementById('lousa-eraser');
    const clearBtn = document.getElementById('lousa-clear');
    const saveBtn = document.getElementById('lousa-save');

    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        color = btn.dataset.color;
        isEraser = false;
        eraserBtn.classList.remove('active');
      });
    });

    if (sizeInput) {
      sizeInput.addEventListener('input', e => {
        size = parseInt(e.target.value);
        if (sizeVal) sizeVal.textContent = size + 'px';
      });
    }

    if (eraserBtn) {
      eraserBtn.addEventListener('click', () => {
        isEraser = !isEraser;
        eraserBtn.classList.toggle('active', isEraser);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Apagar tudo? 🧽')) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          localStorage.removeItem(STORAGE_KEY);
          speakMascot('Lousa limpinha! ✨');
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'nosso-desenho-' + Date.now() + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        speakMascot('Salvei! 🖼️');
      });
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }

    function draw(x, y) {
      ctx.strokeStyle = isEraser ? '#fff5ec' : color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x; lastY = y;
    }

    function start(e) {
      e.preventDefault();
      drawing = true;
      const p = getPos(e);
      lastX = p.x; lastY = p.y;
    }

    function move(e) {
      if (!drawing) return;
      e.preventDefault();
      const p = getPos(e);
      draw(p.x, p.y);
    }

    function end() {
      if (drawing) {
        drawing = false;
        saveToStorage();
      }
    }

    // Eventos (mouse + touch)
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

    // Persistência
    function saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, canvas.toDataURL('image/png'));
      } catch (e) { /* cheio, ignora */ }
    }

    function loadFromStorage() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      };
      img.src = data;
    }

    // Inicializa
    resizeCanvas();
    loadFromStorage();
    window.addEventListener('resize', () => {
      // Salva antes de redimensionar
      saveToStorage();
      resizeCanvas();
    });
  }

  // Helper pra Maya reagir
  function speakMascot(text) {
    if (window.Mascot) window.Mascot.speak(text);
  }

  // ============================================
  // 2. 🎲 DADOS DO CASAL
  // 1 dado de 6 faces com mensagens românticas
  // ============================================
  function initDados() {
    const btn = document.getElementById('dado-btn');
    if (!btn) return;

    const faces = [
      { icon: '💋', text: 'Beijinho agora!' },
      { icon: '🫂', text: 'Abraço apertado' },
      { icon: '💃', text: 'Dançar juntos' },
      { icon: '🎵', text: 'Músiquinha nossa' },
      { icon: '💌', text: 'Falar eu te amo' },
      { icon: '🌹', text: 'Mimo surpresa' }
    ];

    btn.addEventListener('click', () => {
      // Animação de rolar
      btn.classList.add('rolling');
      const dadoEl = document.getElementById('dado-face');
      const resultEl = document.getElementById('dado-result');

      // Pisca várias faces rápido
      let rollCount = 0;
      const rollInterval = setInterval(() => {
        const tempFace = faces[Math.floor(Math.random() * faces.length)];
        if (dadoEl) {
          dadoEl.textContent = tempFace.icon;
          dadoEl.style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        rollCount++;
        if (rollCount > 12) {
          clearInterval(rollInterval);
          // Sorteia o final
          const final = faces[Math.floor(Math.random() * faces.length)];
          if (dadoEl) {
            dadoEl.textContent = final.icon;
            dadoEl.style.transform = 'rotate(0deg) scale(1.2)';
            setTimeout(() => dadoEl.style.transform = 'rotate(0deg) scale(1)', 300);
          }
          if (resultEl) {
            resultEl.textContent = final.text;
            resultEl.classList.add('show');
            setTimeout(() => resultEl.classList.remove('show'), 3000);
          }
          btn.classList.remove('rolling');
          speakMascot('Rolou! ' + final.text);
        }
      }, 80);
    });
  }

  // ============================================
  // 3. 🎡 ROLETA — Setinha + opções românticas
  // ============================================
  function initRoleta() {
    const canvas = document.getElementById('roleta-canvas');
    const btn = document.getElementById('roleta-btn');
    const resultEl = document.getElementById('roleta-result');
    if (!canvas || !btn) return;

    const ctx = canvas.getContext('2d');
    const opcoes = [
      { label: 'Beijinho', color: '#FF6B9D' },
      { label: 'Noite especial', color: '#C44569' },
      { label: 'Desejo seu', color: '#FF8E72' },
      { label: 'Mimo fofo', color: '#F8B500' },
      { label: 'Falar eu te amo', color: '#6C5CE7' },
      { label: 'Cinema juntos', color: '#00B894' },
      { label: 'Jantar a dois', color: '#E17055' },
      { label: 'Passeio romântico', color: '#74B9FF' }
    ];

    // Tamanho do canvas
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 10;
    const sliceAngle = (Math.PI * 2) / opcoes.length;

    let currentRotation = 0;
    let spinning = false;

    function draw() {
      ctx.clearRect(0, 0, size, size);

      // Desenha as fatias
      opcoes.forEach((op, i) => {
        const start = currentRotation + i * sliceAngle;
        const end = start + sliceAngle;

        // Fatia
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = op.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Texto
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 3;
        ctx.fillText(op.label, r - 15, 5);
        ctx.restore();
      });

      // Centro
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#FF6B9D';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Setinha no topo
      ctx.fillStyle = '#FF1744';
      ctx.beginPath();
      ctx.moveTo(cx, 10);
      ctx.lineTo(cx - 12, 35);
      ctx.lineTo(cx + 12, 35);
      ctx.closePath();
      ctx.fill();
    }

    btn.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      resultEl.classList.remove('show');
      resultEl.textContent = '';

      // Sorteia ângulo (mínimo 5 voltas + random)
      const winner = Math.floor(Math.random() * opcoes.length);
      const finalAngle = (Math.PI * 2 * 5) + (Math.PI * 2 - (winner * sliceAngle + sliceAngle / 2));
      const startRot = currentRotation;
      const endRot = startRot + finalAngle;
      const duration = 4000;
      const startTime = performance.now();

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        currentRotation = startRot + (endRot - startRot) * eased;
        draw();
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          spinning = false;
          // Mostra resultado
          const winnerOp = opcoes[winner];
          resultEl.textContent = `🎉 ${winnerOp.label}!`;
          resultEl.classList.add('show');
          speakMascot('Saiu: ' + winnerOp.label + '!');
          // Maya pula
          if (window.Mascot) window.Mascot.surprised();
        }
      }
      requestAnimationFrame(animate);
    });

    draw();
  }

  // ============================================
  // 4. 🃏 BARALHO — 12 cartas com mensagens
  // ============================================
  function initBaralho() {
    const baralhoEl = document.getElementById('baralho');
    const btn = document.getElementById('baralho-puxar');
    const remainingEl = document.getElementById('baralho-restantes');
    if (!baralhoEl || !btn) return;

    const cartas = [
      { msg: 'O que eu mais amo em você?', tipo: 'pergunta' },
      { msg: 'Me conta uma memória feliz nossa', tipo: 'pergunta' },
      { msg: 'Qual o nosso próximo sonho?', tipo: 'pergunta' },
      { msg: 'Me faz um cafuné agora', tipo: 'acao' },
      { msg: 'Você é o amor da minha vida', tipo: 'declaracao' },
      { msg: 'Fala o que tá no coração', tipo: 'acao' },
      { msg: 'Me dá um beijo na testa', tipo: 'acao' },
      { msg: 'Qual foi o dia mais feliz da sua vida?', tipo: 'pergunta' },
      { msg: 'O que a gente ainda não fez que vc quer?', tipo: 'pergunta' },
      { msg: 'Me abraça por 1 minuto (contando!)', tipo: 'acao' },
      { msg: 'Você me faz uma pessoa melhor', tipo: 'declaracao' },
      { msg: 'Me diz uma coisa que eu não sei sobre você', tipo: 'pergunta' }
    ];

    let restantes = [...cartas];
    let cartaAtual = null;

    function atualizarRestantes() {
      if (remainingEl) remainingEl.textContent = restantes.length;
    }

    function render() {
      baralhoEl.innerHTML = `
        <div class="baralho-pilha">
          ${restantes.slice(0, 3).map((_, i) => `
            <div class="baralho-carta verso" style="transform: translateX(${i * 2}px) translateY(${i * 2}px)">
              <div class="baralho-pattern">N ♡ F</div>
            </div>
          `).join('')}
        </div>
        <div class="baralho-carta ${cartaAtual ? 'virada frente' : 'frente'}" id="baralho-carta-top">
          <div class="baralho-verso">
            <div class="baralho-pattern">N ♡ F</div>
            <div class="baralho-coracao">💕</div>
          </div>
          ${cartaAtual ? `
            <div class="baralho-frente">
              <span class="baralho-tipo tipo-${cartaAtual.tipo}">${cartaAtual.tipo}</span>
              <p class="baralho-msg">${cartaAtual.msg}</p>
              <span class="baralho-dica">clique pra guardar</span>
            </div>
          ` : ''}
        </div>
      `;

      // Click na carta virada → guarda
      const cartaTop = document.getElementById('baralho-carta-top');
      if (cartaTop && cartaAtual) {
        cartaTop.addEventListener('click', () => {
          cartaAtual = null;
          render();
        });
      }
    }

    btn.addEventListener('click', () => {
      if (restantes.length === 0) {
        // Embaralha de novo
        restantes = [...cartas];
        speakMascot('Embaralhei tudo de novo! ♻️');
        atualizarRestantes();
        render();
        return;
      }
      // Puxa uma carta aleatória
      const idx = Math.floor(Math.random() * restantes.length);
      cartaAtual = restantes.splice(idx, 1)[0];
      atualizarRestantes();
      render();
      speakMascot(cartaAtual.msg);
      // Maya dança
      if (window.Mascot) window.Mascot.dance();
    });

    atualizarRestantes();
    render();
  }

  // ============================================
  // INIT — Espera app carregar pra ter window.Mascot
  // ============================================
  function init() {
    initLousa();
    initDados();
    initRoleta();
    initBaralho();
    console.log('🎨 Brincadeiras carregadas: lousa, dados, roleta, baralho');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Pequeno delay pra garantir que mascot.js já rodou
    setTimeout(init, 200);
  }
})();
