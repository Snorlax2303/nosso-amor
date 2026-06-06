// ============================================
// FOTOS — Galeria + Foto do dia (porta-retrato)
// Hospede as fotos no GitHub/imgur/Cloudinary e cole as URLs
// Ou coloque em ./img/ no projeto
// ============================================

const FOTOS = [
  {
    url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800",
    legenda: "Nosso primeiro dia juntos",
    data: "2022-08-15"
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    legenda: "Aquele passeio inesquecível",
    data: "2022-10-21"
  },
  {
    url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800",
    legenda: "Jantar a luz de vela",
    data: "2022-12-25"
  },
  {
    url: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800",
    legenda: "Viajem dos sonhos",
    data: "2023-06-12"
  },
  {
    url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800",
    legenda: "Nosso cantinho",
    data: "2023-08-15"
  },
  {
    url: "https://images.unsplash.com/photo-1522098635833-216c03d80128?w=800",
    legenda: "Você, sempre você",
    data: "2024-02-14"
  }
];

// Foto do dia — escolhe com base no dia do ano
// Pode personalizar o array pra ter fotos especiais em datas marcantes
const FOTOS_ESPECIAIS = {
  // "MM-DD": { url, legenda }
  // Exemplo:
  // "06-12": { url: "...", legenda: "Aniversário de namoro" }
};
