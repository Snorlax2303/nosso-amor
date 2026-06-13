// ============================================
// FOTOS — Polaroides espalhadas pela página
// Sem data — só legenda
// ============================================

const FOTOS = [
  // 1. Capa do contador — selfie linda da Fernanda (atrás do hero)
  {
    url: "./assets/fotos/medium/floater-1.webp",
    thumb: "./assets/fotos/thumb/floater-1.webp",
    capa: true,
    pos: { top: "4%", left: "6%", rot: -7 },
    size: { w: 220, h: 280 },
    tape: "tl", cor: "sky"
  },

  // 2-12. Galeria principal (11 fotos casal — 1 removida por ser screenshot)
  {
    url: "./assets/fotos/medium/zueira-balada.webp",
    thumb: "./assets/fotos/thumb/zueira-balada.webp",
    pos: { top: "2%", right: "3%", rot: 8 },
    size: { w: 210, h: 270 },
    tape: "tr", cor: "rose"
  },
  {
    url: "./assets/fotos/medium/noite-moletom.webp",
    thumb: "./assets/fotos/thumb/noite-moletom.webp",
    pos: { top: "32%", left: "1%", rot: -5 },
    size: { w: 220, h: 280 },
    tape: "tl", cor: "cream"
  },
  {
    url: "./assets/fotos/medium/vestido-preto.webp",
    thumb: "./assets/fotos/thumb/vestido-preto.webp",
    pos: { top: "36%", right: "2%", rot: 6 },
    size: { w: 200, h: 260 },
    tape: "tr", cor: "rose"
  },
  {
    url: "./assets/fotos/medium/lanche-divertido.webp",
    thumb: "./assets/fotos/thumb/lanche-divertido.webp",
    pos: { top: "62%", left: "4%", rot: 4 },
    size: { w: 230, h: 290 },
    tape: "tl", cor: "sage"
  },
  {
    url: "./assets/fotos/medium/juntos-casamento.webp",
    thumb: "./assets/fotos/thumb/juntos-casamento.webp",
    pos: { top: "68%", right: "5%", rot: -7 },
    size: { w: 200, h: 260 },
    tape: "tr", cor: "cream"
  },
  {
    url: "./assets/fotos/medium/ninho-caseiro.webp",
    thumb: "./assets/fotos/thumb/ninho-caseiro.webp",
    pos: { top: "94%", left: "2%", rot: 8 },
    size: { w: 215, h: 275 },
    tape: "tl", cor: "rose"
  },
  {
    url: "./assets/fotos/medium/bar-naruto.webp",
    thumb: "./assets/fotos/thumb/bar-naruto.webp",
    pos: { top: "100%", right: "3%", rot: -6 },
    size: { w: 200, h: 260 },
    tape: "tr", cor: "sage"
  },
  {
    url: "./assets/fotos/medium/viagem-praia.webp",
    thumb: "./assets/fotos/thumb/viagem-praia.webp",
    pos: { top: "128%", left: "5%", rot: 5 },
    size: { w: 220, h: 280 },
    tape: "tl", cor: "sky"
  },
  {
    url: "./assets/fotos/medium/paraiso-mar.webp",
    thumb: "./assets/fotos/thumb/paraiso-mar.webp",
    pos: { top: "132%", right: "4%", rot: -8 },
    size: { w: 210, h: 270 },
    tape: "tr", cor: "rose"
  },
  {
    url: "./assets/fotos/medium/pai-filho-cabelo.webp",
    thumb: "./assets/fotos/thumb/pai-filho-cabelo.webp",
    pos: { top: "160%", left: "3%", rot: -5 },
    size: { w: 230, h: 290 },
    tape: "tl", cor: "cream"
  }
];

// Foto do dia — escolhe com base no dia do ano (vazio por enquanto)
const FOTOS_ESPECIAIS = {};

// ============================================
// FLOATERS — Selfies só dela, espalhadas pela página
// floater-1 virou CAPA do contador (não pode duplicar)
// ============================================
const FLOATERS = [
  { url: "./assets/fotos/medium/floater-2.webp", rot: -12, top: "8%",   left: "3%",   size: { w: 140, h: 180 }, tape: "tl", op: 0.85 },
  { url: "./assets/fotos/medium/floater-3.webp", rot: 9,   top: "5%",   right: "4%",  size: { w: 130, h: 170 }, tape: "tr", op: 0.8  },
  { url: "./assets/fotos/medium/floater-4.webp", rot: -7,  top: "22%",  right: "20%", size: { w: 110, h: 150 }, tape: "tr", op: 0.7  },
  { url: "./assets/fotos/medium/floater-5.webp", rot: 11,  top: "40%",  left: "6%",   size: { w: 145, h: 185 }, tape: "tl", op: 0.8  },
  { url: "./assets/fotos/medium/floater-6.webp", rot: -10, top: "55%",  right: "5%",  size: { w: 135, h: 175 }, tape: "tr", op: 0.7  }
];
