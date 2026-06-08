// ============================================
// MÚSICAS — Playlist do nosso amor
// Cada vez que ela abrir o site, toca uma aleatória
// Como adicionar mais: é só copiar o bloco e trocar youtubeId/título/artista
// ============================================

const MUSICAS = [
  {
    titulo: "Tocando em Frente",
    artista: "Almir Sater",
    youtubeId: "CugYXgJ2SFI",
    capa: "https://i.ytimg.com/vi/CugYXgJ2SFI/hqdefault.jpg",
    significado: "Pra gente seguir em frente, sempre. Juntinhos."
  },
  {
    titulo: "Trem-Bala",
    artista: "Ana Vilela",
    youtubeId: "sWhy1VcvvgY",
    capa: "https://i.ytimg.com/vi/sWhy1VcvvgY/hqdefault.jpg",
    significado: "O tempo não para. Mas a gente aproveita cada estação."
  },
  {
    titulo: "Evidências",
    artista: "Chitãozinho & Xororó",
    youtubeId: "bxo9mtJjvS0",
    capa: "https://i.ytimg.com/vi/bxo9mtJjvS0/hqdefault.jpg",
    significado: "Quando bate aquela saudade e a certeza de que é você."
  },
  {
    titulo: "Sozinho",
    artista: "Peninha",
    youtubeId: "_vk9BTs8XK8",
    capa: "https://i.ytimg.com/vi/_vk9BTs8XK8/hqdefault.jpg",
    significado: "Eu era sozinho, mas aí te encontrei. Agora sou teu."
  },
  {
    titulo: "Borboletas",
    artista: "Victor & Leo",
    youtubeId: "JIrRp-1X9wo",
    capa: "https://i.ytimg.com/vi/JIrRp-1X9wo/hqdefault.jpg",
    significado: "Borboletas no stomach toda vez que te olho."
  },
  {
    titulo: "Detalhes",
    artista: "Roberto Carlos",
    youtubeId: "rzrH-bSSD2M",
    capa: "https://i.ytimg.com/vi/rzrH-bSSD2M/hqdefault.jpg",
    significado: "O que me faz amar você são os detalhes do dia a dia."
  },
  {
    titulo: "Amor Sem Limite",
    artista: "Roberto Carlos",
    youtubeId: "QW933n2bZOA",
    capa: "https://i.ytimg.com/vi/QW933n2bZOA/hqdefault.jpg",
    significado: "O nosso não tem limite, não tem fim. ♡"
  },
  {
    titulo: "Como É Grande o Meu Amor Por Você",
    artista: "Roberto Carlos",
    youtubeId: "Vtt7kCtdc_4",
    capa: "https://i.ytimg.com/vi/Vtt7kCtdc_4/hqdefault.jpg",
    significado: "Cada vez maior. Mesmo quando eu acho que não cabe mais, cabe."
  },
  {
    titulo: "A Paz",
    artista: "Roupa Nova",
    youtubeId: "OP4KB5FR_Mw",
    capa: "https://i.ytimg.com/vi/OP4KB5FR_Mw/hqdefault.jpg",
    significado: "Do seu lado eu encontrei a minha paz."
  },
  {
    titulo: "Dona",
    artista: "Roupa Nova",
    youtubeId: "NCIvXUghMXc",
    capa: "https://i.ytimg.com/vi/NCIvXUghMXc/hqdefault.jpg",
    significado: "A dona do meu coração é você, sempre foi."
  },
  {
    titulo: "Sapato Velho",
    artista: "Roupa Nova",
    youtubeId: "n_PhyjelwU0",
    capa: "https://i.ytimg.com/vi/n_PhyjelwU0/hqdefault.jpg",
    significado: "A gente tem o jeitinho de quem se conhece há 13 anos."
  },
  {
    titulo: "Coração de Estudante",
    artista: "Milton Nascimento",
    youtubeId: "KsqAfD4BkwA",
    capa: "https://i.ytimg.com/vi/KsqAfD4BkwA/hqdefault.jpg",
    significado: "Que a nossa história não tenha fim. Que seja eterna."
  },
  {
    titulo: "Maria Maria",
    artista: "Milton Nascimento",
    youtubeId: "IElS9cxpImA",
    capa: "https://i.ytimg.com/vi/IElS9cxpImA/hqdefault.jpg",
    significado: "Maria, Maria... é você. ♡"
  },
  {
    titulo: "O Último Romântico",
    artista: "Lulu Santos",
    youtubeId: "jMAJ-tf87c0",
    capa: "https://i.ytimg.com/vi/jMAJ-tf87c0/hqdefault.jpg",
    significado: "Romântico eu sou, mas só por você."
  },
  {
    titulo: "Trem das Onze",
    artista: "Adoniran Barbosa",
    youtubeId: "RkkGVgOqPuM",
    capa: "https://i.ytimg.com/vi/RkkGVgOqPuM/hqdefault.jpg",
    significado: "Não posso ficar, mas a gente se vê amanhã. Todo dia. ♡"
  },
  {
    titulo: "Asa Branca",
    artista: "Luiz Gonzaga",
    youtubeId: "zIy3EwyBBI0",
    capa: "https://i.ytimg.com/vi/zIy3EwyBBI0/hqdefault.jpg",
    significado: "Você é meu sertão, meu lugar seguro."
  },
  {
    titulo: "Sozinho",
    artista: "Caetano Veloso",
    youtubeId: "j9UbE1slI-Q",
    capa: "https://i.ytimg.com/vi/j9UbE1slI-Q/hqdefault.jpg",
    significado: "A versão que a gente merece: sozinho, mas acompanhado por dentro."
  },
  {
    titulo: "Por Você",
    artista: "Frejat",
    youtubeId: "Ver-7kFcDOQ",
    capa: "https://i.ytimg.com/vi/Ver-7kFcDOQ/hqdefault.jpg",
    significado: "Por você eu faço qualquer coisa — e faria de novo."
  },
  {
    titulo: "Eduardo e Mônica",
    artista: "Legião Urbana",
    youtubeId: "5RC_buIlexc",
    capa: "https://i.ytimg.com/vi/5RC_buIlexc/hqdefault.jpg",
    significado: "A gente é tipo a história deles, mas com a nossa cara. ♡"
  }
];
