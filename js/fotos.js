// ============================================
// FOTOS — Polaroides espalhadas pela página
// Posições em % e ângulos pra ficar orgânico, não grid
// ============================================

const FOTOS = [
  {
    url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    legenda: "Nosso primeiro dia",
    data: "01/01/2013",
    // Disposição estilo polaroid espalhada
    pos: { top: "2%", left: "4%", rot: -8 },
    size: { w: 200, h: 260 },
    tape: "tl", // fita no top-left
    cor: "rose"
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    legenda: "Passeio inesquecível",
    data: "21/10/2013",
    pos: { top: "5%", right: "3%", rot: 6 },
    size: { w: 220, h: 280 },
    tape: "tr",
    cor: "blue"
  },
  {
    url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
    legenda: "Jantar a luz de vela",
    data: "25/12/2013",
    pos: { top: "38%", left: "1%", rot: -5 },
    size: { w: 210, h: 270 },
    tape: "tl",
    cor: "warm"
  },
  {
    url: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800",
    legenda: "Viagem dos sonhos",
    data: "12/06/2014",
    pos: { top: "42%", right: "2%", rot: 7 },
    size: { w: 240, h: 300 },
    tape: "tr",
    cor: "green"
  },
  {
    url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800",
    legenda: "Nosso cantinho",
    data: "15/08/2015",
    pos: { top: "75%", left: "5%", rot: 4 },
    size: { w: 200, h: 250 },
    tape: "tl",
    cor: "lavender"
  },
  {
    url: "https://images.unsplash.com/photo-1522098635833-216c03d80128?w=800",
    legenda: "Você, sempre você",
    data: "14/02/2020",
    pos: { top: "78%", right: "5%", rot: -6 },
    size: { w: 220, h: 280 },
    tape: "tr",
    cor: "rose"
  }
];

// Foto do dia — escolhe com base no dia do ano
// Pode personalizar o array pra ter fotos especiais em datas marcantes
const FOTOS_ESPECIAIS = {
  // "MM-DD": { url, legenda }
  // Exemplo:
  // "06-12": { url: "...", legenda: "Aniversário de namoro" }
};
