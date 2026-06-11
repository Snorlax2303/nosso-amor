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

    // Ajusta resolução do canvas (HiDPI) — CSS governa o tamanho visível
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;  // ainda não visível
      const dpr = window.devicePixelRatio || 1;
      // Salva o que tem antes de mexer
      let saved = null;
      try { saved = canvas.toDataURL('image/png'); } catch (e) {}
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);  // reseta transformações anteriores
      ctx.scale(dpr, dpr);
      // Restaura desenho anterior (na escala CSS, não no canvas real)
      if (saved && saved.length > 100) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
        };
        img.src = saved;
      }
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

    // Inicializa — espera layout assentar
    setTimeout(() => {
      resizeCanvas();
      loadFromStorage();
    }, 50);
    // Reajusta em resize de janela, com debounce
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
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
  // 3. 🎡 ROLETA — 20 opções spicy + wobble + intensidade
  // ============================================
  function initRoleta() {
    const canvas = document.getElementById('roleta-canvas');
    const btn = document.getElementById('roleta-btn');
    const resultEl = document.getElementById('roleta-result');
    if (!canvas || !btn) return;

    const ctx = canvas.getContext('2d');

    // 20 opções em 3 níveis de intensidade 🔥
    // emoji + label + cor + nível (1=romântico, 2=apimentado, 3=ousado)
    const opcoes = [
      { label: 'Beijinho demorado', emoji: '💋', color: '#FF6B9D', nivel: 1 },
      { label: 'Noite especial',     emoji: '🌙', color: '#C44569', nivel: 1 },
      { label: 'Mimo fofo',          emoji: '🧸', color: '#F8B500', nivel: 1 },
      { label: 'Falar eu te amo',    emoji: '💌', color: '#6C5CE7', nivel: 1 },
      { label: 'Cinema juntos',      emoji: '🎬', color: '#00B894', nivel: 1 },
      { label: 'Jantar a dois',      emoji: '🍷', color: '#E17055', nivel: 1 },
      { label: 'Passeio romântico',  emoji: '🌅', color: '#74B9FF', nivel: 1 },
      { label: 'Dançar juntinhos',   emoji: '💃', color: '#FD79A8', nivel: 1 },
      { label: 'Massagem relaxante', emoji: '💆', color: '#A29BFE', nivel: 2 },
      { label: 'Banho junto',        emoji: '🛁', color: '#00CEC9', nivel: 2 },
      { label: 'Dormir agarradão',   emoji: '😴', color: '#FDCB6E', nivel: 2 },
      { label: 'Café na cama',       emoji: '☕', color: '#8B5A2B', nivel: 2 },
      { label: 'Sussurrar no ouvido',emoji: '👂', color: '#FF7675', nivel: 2 },
      { label: 'Carícias no cabelo', emoji: '💇', color: '#FAB1A0', nivel: 2 },
      { label: 'Pisada na fenda 🔥', emoji: '🔥', color: '#D63031', nivel: 3 },
      { label: 'Strip casual',       emoji: '👙', color: '#E84393', nivel: 3 },
      { label: 'Aventura no carro',  emoji: '🚗', color: '#2D3436', nivel: 3 },
      { label: 'Foto provocante',    emoji: '📸', color: '#6C5CE7', nivel: 3 },
      { label: 'Brincar de médico',  emoji: '🩺', color: '#00B894', nivel: 3 },
      { label: 'Fantasia do dia',    emoji: '🎭', color: '#FDCB6E', nivel: 3 }
    ];

    // Tamanho do canvas
    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;
    const sliceAngle = (Math.PI * 2) / opcoes.length;

    let currentRotation = 0;
    let spinning = false;
    let lastWinnerNivel = 1;

    function corPorNivel(nivel) {
      // anel muda com a intensidade (morno → quente → 🔥)
      if (nivel === 1) return '#FFD3DD';
      if (nivel === 2) return '#FF7675';
      return '#FF1744';
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);

      // Anel externo decorativo (muda de cor conforme a intensidade do último resultado)
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.strokeStyle = corPorNivel(lastWinnerNivel);
      ctx.lineWidth = 8;
      ctx.stroke();
      // Glow no anel quando a roleta não tá girando
      if (!spinning) {
        ctx.shadowColor = corPorNivel(lastWinnerNivel);
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

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
        // Sombra interna sutil — sem linha branca entre fatias
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Texto (rotacionado pra ler de dentro pra fora)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;
        ctx.fillText(op.label, r - 12, 4);
        // Emoji no centro
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(op.emoji, r - 35, 5);
        ctx.restore();
      });

      // Bolinha central
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#FF6B9D';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💕', cx, cy + 1);

      // Setinha (triângulo mais gordinho, caindo no TOPO apontando pra BAIXO)
      ctx.fillStyle = '#FF1744';
      ctx.strokeStyle = '#7a0a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, 4);
      ctx.lineTo(cx - 14, 32);
      ctx.lineTo(cx + 14, 32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    btn.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      wobble = 0;
      resultEl.classList.remove('show');
      resultEl.textContent = '';

      // Sorteia uma fatia
      const winner = Math.floor(Math.random() * opcoes.length);
      // Centro da fatia vencedora (no referencial da roda)
      const targetCenterOnWheel = (winner * sliceAngle + sliceAngle / 2);
      // A seta fica no topo, que é o ângulo -π/2 (ou 3π/2). Pra alinhar o targetCenterOnWheel com -π/2:
      //   currentRotation + targetCenterOnWheel = -π/2  (mod 2π)
      //   currentRotation = -π/2 - targetCenterOnWheel
      // Mas queremos parar DEPOIS de várias voltas, e o currentRotation sempre cresce.
      // Truque: somar 2π*N - (currentRotation + targetCenterOnWheel - (-π/2)) simplificado:
      const turns = 5 + Math.floor(Math.random() * 3);  // 5-7 voltas
      const baseDelta = turns * Math.PI * 2;
      // Ajusta pra que a posição final tenha targetCenterOnWheel no topo
      const currentAtTop = ((currentRotation + (-Math.PI / 2)) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const need = (targetCenterOnWheel - currentAtTop + Math.PI * 2) % (Math.PI * 2);
      const finalAngle = baseDelta + need;
      const startRot = currentRotation;
      const endRot = startRot + finalAngle;
      const duration = 4500;
      const startTime = performance.now();

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // Ease-out quartic (mais "pesado" no final)
        const eased = 1 - Math.pow(1 - t, 4);
        currentRotation = startRot + (endRot - startRot) * eased;
        draw();
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          // Wobble final: 3 oscilações pequenas pra dar "tchan"
          wobbleEnd(winner);
        }
      }
      requestAnimationFrame(animate);
    });

    function wobbleEnd(winner) {
      const wobbleDur = 600;
      const wobbleStart = performance.now();
      const baseRot = currentRotation;
      function tick(now) {
        const t = Math.min((now - wobbleStart) / wobbleDur, 1);
        // 3 oscilações, decai
        const decay = 1 - t;
        const angle = Math.sin(t * Math.PI * 3) * 0.08 * decay;  // até 0.08 rad (~4.5°)
        currentRotation = baseRot + angle;
        draw();
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          currentRotation = baseRot;
          draw();
          spinning = false;
          const winnerOp = opcoes[winner];
          lastWinnerNivel = winnerOp.nivel;
          draw();  // re-renderiza com o anel da cor do nível
          const prefix = winnerOp.nivel === 3 ? '🔥 ' : winnerOp.nivel === 2 ? '🌶️ ' : '💖 ';
          resultEl.textContent = `${prefix}${winnerOp.emoji} ${winnerOp.label}!`;
          resultEl.classList.add('show');
          resultEl.style.color = winnerOp.color;
          speakMascot('Saiu: ' + winnerOp.label + '!');
          if (window.Mascot) window.Mascot.surprised();
        }
      }
      requestAnimationFrame(tick);
    }

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
