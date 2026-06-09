// ============================================
// FOTOS — Polaroides espalhadas pela página
// Posições em % e ângulos pra ficar orgânico, não grid
// ============================================

const FOTOS = [
  {
    url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    legenda: "Nosso primeiro dia",
    data: "01/01/2013",
    pos: { top: "2%", left: "4%", rot: -8 },
    size: { w: 200, h: 260 },
    tape: "tl", cor: "rose"
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    legenda: "Passeio inesquecível",
    data: "21/10/2013",
    pos: { top: "5%", right: "3%", rot: 6 },
    size: { w: 220, h: 280 },
    tape: "tr", cor: "blue"
  },
  {
    url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
    legenda: "Jantar a luz de vela",
    data: "25/12/2013",
    pos: { top: "38%", left: "1%", rot: -5 },
    size: { w: 210, h: 270 },
    tape: "tl", cor: "warm"
  },
  {
    url: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800",
    legenda: "Viagem dos sonhos",
    data: "12/06/2014",
    pos: { top: "42%", right: "2%", rot: 7 },
    size: { w: 240, h: 300 },
    tape: "tr", cor: "green"
  },
  {
    url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800",
    legenda: "Nosso cantinho",
    data: "15/08/2015",
    pos: { top: "75%", left: "5%", rot: 4 },
    size: { w: 200, h: 250 },
    tape: "tl", cor: "lavender"
  },
  {
    url: "https://images.unsplash.com/photo-1522098635833-216c03d80128?w=800",
    legenda: "Você, sempre você",
    data: "14/02/2020",
    pos: { top: "78%", right: "5%", rot: -6 },
    size: { w: 220, h: 280 },
    tape: "tr", cor: "rose"
  }
];

// Foto do dia — escolhe com base no dia do ano
const FOTOS_ESPECIAIS = {
  // "MM-DD": { url, legenda }
};

// ============================================
// FLOATERS — Polaroides decorativas espalhadas por toda a página
// Não abrem lightbox, só decoram o scroll. Posição em % relativa a body.
// ============================================
const FLOATERS = [
  // Hero / topo
  { url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600", rot: -12, top: "4%",  left: "3%",   size: { w: 140, h: 180 }, tape: "tl", op: 0.85 },
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600", rot: 9,   top: "6%",  right: "4%",  size: { w: 130, h: 170 }, tape: "tr", op: 0.8 },
  { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600", rot: 5,   top: "14%", right: "22%", size: { w: 110, h: 150 }, tape: "tr", op: 0.7 },

  // Contador / meio do hero
  { url: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600", rot: -7,  top: "24%", left: "8%",   size: { w: 130, h: 165 }, tape: "tl", op: 0.75 },

  // Pacote / unboxing
  { url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600", rot: 11,  top: "38%", right: "6%",  size: { w: 150, h: 190 }, tape: "tr", op: 0.8 },

  // Countdown
  { url: "https://images.unsplash.com/photo-1522098635833-216c03d80128?w=600", rot: -10, top: "52%", left: "5%",   size: { w: 135, h: 175 }, tape: "tl", op: 0.7 },

  // Timeline início
  { url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600", rot: 8,   top: "65%", right: "3%",  size: { w: 145, h: 185 }, tape: "tr", op: 0.75 },

  // Meio da timeline
  { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600", rot: -9,  top: "78%", left: "2%",   size: { w: 125, h: 165 }, tape: "tl", op: 0.7 },

  // Galeria (já tem as principais, mas mais 2 decorativas no final)
  { url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600", rot: 7,   top: "89%", right: "8%",  size: { w: 140, h: 180 }, tape: "tr", op: 0.75 },

  // Wrapped
  { url: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600", rot: -8,  top: "98%", left: "6%",   size: { w: 130, h: 170 }, tape: "tl", op: 0.7 },

  // Antes da carta
  { url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600", rot: 12,  top: "112%", right: "5%", size: { w: 145, h: 185 }, tape: "tr", op: 0.8 },

  // Depois da carta
  { url: "https://images.unsplash.com/photo-1522098635833-216c03d80128?w=600", rot: -6,  top: "125%", left: "4%",  size: { w: 135, h: 175 }, tape: "tl", op: 0.7 }
];
