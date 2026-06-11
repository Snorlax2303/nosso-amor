// ============================================
// 🎨 BRINCADEIRAS DO CASAL — v19
// Lousa + Dados + Roleta + Baralho + Notif + Cadastro
// Tudo num único arquivo, organizado por seção
// ============================================

(function() {
  'use strict';

  // ============================================
  // ESTADO GLOBAL — modo 18+ + últimos resultados
  // ============================================
  const STATE = {
    modo18: false,
    senha18: '784978',
    ultimos: { dado: null, roleta: null, baralho: null }
  };

  // Carrega estado do modo 18+ (persistente)
  try {
    STATE.modo18 = localStorage.getItem('nosso-amor-modo-18') === '1';
  } catch (e) {}

  // ============================================
  // 0. 📦 STORAGE DE CADASTROS
  //    Cada chave: { id, tipo ('pergunta'|'acao'|...), is18, data, ...
  //                  ...específico: icon (dado), label/emoji/color/nivel (roleta) }
  // ============================================
  const STORAGE = {
    CARTAS: 'nosso-amor-cartas-custom',
    DADO:   'nosso-amor-dado-custom',
    ROLETA: 'nosso-amor-roleta-custom'
  };

  function loadStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function saveStorage(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}
  }

  // ============================================
  // 1. 🎨 LOUSA — Canvas com persistência
  // ============================================
  function initLousa() {
    const canvas = document.getElementById('lousa-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const STORAGE_KEY = 'nosso-amor-lousa-v1';

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      let saved = null;
      try { saved = canvas.toDataURL('image/png'); } catch (e) {}
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (saved && saved.length > 100) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
        };
        img.src = saved;
      }
    }

    let drawing = false;
    let lastX = 0, lastY = 0;
    let color = '#FF6B35';
    let size = 4;
    let isEraser = false;

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

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);

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

    setTimeout(() => {
      resizeCanvas();
      loadFromStorage();
    }, 50);
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
  // 2. 🎲 DADO DO CASAL — 2 bancos: normal e 18+
  //    Random melhorado: memória das últimas 3 faces
  // ============================================
  function initDados() {
    const btn = document.getElementById('dado-btn');
    if (!btn) return;

    const facesNormais = [
      { icon: '💋', text: 'Beijinho agora!' },
      { icon: '🫂', text: 'Abraço apertado' },
      { icon: '💃', text: 'Dançar juntos' },
      { icon: '🎵', text: 'Músiquinha nossa' },
      { icon: '💌', text: 'Falar eu te amo' },
      { icon: '🌹', text: 'Mimo surpresa' }
    ];

    const faces18 = [
      { icon: '👅', text: 'Beijo de língua agora' },
      { icon: '🔥', text: 'Tira a camisa/blusa' },
      { icon: '💋', text: 'Beijo no pescoço de verdade' },
      { icon: '😈', text: 'Sussurra algo safado no meu ouvido' },
      { icon: '🛏️', text: 'Me leva pra cama AGORA' },
      { icon: '👙', text: 'Mostra o que tá por baixo' }
    ];

    // Memória das últimas 3 saídas (pra não repetir)
    const ultimasFaces = { normais: [], '18': [] };

    // Mescla cadastros do usuário
    function getFaces() {
      const base = STATE.modo18 ? faces18 : facesNormais;
      const custom = loadStorage(STORAGE.DADO).filter(f => !!f.is18 === STATE.modo18);
      // custom: { id, is18, icon, text }
      const merged = base.concat(custom.map(f => ({ icon: f.icon || '🎲', text: f.text })));
      return merged;
    }

    btn.addEventListener('click', () => {
      const faces = getFaces();
      const memKey = STATE.modo18 ? '18' : 'normais';
      if (faces.length === 0) {
        speakMascot('Nenhuma face cadastrada!');
        return;
      }
      btn.classList.add('rolling');
      const dadoEl = document.getElementById('dado-face');
      const resultEl = document.getElementById('dado-result');

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
          // Escolhe final evitando as últimas 3 faces
          const recentSet = new Set(ultimasFaces[memKey]);
          let candidates = faces.filter(f => !recentSet.has(f.text));
          if (candidates.length === 0) candidates = faces; // fallback
          const final = candidates[Math.floor(Math.random() * candidates.length)];
          if (dadoEl) {
            dadoEl.textContent = final.icon;
            dadoEl.style.transform = 'rotate(0deg) scale(1.2)';
            setTimeout(() => dadoEl.style.transform = 'rotate(0deg) scale(1)', 300);
          }
          if (resultEl) {
            resultEl.textContent = final.text;
            resultEl.classList.add('show');
            setTimeout(() => resultEl.classList.remove('show'), 4000);
          }
          btn.classList.remove('rolling');
          // Atualiza memória (mantém só as 3 últimas)
          ultimasFaces[memKey].push(final.text);
          if (ultimasFaces[memKey].length > 3) ultimasFaces[memKey].shift();
          // Salva pro status do WhatsApp
          STATE.ultimos.dado = { icon: final.icon, text: final.text, ts: Date.now() };
          atualizarResumo();
          speakMascot('Rolou! ' + final.text);
        }
      }, 80);
    });
  }

  // ============================================
  // 3. 🎡 ROLETA — 2 bancos: normal (20) e 18+ (20)
  //    Random melhorado: memória das últimas 3 saídas
  // ============================================
  function initRoleta() {
    const canvas = document.getElementById('roleta-canvas');
    const btn = document.getElementById('roleta-btn');
    const resultEl = document.getElementById('roleta-result');
    if (!canvas || !btn) return;

    const ctx = canvas.getContext('2d');

    const opcoesNormais = [
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
      { label: 'Dominador/dominada 🔥', emoji: '👑', color: '#D63031', nivel: 3 },
      { label: 'Strip casual',       emoji: '👙', color: '#E84393', nivel: 3 },
      { label: 'Aventura no carro',  emoji: '🚗', color: '#2D3436', nivel: 3 },
      { label: 'Foto provocante',    emoji: '📸', color: '#6C5CE7', nivel: 3 },
      { label: 'Brincar de médico',  emoji: '🩺', color: '#00B894', nivel: 3 },
      { label: 'Fantasia do dia',    emoji: '🎭', color: '#FDCB6E', nivel: 3 }
    ];

    const opcoes18 = [
      { label: 'Strip-tease agora',        emoji: '🔥', color: '#FF1744', nivel: 3 },
      { label: 'Oral com vontade',         emoji: '👅', color: '#D63031', nivel: 3 },
      { label: '69 de 5 min',              emoji: '💦', color: '#E84393', nivel: 3 },
      { label: 'Amarrar/ser amarrado',     emoji: '⛓️', color: '#2D3436', nivel: 3 },
      { label: 'Sexo oral recíproco',      emoji: '💋', color: '#FF6B9D', nivel: 3 },
      { label: 'Posição nova (surpresa)',  emoji: '🍑', color: '#C44569', nivel: 3 },
      { label: 'Gravar gemendo (privado)', emoji: '🎥', color: '#6C5CE7', nivel: 3 },
      { label: 'Foto nú(a) agora',         emoji: '📸', color: '#D63031', nivel: 3 },
      { label: 'Brinquedo novo',           emoji: '🎁', color: '#FF7675', nivel: 3 },
      { label: 'Fazer no chuveiro',        emoji: '🚿', color: '#74B9FF', nivel: 3 },
      { label: 'Fazer no carro',           emoji: '🚗', color: '#2D3436', nivel: 3 },
      { label: 'Beijo grego',              emoji: '🔥', color: '#FF1744', nivel: 3 },
      { label: 'Dominação (prática)',      emoji: '👑', color: '#D63031', nivel: 3 },
      { label: 'Lamber o corpo todo',      emoji: '👅', color: '#E84393', nivel: 3 },
      { label: 'Sexo tântrico',            emoji: '🧘', color: '#A29BFE', nivel: 3 },
      { label: 'Áudio quente (10 min)',   emoji: '🎙️', color: '#FF6B9D', nivel: 3 },
      { label: 'Roleplay (a escolher)',    emoji: '🎭', color: '#FDCB6E', nivel: 3 },
      { label: 'Café na cama + oral',      emoji: '☕', color: '#8B5A2B', nivel: 3 },
      { label: 'Dormir pelado(a) junto',   emoji: '😴', color: '#FAB1A0', nivel: 3 },
      { label: 'Masturbar junto(a)',       emoji: '💦', color: '#C44569', nivel: 3 }
    ];

    // Paleta alternativa pra cadastros novos (rotação de cores)
    const CoresCustom = ['#9C27B0', '#673AB7', '#3F51B5', '#03A9F4', '#009688', '#FF9800', '#795548', '#607D8B'];

    function getOpcoes() {
      const base = STATE.modo18 ? opcoes18 : opcoesNormais;
      const custom = loadStorage(STORAGE.ROLETA).filter(r => !!r.is18 === STATE.modo18);
      const customMapped = custom.map((r, i) => ({
        label: r.text,
        emoji: r.emoji || '⭐',
        color: CoresCustom[i % CoresCustom.length],
        nivel: STATE.modo18 ? 3 : 2  // custom = spicy
      }));
      return base.concat(customMapped);
    }

    const size = 320;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;
    let sliceAngle = (Math.PI * 2) / 20;  // dinâmico agora
    let currentRotation = 0;
    let spinning = false;
    let lastWinnerNivel = 1;
    const ultimasRoleta = { normais: [], '18': [] };

    function corPorNivel(nivel) {
      if (nivel === 1) return '#FFD3DD';
      if (nivel === 2) return '#FF7675';
      return '#FF1744';
    }

    function draw() {
      const opcoes = getOpcoes();
      sliceAngle = (Math.PI * 2) / opcoes.length;
      ctx.clearRect(0, 0, size, size);

      // Anel externo decorativo
      ctx.beginPath();
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
      ctx.strokeStyle = corPorNivel(lastWinnerNivel);
      ctx.lineWidth = 8;
      ctx.stroke();
      if (!spinning) {
        ctx.shadowColor = corPorNivel(lastWinnerNivel);
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Fatias
      opcoes.forEach((op, i) => {
        const start = currentRotation + i * sliceAngle;
        const end = start + sliceAngle;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = op.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        // Fonte dinâmica baseada no tamanho do label
        const fontSize = opcoes.length > 20 ? 9 : opcoes.length > 16 ? 10 : 11;
        ctx.font = `bold ${fontSize}px Inter, sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;
        ctx.fillText(op.label, r - 12, 4);
        ctx.font = `${fontSize + 4}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(op.emoji, r - 35, 5);
        ctx.restore();
      });

      // Centro
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = STATE.modo18 ? '#FF1744' : '#FF6B9D';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(STATE.modo18 ? '🔥' : '💕', cx, cy + 1);

      // Seta
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
      const opcoes = getOpcoes();
      if (opcoes.length < 2) {
        speakMascot('Adiciona mais opções primeiro!');
        return;
      }
      spinning = true;
      resultEl.classList.remove('show');
      resultEl.textContent = '';

      const memKey = STATE.modo18 ? '18' : 'normais';
      // Escolhe winner evitando últimas 3
      const recentSet = new Set(ultimasRoleta[memKey]);
      let candidates = opcoes.map((op, idx) => idx).filter(i => !recentSet.has(opcoes[i].label));
      if (candidates.length === 0) candidates = opcoes.map((_, idx) => idx);
      const winner = candidates[Math.floor(Math.random() * candidates.length)];

      const targetAngle = winner * sliceAngle + sliceAngle / 2;
      const turns = 5 + Math.floor(Math.random() * 3);
      const baseDelta = turns * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * sliceAngle * 0.6;
      const currentWorldTop = ((currentRotation + targetAngle + Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const correction = (Math.PI * 2 - currentWorldTop) + jitter;
      const finalAngle = baseDelta + correction;
      const startRot = currentRotation;
      const endRot = startRot + finalAngle;
      const duration = 4000;
      const startTime = performance.now();

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        currentRotation = startRot + (endRot - startRot) * eased;
        draw();
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          const wobbleDur = 500;
          const wobbleStart = performance.now();
          const baseRot = currentRotation;
          function tick(w) {
            const wt = Math.min((w - wobbleStart) / wobbleDur, 1);
            const decay = 1 - wt;
            currentRotation = baseRot + Math.sin(wt * Math.PI * 2) * 0.05 * decay;
            draw();
            if (wt < 1) {
              requestAnimationFrame(tick);
            } else {
              currentRotation = baseRot;
              draw();
              spinning = false;
              const winnerOp = opcoes[winner];
              lastWinnerNivel = winnerOp.nivel;
              draw();
              const prefix = winnerOp.nivel === 3 ? '🔥 ' : winnerOp.nivel === 2 ? '🌶️ ' : '💖 ';
              resultEl.textContent = prefix + winnerOp.emoji + ' ' + winnerOp.label + '!';
              resultEl.classList.add('show');
              resultEl.style.color = winnerOp.color;
              // Memória
              ultimasRoleta[memKey].push(winnerOp.label);
              if (ultimasRoleta[memKey].length > 3) ultimasRoleta[memKey].shift();
              STATE.ultimos.roleta = { emoji: winnerOp.emoji, label: winnerOp.label, ts: Date.now() };
              atualizarResumo();
              speakMascot('Saiu: ' + winnerOp.label + '!');
              if (window.Mascot) window.Mascot.surprised();
            }
          }
          requestAnimationFrame(tick);
        }
      }
      requestAnimationFrame(animate);
    });

    draw();
  }

  // ============================================
  // 4. 🃏 BARALHO — banco normais (350) + 18+ (80) + cadastros
  // ============================================
  function initBaralho() {
    const baralhoEl = document.getElementById('baralho');
    const btn = document.getElementById('baralho-puxar');
    const remainingEl = document.getElementById('baralho-restantes');
    if (!baralhoEl || !btn) return;

    const chipBtns = document.querySelectorAll('.baralho-chip');
    let filtroAtivo = 'todas';

    chipBtns.forEach(c => {
      c.addEventListener('click', () => {
        chipBtns.forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        filtroAtivo = c.dataset.filtro;
        cartaAtual = null;
        restantes = getPool();
        atualizarRestantes();
        render();
      });
    });

    function getPool() {
      // No modo 18+ força 'todas' (chips de tipo ficam escondidos)
      const filtroEfetivo = STATE.modo18 ? 'todas' : filtroAtivo;
      const base = STATE.modo18 ? CARTAS_18 : CARTAS_NORMAIS;
      const custom = loadStorage(STORAGE.CARTAS).filter(c => !!c.is18 === STATE.modo18);
      // custom: { id, tipo, is18, text }
      const customMapped = custom.map(c => ({ tipo: c.tipo, msg: c.text }));
      const all = base.concat(customMapped);
      if (filtroEfetivo === 'todas') return shuffle([...all]);
      return shuffle(all.filter(c => c.tipo === filtroEfetivo));
    }

    // Fisher-Yates shuffle (mais justo que sort+random)
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    let restantes = getPool();
    let cartaAtual = null;

    function atualizarRestantes() {
      if (remainingEl) remainingEl.textContent = restantes.length;
    }

    function render() {
      const is18 = STATE.modo18;
      const pilhaCount = Math.min(3, restantes.length);
      baralhoEl.innerHTML = `
        <div class="baralho-pilha">
          ${Array.from({length: pilhaCount}, (_, i) => `
            <div class="baralho-carta verso" style="transform: translateX(${i * 2}px) translateY(${i * 2}px)">
              <div class="baralho-pattern">${is18 ? '🔥' : 'N ♡ F'}</div>
            </div>
          `).join('')}
        </div>
        <div class="baralho-carta ${cartaAtual ? 'virada frente' : 'frente'}" id="baralho-carta-top">
          <div class="baralho-verso">
            <div class="baralho-pattern">${is18 ? '🔥' : 'N ♡ F'}</div>
            <div class="baralho-coracao">${is18 ? '🔥' : '💕'}</div>
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
        restantes = getPool();
        speakMascot(STATE.modo18 ? 'Embaralhei tudo de novo! 🔥' : 'Embaralhei tudo de novo! ♻️');
        atualizarRestantes();
        render();
        return;
      }
      cartaAtual = restantes.pop();
      atualizarRestantes();
      render();
      STATE.ultimos.baralho = { tipo: cartaAtual.tipo, msg: cartaAtual.msg, ts: Date.now() };
      atualizarResumo();
      speakMascot(cartaAtual.msg);
      if (window.Mascot) window.Mascot.dance();
    });

    atualizarRestantes();
    render();
  }

  // ============================================
  // 5. 🔥 MODO 18+ — Gate + Toggle + re-render jogos
  // ============================================
  function initModo18() {
    const btnAtivar = document.getElementById('modo-18-btn');
    const btnDesativar = document.getElementById('modo-18-off');
    const banner = document.getElementById('modo-18-banner');
    const info = document.getElementById('modo-18-info');
    const gate = document.getElementById('gate-18');
    const gateInput = document.getElementById('gate-18-input');
    const gateConfirm = document.getElementById('gate-18-confirm');
    const gateCancel = document.getElementById('gate-18-cancel');
    const gateErro = document.getElementById('gate-18-erro');

    if (!btnAtivar) return;

    if (STATE.modo18) {
      document.body.classList.add('modo-18-ativo');
      banner.style.display = 'none';
      info.style.display = 'flex';
    }

    btnAtivar.addEventListener('click', () => {
      gateInput.value = '';
      gateErro.textContent = '';
      gate.style.display = 'flex';
      setTimeout(() => gateInput.focus(), 100);
    });

    function tentarAtivar() {
      if (gateInput.value === STATE.senha18) {
        STATE.modo18 = true;
        try { localStorage.setItem('nosso-amor-modo-18', '1'); } catch (e) {}
        document.body.classList.add('modo-18-ativo');
        banner.style.display = 'none';
        info.style.display = 'flex';
        gate.style.display = 'none';
        speakMascot('Modo 18+ ativado! 🔥');
        // Re-renderiza os jogos com os novos bancos
        reRenderJogos();
        if (window.Mascot) window.Mascot.surprised();
      } else {
        gateErro.textContent = '❌ Senha errada, tenta de novo';
        gateInput.value = '';
        gateInput.focus();
      }
    }

    function desativar() {
      STATE.modo18 = false;
      try { localStorage.setItem('nosso-amor-modo-18', '0'); } catch (e) {}
      document.body.classList.remove('modo-18-ativo');
      banner.style.display = 'flex';
      info.style.display = 'none';
      speakMascot('Voltou pro modo fofo 💖');
      reRenderJogos();
    }

    // Re-render dos 3 jogos quando troca modo (resolver travamento)
    function reRenderJogos() {
      // Dados: re-attach o event handler (o handler já lê STATE.modo18 dinamicamente, só resetar a face)
      const dadoEl = document.getElementById('dado-face');
      if (dadoEl) { dadoEl.textContent = STATE.modo18 ? '🔞' : '🎲'; dadoEl.style.transform = 'rotate(0deg) scale(1)'; }
      const dadoResult = document.getElementById('dado-result');
      if (dadoResult) { dadoResult.textContent = ''; dadoResult.classList.remove('show'); }
      // Roleta: re-draw (já é dinâmico)
      const roletaCanvas = document.getElementById('roleta-canvas');
      if (roletaCanvas) {
        // dispara redraw via clique no btn (mais limpo: chamar draw direto via STATE)
      }
      // Baralho: re-init
      const baralhoEl = document.getElementById('baralho');
      if (baralhoEl) {
        // limpa pool atual e re-render
        const event = new Event('reinit');
        // abordagem mais simples: força um clique no chip "todas" que já re-inicializa
        const todas = document.querySelector('.baralho-chip[data-filtro="todas"]');
        if (todas) todas.click();
      }
      // Limpa STATE.ultimos (não faz sentido mandar status antigo de outro modo)
      STATE.ultimos = { dado: null, roleta: null, baralho: null };
      atualizarResumo();
    }

    gateConfirm.addEventListener('click', tentarAtivar);
    gateInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') tentarAtivar();
    });
    gateCancel.addEventListener('click', () => {
      gate.style.display = 'none';
    });

    btnDesativar.addEventListener('click', desativar);
  }

  // ============================================
  // 6. 💬 NOTIFICAÇÃO WHATSAPP — ♂ Rafael / ♀ Fernanda
  // ============================================
  function initNotif() {
    const btnEle = document.getElementById('notif-ele');
    const btnEla = document.getElementById('notif-ela');
    const modal = document.getElementById('notif-modal');
    const modalTitulo = document.getElementById('notif-modal-titulo');
    const msgTextarea = document.getElementById('notif-msg');
    const preview = document.getElementById('notif-preview');
    const btnEnviar = document.getElementById('notif-enviar');
    const btnCancelar = document.getElementById('notif-cancelar');
    if (!btnEle || !btnEla) return;

    let remetente = null;
    let destinatario = null;

    function abrirModal(quem) {
      remetente = quem;
      destinatario = quem === 'rafael' ? 'fernanda' : 'rafael';
      modalTitulo.textContent = quem === 'rafael'
        ? '📤 Mandar pro zap da Fernanda'
        : '📤 Mandar pro zap do Rafael';
      msgTextarea.value = '';
      atualizarPreview();
      modal.style.display = 'flex';
      setTimeout(() => msgTextarea.focus(), 100);
    }

    function fecharModal() {
      modal.style.display = 'none';
    }

    function montarTexto() {
      const data = new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      const nome = remetente === 'rafael' ? 'Rafael' : 'Fernanda';
      const linhas = [`💕 *${nome} mandou o status dos jogos* 💕\n`];

      const u = STATE.ultimos;
      if (u.dado && (Date.now() - u.dado.ts < 30 * 60 * 1000)) {
        linhas.push(`🎲 *Dado:* ${u.dado.icon} ${u.dado.text}`);
      }
      if (u.roleta && (Date.now() - u.roleta.ts < 30 * 60 * 1000)) {
        linhas.push(`🎡 *Roleta:* ${u.roleta.emoji} ${u.roleta.label}`);
      }
      if (u.baralho && (Date.now() - u.baralho.ts < 30 * 60 * 1000)) {
        linhas.push(`🃏 *Carta* (${u.baralho.tipo}): ${u.baralho.msg}`);
      }
      if (linhas.length === 1) {
        linhas.push('_(ainda não joguei nada hoje, só vim te amar)_ 💖');
      }

      const msgLivre = msgTextarea.value.trim();
      if (msgLivre) {
        linhas.push(`\n💌 *Msg:* ${msgLivre}`);
      }

      linhas.push(`\n_Enviado pelo nosso-amor-bice.vercel.app — ${data}_`);
      return linhas.join('\n');
    }

    function atualizarPreview() {
      preview.textContent = montarTexto();
    }

    msgTextarea.addEventListener('input', atualizarPreview);

    btnEle.addEventListener('click', () => abrirModal('rafael'));
    btnEla.addEventListener('click', () => abrirModal('fernanda'));
    btnCancelar.addEventListener('click', fecharModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) fecharModal();
    });

    btnEnviar.addEventListener('click', async () => {
      const texto = montarTexto();
      const numero = destinatario === 'fernanda'
        ? '5516988081144'
        : '5516988302020';

      btnEnviar.disabled = true;
      btnEnviar.textContent = '⏳ Enviando...';

      try {
        const resp = await fetch('https://zap.velhaturbo.cloud/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ numero, texto, de: remetente })
        });
        const data = await resp.json();
        if (data.ok) {
          btnEnviar.textContent = '✅ Enviado pro zap!';
          setTimeout(() => {
            alert(`✅ Mensagem enviada!\n\n• Destinatário: ${numero}\n• Cópia também foi enviada pra você.\n\nEla/Ele vai receber no WhatsApp.`);
            fecharModal();
          }, 800);
        } else {
          btnEnviar.textContent = '❌ Erro no envio';
          btnEnviar.disabled = false;
          alert('❌ Erro: ' + (data.error || 'desconhecido') + '\n\n' + (data.detail || ''));
        }
      } catch (e) {
        btnEnviar.textContent = '❌ Falha de conexão';
        btnEnviar.disabled = false;
        alert('❌ Não consegui falar com o relay. Verifica tua internet.\n\nDetalhe: ' + e.message);
      }
    });
  }

  // ============================================
  // 7. 📝 CADASTRO DE CONTEÚDO — CRUD
  // ============================================
  function initCadastro() {
    const tabs = document.querySelectorAll('.cad-tab');
    const cartaTipos = document.querySelectorAll('.cad-tipo');
    const dadoRoletaRow = document.getElementById('cad-dado-roleta');
    const cartaTiposRow = document.getElementById('cad-carta-tipos');
    const txtEmoji = document.getElementById('cad-emoji');
    const txtTexto = document.getElementById('cad-texto');
    const chk18 = document.getElementById('cad-18');
    const btnSalvar = document.getElementById('cad-salvar');
    const btnVer = document.getElementById('cad-ver');
    const btnLimpar = document.getElementById('cad-limpar');
    const feedback = document.getElementById('cad-feedback');
    const lista = document.getElementById('cad-lista');
    const countEl = document.getElementById('cad-count');
    if (!btnSalvar) return;

    let cadTab = 'carta';
    let cadCartaTipo = 'pergunta';

    function setActive(arr, el) {
      arr.forEach(x => x.classList.remove('active'));
      el.classList.add('active');
    }

    function updateFields() {
      if (cadTab === 'carta') {
        cartaTiposRow.style.display = 'flex';
        dadoRoletaRow.style.display = 'none';
        txtTexto.placeholder = 'Digita a carta (pergunta / ação / declaração / desafio)...';
      } else if (cadTab === 'dado') {
        cartaTiposRow.style.display = 'none';
        dadoRoletaRow.style.display = 'none';
        txtTexto.placeholder = 'Digita a face do dado (ex: "Beijo na testa")...';
      } else if (cadTab === 'roleta') {
        cartaTiposRow.style.display = 'none';
        dadoRoletaRow.style.display = 'flex';
        txtTexto.placeholder = 'Digita a opção da roleta (ex: "Fazer no chuveiro")...';
      }
      feedback.textContent = '';
      feedback.className = 'cad-feedback';
      atualizarContador();
    }

    tabs.forEach(t => {
      t.addEventListener('click', () => {
        setActive(tabs, t);
        cadTab = t.dataset.tipo;
        updateFields();
      });
    });
    cartaTipos.forEach(t => {
      t.addEventListener('click', () => {
        setActive(cartaTipos, t);
        cadCartaTipo = t.dataset.cat;
      });
    });

    function showFeedback(msg, ok) {
      feedback.textContent = msg;
      feedback.className = 'cad-feedback ' + (ok ? 'ok' : 'err');
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'cad-feedback';
      }, 3500);
    }

    function uid() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    btnSalvar.addEventListener('click', () => {
      const texto = txtTexto.value.trim();
      if (!texto) {
        showFeedback('⚠️ Digita um texto primeiro', false);
        txtTexto.focus();
        return;
      }
      if (cadTab === 'carta') {
        const item = { id: uid(), tipo: cadCartaTipo, is18: chk18.checked, text: texto };
        const arr = loadStorage(STORAGE.CARTAS);
        arr.push(item);
        saveStorage(STORAGE.CARTAS, arr);
        showFeedback(`✅ Carta (${cadCartaTipo}) adicionada!`, true);
      } else if (cadTab === 'dado') {
        const item = { id: uid(), is18: chk18.checked, icon: '🎲', text: texto };
        const arr = loadStorage(STORAGE.DADO);
        arr.push(item);
        saveStorage(STORAGE.DADO, arr);
        showFeedback('✅ Face do dado adicionada!', true);
      } else if (cadTab === 'roleta') {
        const item = { id: uid(), is18: chk18.checked, emoji: txtEmoji.value.trim() || '⭐', text: texto };
        const arr = loadStorage(STORAGE.ROLETA);
        arr.push(item);
        saveStorage(STORAGE.ROLETA, arr);
        showFeedback(`✅ Opção da roleta (${item.emoji}) adicionada!`, true);
      }
      txtTexto.value = '';
      txtEmoji.value = '';
      txtTexto.focus();
      atualizarContador();
      // Re-render baralho/roleta/dado se já tiverem sido inicializados
      reRenderJogos();
    });

    function atualizarContador() {
      const total = loadStorage(STORAGE.CARTAS).length
                   + loadStorage(STORAGE.DADO).length
                   + loadStorage(STORAGE.ROLETA).length;
      countEl.textContent = total;
    }

    function reRenderJogos() {
      // Re-inicializa os 3 jogos (mais simples: dispara o chip do baralho)
      const todas = document.querySelector('.baralho-chip[data-filtro="todas"]');
      if (todas) todas.click();
    }

    btnVer.addEventListener('click', () => {
      if (lista.style.display === 'block') {
        lista.style.display = 'none';
        btnVer.textContent = `📋 Ver cadastrados (${countEl.textContent})`;
        return;
      }
      const cartas = loadStorage(STORAGE.CARTAS);
      const dados = loadStorage(STORAGE.DADO);
      const roletas = loadStorage(STORAGE.ROLETA);
      if (cartas.length + dados.length + roletas.length === 0) {
        showFeedback('📭 Nenhum cadastrado ainda', false);
        return;
      }
      let html = '';
      cartas.forEach(c => {
        html += `
          <div class="cad-lista-item carta" data-id="${c.id}" data-tipo="carta">
            <span class="cad-tag">${c.tipo}</span>
            ${c.is18 ? '<span class="cad-tag eh18">18+</span>' : ''}
            <span class="cad-texto">${escapeHtml(c.text)}</span>
            <button class="cad-del" type="button" title="Remover">✕</button>
          </div>`;
      });
      dados.forEach(d => {
        html += `
          <div class="cad-lista-item dado" data-id="${d.id}" data-tipo="dado">
            <span class="cad-tag">dado</span>
            ${d.is18 ? '<span class="cad-tag eh18">18+</span>' : ''}
            <span class="cad-texto">${d.icon} ${escapeHtml(d.text)}</span>
            <button class="cad-del" type="button" title="Remover">✕</button>
          </div>`;
      });
      roletas.forEach(r => {
        html += `
          <div class="cad-lista-item roleta" data-id="${r.id}" data-tipo="roleta">
            <span class="cad-tag">roleta</span>
            ${r.is18 ? '<span class="cad-tag eh18">18+</span>' : ''}
            <span class="cad-texto">${r.emoji} ${escapeHtml(r.text)}</span>
            <button class="cad-del" type="button" title="Remover">✕</button>
          </div>`;
      });
      lista.innerHTML = html;
      lista.style.display = 'block';
      btnVer.textContent = '📋 Ocultar cadastrados';

      // Deletar
      lista.querySelectorAll('.cad-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const item = e.target.closest('.cad-lista-item');
          const id = item.dataset.id;
          const tipo = item.dataset.tipo;
          const key = tipo === 'carta' ? STORAGE.CARTAS : tipo === 'dado' ? STORAGE.DADO : STORAGE.ROLETA;
          const arr = loadStorage(key).filter(x => x.id !== id);
          saveStorage(key, arr);
          item.remove();
          showFeedback('🗑️ Removido', true);
          atualizarContador();
          reRenderJogos();
          if (lista.querySelectorAll('.cad-lista-item').length === 0) {
            lista.style.display = 'none';
            btnVer.textContent = `📋 Ver cadastrados (${countEl.textContent})`;
          }
        });
      });
    });

    btnLimpar.addEventListener('click', () => {
      if (confirm('🗑️ Apaga TODOS os cadastros? (texto que você adicionou — os bancos base ficam)')) {
        saveStorage(STORAGE.CARTAS, []);
        saveStorage(STORAGE.DADO, []);
        saveStorage(STORAGE.ROLETA, []);
        showFeedback('🗑️ Tudo apagado', true);
        lista.style.display = 'none';
        btnVer.textContent = '📋 Ver cadastrados (0)';
        atualizarContador();
        reRenderJogos();
      }
    });

    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[c]));
    }

    updateFields();
    atualizarContador();
  }

  // ============================================
  // Helper: atualiza resumo dos últimos resultados
  // ============================================
  function atualizarResumo() {
    const el = document.getElementById('notif-resumo');
    if (!el) return;
    const u = STATE.ultimos;
    const lines = [];
    if (u.dado) lines.push(`<div class="res-item"><span class="res-emoji">${u.dado.icon}</span> Dado: ${u.dado.text}</div>`);
    if (u.roleta) lines.push(`<div class="res-item"><span class="res-emoji">${u.roleta.emoji}</span> Roleta: ${u.roleta.label}</div>`);
    if (u.baralho) lines.push(`<div class="res-item"><span class="res-emoji">🃏</span> Carta: ${u.baralho.msg}</div>`);

    if (lines.length === 0) {
      el.classList.remove('show');
      el.innerHTML = '';
    } else {
      el.classList.add('show');
      el.innerHTML = '<strong>Últimos resultados (pronto pra mandar):</strong>' + lines.join('');
    }
  }

  // Expõe STATE pra outros scripts poderem ler
  window.BRINCADEIRAS_STATE = STATE;

  // ============================================
  // INIT
  // ============================================
  function init() {
    initLousa();
    initDados();
    initRoleta();
    initBaralho();
    initModo18();
    initNotif();
    initCadastro();
    console.log('🎨 Brincadeiras carregadas: lousa, dados, roleta, baralho, modo 18+, notif, cadastro');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 200);
  }
})();
