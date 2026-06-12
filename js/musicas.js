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
  },

  // ============ SERTANEJO ROMÂNTICO ============
  {
    titulo: "Fio de Cabelo",
    artista: "Chitãozinho & Xororó",
    youtubeId: "jQfgVcWfDE0",
    capa: "https://i.ytimg.com/vi/jQfgVcWfDE0/hqdefault.jpg",
    significado: "Cada detalhe teu me faz lembrar por que te amo."
  },
  {
    titulo: "No Rancho Fundo",
    artista: "Chitãozinho & Xororó",
    youtubeId: "EUQY7N0P2L0",
    capa: "https://i.ytimg.com/vi/EUQY7N0P2L0/hqdefault.jpg",
    significado: "A gente tem o nosso cantinho, do nosso jeito."
  },
  {
    titulo: "Página de Amigos",
    artista: "Chitãozinho & Xororó",
    youtubeId: "GbNQ9ZG3Byw",
    capa: "https://i.ytimg.com/vi/GbNQ9ZG3Byw/hqdefault.jpg",
    significado: "Você é minha página preferida do caderno da vida."
  },
  {
    titulo: "Evidências (ao vivo)",
    artista: "Chitãozinho & Xororó",
    youtubeId: "bxo9mtJjvS0",
    capa: "https://i.ytimg.com/vi/bxo9mtJjvS0/hqdefault.jpg",
    significado: "Já sabe né, quando a saudade aperta, essa é a trilha."
  },
  {
    titulo: "Galopeira",
    artista: "Chitãozinho & Xororó",
    youtubeId: "uG4sk_8M-x4",
    capa: "https://i.ytimg.com/vi/uG4sk_8M-x4/hqdefault.jpg",
    significado: "Quando tô pensando em você, meu coração dispara igual."
  },
  {
    titulo: "Apaixonadinha",
    artista: "Marília Mendonça (com Michel Teló)",
    youtubeId: "zckJ8DIQMm4",
    capa: "https://i.ytimg.com/vi/zckJ8DIQMm4/hqdefault.jpg",
    significado: "Como eu fico quando você aparece."
  },
  {
    titulo: "Término",
    artista: "Marília Mendonça",
    youtubeId: "vxLKnJxQYYc",
    capa: "https://i.ytimg.com/vi/vxLKnJxQYYc/hqdefault.jpg",
    significado: "Não consigo nem ouvir essa sem pensar 'nunca com a gente'."
  },
  {
    titulo: "Eu Sei Que Vou Te Amar",
    artista: "Marília Mendonça (com Murilo Huff)",
    youtubeId: "gVWhcXNjMhU",
    capa: "https://i.ytimg.com/vi/gVWhcXNjMhU/hqdefault.jpg",
    significado: "Eu sei que vou te amar, todos os dias da vida. ♡"
  },
  {
    titulo: "Infiel",
    artista: "Marília Mendonça",
    youtubeId: "KkI2Xc-DT-A",
    capa: "https://i.ytimg.com/vi/KkI2Xc-DT-A/hqdefault.jpg",
    significado: "Eu não. Sou teu de corpo e alma."
  },
  {
    titulo: "Deus Me Proteja",
    artista: "Henrique & Juliano",
    youtubeId: "DLnDxhJpq1Y",
    capa: "https://i.ytimg.com/vi/DLnDxhJpq1Y/hqdefault.jpg",
    significado: "Deus me proteja, mas principalmente esse nosso amor."
  },
  {
    titulo: "Vidinha de Balada",
    artista: "Henrique & Juliano",
    youtubeId: "J7KfM4Wgrd4",
    capa: "https://i.ytimg.com/vi/J7KfM4Wgrd4/hqdefault.jpg",
    significado: "A gente já teve fase balada, agora a melhor fase é a nossa."
  },
  {
    titulo: "Na Hora da Raiva",
    artista: "Henrique & Juliano",
    youtubeId: "KrO0A1MnIvQ",
    capa: "https://i.ytimg.com/vi/KrO0A1MnIvQ/hqdefault.jpg",
    significado: "A gente briga, mas a gente ama mais ainda depois."
  },
  {
    titulo: "Liberdade Provisória",
    artista: "Henrique & Juliano",
    youtubeId: "r6LJrw0JAhU",
    capa: "https://i.ytimg.com/vi/r6LJrw0JAhU/hqdefault.jpg",
    significado: "Me solta que eu vou, mas volto pra você sempre."
  },
  {
    titulo: "Vidinha de Balcão",
    artista: "Luan Santana",
    youtubeId: "syFZ0iZx5Cw",
    capa: "https://i.ytimg.com/vi/syFZ0iZx5Cw/hqdefault.jpg",
    significado: "A gente não tá no balcão não, tá no altar (ou quase)."
  },
  {
    titulo: "Te Esperando",
    artista: "Luan Santana",
    youtubeId: "jZ3XgCEMOFM",
    capa: "https://i.ytimg.com/vi/jZ3XgCEMOFM/hqdefault.jpg",
    significado: "Toda vez que você atrasa, eu fico assim: te esperando."
  },
  {
    titulo: "Meteoro",
    artista: "Luan Santana",
    youtubeId: "AA5m2FOHVEk",
    capa: "https://i.ytimg.com/vi/AA5m2FOHVEk/hqdefault.jpg",
    significado: "Caí de meteoro por você, e não pretendo levantar."
  },
  {
    titulo: "Esquece o Mundo Lá Fora",
    artista: "Luan Santana",
    youtubeId: "Xk-yOmEHBz8",
    capa: "https://i.ytimg.com/vi/Xk-yOmEHBz8/hqdefault.jpg",
    significado: "Com você eu esqueço tudo que tá lá fora. Só existe a gente."
  },
  {
    titulo: "Erro Vagabundo",
    artista: "Jorge & Mateus",
    youtubeId: "VgYb5H7uMRw",
    capa: "https://i.ytimg.com/vi/VgYb5H7uMRw/hqdefault.jpg",
    significado: "O meu erro é te amar demais, e eu não quero consertar."
  },
  {
    titulo: "Amo Você",
    artista: "Jorge & Mateus (com Maiara & Maraisa)",
    youtubeId: "IFh7nNqG1A0",
    capa: "https://i.ytimg.com/vi/IFh7nNqG1A0/hqdefault.jpg",
    significado: "Amo você, simples assim."
  },
  {
    titulo: "Logo Logo",
    artista: "Jorge & Mateus",
    youtubeId: "FiLqLDb-F0k",
    capa: "https://i.ytimg.com/vi/FiLqLDb-F0k/hqdefault.jpg",
    significado: "Logo logo eu tô aí, igual todas as noites."
  },
  {
    titulo: "Sosseguei",
    artista: "Jorge & Mateus",
    youtubeId: "Qt5DRqDILfw",
    capa: "https://i.ytimg.com/vi/Qt5DRqDILfw/hqdefault.jpg",
    significado: "Achei o sossego que eu procurava: do seu lado."
  },
  {
    titulo: "Propaganda",
    artista: "Jorge & Mateus",
    youtubeId: "Kow5SrCrD6w",
    capa: "https://i.ytimg.com/vi/Kow5SrCrD6w/hqdefault.jpg",
    significado: "Eu faço propaganda do nosso amor, sempre."
  },
  {
    titulo: "Meio Caminho",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "kA0vH3lF8dA",
    capa: "https://i.ytimg.com/vi/kA0vH3lF8dA/hqdefault.jpg",
    significado: "A gente já fez mais da metade do caminho. Vamos até o fim."
  },
  {
    titulo: "É O Amor",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "dnLKGGKLbcE",
    capa: "https://i.ytimg.com/vi/dnLKGGKLbcE/hqdefault.jpg",
    significado: "É o amor que me faz levantar todo dia feliz."
  },
  {
    titulo: "Coração Está Em Pedaços",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "ZywEx4vOSR8",
    capa: "https://i.ytimg.com/vi/ZywEx4vOSR8/hqdefault.jpg",
    significado: "Antes de você, meu coração tava em pedaços. Você juntou."
  },
  {
    titulo: "Pra Não Pensar Em Você",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "7eD7sTBz0d8",
    capa: "https://i.ytimg.com/vi/7eD7sTBz0d8/hqdefault.jpg",
    significado: "Já tentei não pensar, não consigo. É você o tempo todo."
  },
  {
    titulo: "Andar Com Fé",
    artista: "João Bosco & Vinícius",
    youtubeId: "gVu4HsQ-vcE",
    capa: "https://i.ytimg.com/vi/gVu4HsQ-vcE/hqdefault.jpg",
    significado: "Andar com fé, com você do lado, é tudo que eu preciso."
  },
  {
    titulo: "Sai da Minha Aba",
    artista: "Gusttavo Lima",
    youtubeId: "W3JNIQ8PjCQ",
    capa: "https://i.ytimg.com/vi/W3JNIQ8PjCQ/hqdefault.jpg",
    significado: "Sai da minha aba não, fica pertinho de mim."
  },
  {
    titulo: "Inventor dos Amores",
    artista: "Gusttavo Lima (com Jorge & Mateus)",
    youtubeId: "c5K0mBbnxE0",
    capa: "https://i.ytimg.com/vi/c5K0mBbnxE0/hqdefault.jpg",
    significado: "Você é o inventor dos meus amores, o único que valeu."
  },

  // ============ MPB E CLÁSSICOS ROMÂNTICOS ============
  {
    titulo: "Anunciação",
    artista: "Alceu Valença",
    youtubeId: "Vv_sIWGyVno",
    capa: "https://i.ytimg.com/vi/Vv_sIWGyVno/hqdefault.jpg",
    significado: "Você veio pra anunciar o amor na minha vida."
  },
  {
    titulo: "Trem das Cores",
    artista: "Caetano Veloso",
    youtubeId: "nXKCSpEXZn0",
    capa: "https://i.ytimg.com/vi/nXKCSpEXZn0/hqdefault.jpg",
    significado: "O trem das nossas memórias passa colorido na minha cabeça."
  },
  {
    titulo: "Tigresa",
    artista: "Caetano Veloso",
    youtubeId: "HJ9PCv2wzRE",
    capa: "https://i.ytimg.com/vi/HJ9PCv2wzRE/hqdefault.jpg",
    significado: "Você é a minha tigresa, mansa e feroz ao mesmo tempo."
  },
  {
    titulo: "O Sal da Terra",
    artista: "Caetano Veloso",
    youtubeId: "8R3n-LLUxaA",
    capa: "https://i.ytimg.com/vi/8R3n-LLUxaA/hqdefault.jpg",
    significado: "Você é o sal da minha terra, dá gosto à vida."
  },
  {
    titulo: "Luz do Sol",
    artista: "Caetano Veloso",
    youtubeId: "WOYs3aXDL1Q",
    capa: "https://i.ytimg.com/vi/WOYs3aXDL1Q/hqdefault.jpg",
    significado: "Você é a luz do sol que entra na minha janela de manhã."
  },
  {
    titulo: "O Trenzinho do Caipira",
    artista: "Heitor Villa-Lobos",
    youtubeId: "KE-1LZGZqN8",
    capa: "https://i.ytimg.com/vi/KE-1LZGZqN8/hqdefault.jpg",
    significado: "A gente tem um ritmo só nosso, igual trenzinho do caipira."
  },
  {
    titulo: "Garota de Ipanema",
    artista: "Tom Jobim & Vinícius",
    youtubeId: "n5rOTUwxVhE",
    capa: "https://i.ytimg.com/vi/n5rOTUwxVhE/hqdefault.jpg",
    significado: "A garota mais linda que eu vi, é você. ♡"
  },
  {
    titulo: "Águas de Março",
    artista: "Tom Jobim",
    youtubeId: "4lD6oFqmpsI",
    capa: "https://i.ytimg.com/vi/4lD6oFqmpsI/hqdefault.jpg",
    significado: "A gente tá no fim do verão, mas o amor continua enchendo."
  },
  {
    titulo: "Corcovado",
    artista: "Tom Jobim",
    youtubeId: "IuWX9O7_Jz4",
    capa: "https://i.ytimg.com/vi/IuWX9O7_Jz4/hqdefault.jpg",
    significado: "Em qualquer lugar do mundo, eu penso em você."
  },
  {
    titulo: "Wave",
    artista: "Tom Jobim",
    youtubeId: "LPv0VMAt_a0",
    capa: "https://i.ytimg.com/vi/LPv0VMAt_a0/hqdefault.jpg",
    significado: "Vem dar uma volta comigo, igual as ondas do mar."
  },
  {
    titulo: "Eu Sei Que Vou Te Amar",
    artista: "Tom Jobim & Vinícius",
    youtubeId: "M_cxA9byBd8",
    capa: "https://i.ytimg.com/vi/M_cxA9byBd8/hqdefault.jpg",
    significado: "A música mais bonita que já fizeram, e descreve a gente."
  },
  {
    titulo: "Travessia",
    artista: "Milton Nascimento",
    youtubeId: "OOe1OX5t8gg",
    capa: "https://i.ytimg.com/vi/OOe1OX5t8gg/hqdefault.jpg",
    significado: "A travessia mais bonita da minha vida, foi contigo."
  },
  {
    titulo: "Cais",
    artista: "Milton Nascimento",
    youtubeId: "FBN_Qt_aC0A",
    capa: "https://i.ytimg.com/vi/FBN_Qt_aC0A/hqdefault.jpg",
    significado: "Você é o meu cais, o lugar onde eu descanso."
  },
  {
    titulo: "Canção da América",
    artista: "Milton Nascimento",
    youtubeId: "uQ1_ZsCSaFM",
    capa: "https://i.ytimg.com/vi/uQ1_ZsCSaFM/hqdefault.jpg",
    significado: "Amigo é coisa pra se guardar debaixo de 7 chaves. Como você."
  },
  {
    titulo: "Amor I Love You",
    artista: "Marisa Monte",
    youtubeId: "gxVu3MAtLgA",
    capa: "https://i.ytimg.com/vi/gxVu3MAtLgA/hqdefault.jpg",
    significado: "Amor, I love you, em todas as línguas."
  },
  {
    titulo: "Beija Eu",
    artista: "Marisa Monte",
    youtubeId: "wZ4q2v3r3yE",
    capa: "https://i.ytimg.com/vi/wZ4q2v3r3yE/hqdefault.jpg",
    significado: "Beija eu, beija eu, beija eu. Toda vez que precisar."
  },
  {
    titulo: "Depois",
    artista: "Marisa Monte (com Arnaldo Antunes)",
    youtubeId: "FRbyfYx8gyY",
    capa: "https://i.ytimg.com/vi/FRbyfYx8gyY/hqdefault.jpg",
    significado: "Depois, amanhã, sempre, pra sempre. Com você."
  },
  {
    titulo: "Não É Proibido",
    artista: "Marisa Monte",
    youtubeId: "GmDQJq5P1zY",
    capa: "https://i.ytimg.com/vi/GmDQJq5P1zY/hqdefault.jpg",
    significado: "Amar você não é proibido, é necessário."
  },
  {
    titulo: "Caminhoneiro",
    artista: "Roberto Carlos (com刘德华)",
    youtubeId: "kK3eI0D-pk0",
    capa: "https://i.ytimg.com/vi/kK3eI0D-pk0/hqdefault.jpg",
    significado: "Mesmo longe, eu penso em você em cada estrada."
  },
  {
    titulo: "Lady Laura",
    artista: "Roberto Carlos",
    youtubeId: "DQ8c-Dq5pjM",
    capa: "https://i.ytimg.com/vi/DQ8c-Dq5pjM/hqdefault.jpg",
    significado: "Lady Laura, minha lady, é você."
  },
  {
    titulo: "Quero Que Vá Tudo Pro Inferno",
    artista: "Roberto Carlos (com Gal Costa)",
    youtubeId: "ttO0D4Vpsho",
    capa: "https://i.ytimg.com/vi/ttO0D4Vpsho/hqdefault.jpg",
    significado: "Menos o nosso amor. Esse fica."
  },
  {
    titulo: "Emoções",
    artista: "Roberto Carlos",
    youtubeId: "yEQShTCyFFI",
    capa: "https://i.ytimg.com/vi/yEQShTCyFFI/hqdefault.jpg",
    significado: "Quando você me olha, é isso que eu sinto."
  },
  {
    titulo: "Jesus Cristo",
    artista: "Roberto Carlos",
    youtubeId: "c9qKJJaJpqE",
    capa: "https://i.ytimg.com/vi/c9qKJJaJpqE/hqdefault.jpg",
    significado: "Eu nasci há 10 mil anos atrás e não amei ninguém como você."
  },
  {
    titulo: "Café da Manhã",
    artista: "Roberto Carlos",
    youtubeId: "GQxNyjFnLgM",
    capa: "https://i.ytimg.com/vi/GQxNyjFnLgM/hqdefault.jpg",
    significado: "O melhor café da manhã é quando você tá do meu lado."
  },
  {
    titulo: "Mais Uma Vez",
    artista: "Renato Russo (solo)",
    youtubeId: "K5Dgk3U7hRw",
    capa: "https://i.ytimg.com/vi/K5Dgk3U7hRw/hqdefault.jpg",
    significado: "Se eu fosse explicar o que sinto, eu diria: mais uma vez."
  },
  {
    titulo: "Vento No Litoral",
    artista: "Legião Urbana",
    youtubeId: "9W3y2v_yU9E",
    capa: "https://i.ytimg.com/vi/9W3y2v_yU9E/hqdefault.jpg",
    significado: "O vento do nosso amor sopra sempre a favor."
  },
  {
    titulo: "Pais e Filhos",
    artista: "Legião Urbana",
    youtubeId: "DRg3V1lTqUg",
    capa: "https://i.ytimg.com/vi/DRg3V1lTqUg/hqdefault.jpg",
    significado: "A gente construiu uma família linda. Nossos filhos são a gente."
  },
  {
    titulo: "Faroeste Caboclo",
    artista: "Legião Urbana",
    youtubeId: "c4hA_qDB1Ko",
    capa: "https://i.ytimg.com/vi/c4hA_qDB1Ko/hqdefault.jpg",
    significado: "A história do João de Santo Cristo é a nossa: cheia de reviravoltas e amor."
  },
  {
    titulo: "Lanterna Dos Afogados",
    artista: "Legião Urbana",
    youtubeId: "N-m_T18VR5w",
    capa: "https://i.ytimg.com/vi/N-m_T18VR5w/hqdefault.jpg",
    significado: "Quando tudo escurece, você é minha lanterna."
  },
  {
    titulo: "Meninos e Meninas",
    artista: "Legião Urbana",
    youtubeId: "zAjUKlWJi50",
    capa: "https://i.ytimg.com/vi/zAjUKlWJi50/hqdefault.jpg",
    significado: "Quando a gente se conheceu, era tudo meninos e meninas."
  },
  {
    titulo: "Índios",
    artista: "Legião Urbana",
    youtubeId: "xIBZHRPVqos",
    capa: "https://i.ytimg.com/vi/xIBZHRPVqos/hqdefault.jpg",
    significado: "Quem tem amor, tem o resto. A gente tem tudo."
  },
  {
    titulo: "Pessoal Inestimável",
    artista: "Legião Urbana",
    youtubeId: "6HmC4fPOZw4",
    capa: "https://i.ytimg.com/vi/6HmC4fPOZw4/hqdefault.jpg",
    significado: "Você é a pessoa mais inestimável da minha vida."
  },
  {
    titulo: "Sutilmente",
    artista: "Skank",
    youtubeId: "V8gE5wAjPvw",
    capa: "https://i.ytimg.com/vi/V8gE5wAjPvw/hqdefault.jpg",
    significado: "Você me afetou tão sutilmente que eu nem vi chegar."
  },
  {
    titulo: "Vou Deixar",
    artista: "Skank",
    youtubeId: "tVbllJoPZ0g",
    capa: "https://i.ytimg.com/vi/tVbllJoPZ0g/hqdefault.jpg",
    significado: "Eu vou deixar você ser feliz, mas com você do meu lado."
  },
  {
    titulo: "Resposta",
    artista: "Skank",
    youtubeId: "g7XgP23KMZw",
    capa: "https://i.ytimg.com/vi/g7XgP23KMZw/hqdefault.jpg",
    significado: "Você é a resposta de tudo que eu sempre procurei."
  },
  {
    titulo: "Acima do Sol",
    artista: "Skank",
    youtubeId: "RZ4yDh3DJo0",
    capa: "https://i.ytimg.com/vi/RZ4yDh3DJo0/hqdefault.jpg",
    significado: "A gente tá acima do sol, acima de tudo."
  },
  {
    titulo: "Tão Bem",
    artista: "Lulu Santos",
    youtubeId: "Wl5tpaG5wC8",
    capa: "https://i.ytimg.com/vi/Wl5tpaG5wC8/hqdefault.jpg",
    significado: "Do seu lado, eu tô tão bem."
  },
  {
    titulo: "Toda Forma de Amor",
    artista: "Lulu Santos",
    youtubeId: "V8gE5wAjPvw",
    capa: "https://i.ytimg.com/vi/V8gE5wAjPvw/hqdefault.jpg",
    significado: "A gente já passou por toda forma de amor, e tá de pé."
  },
  {
    titulo: "Sereia",
    artista: "Lulu Santos",
    youtubeId: "9W3y2v_yU9E",
    capa: "https://i.ytimg.com/vi/9W3y2v_yU9E/hqdefault.jpg",
    significado: "Você me enfeitiça igual sereia. ♡"
  },
  {
    titulo: "Tudo Que Eu Quero",
    artista: "Capital Inicial (com Seu Jorge)",
    youtubeId: "g7XgP23KMZw",
    capa: "https://i.ytimg.com/vi/g7XgP23KMZw/hqdefault.jpg",
    significado: "Tudo que eu quero, é você. Só."
  },
  {
    titulo: "Primeiros Erros",
    artista: "Capital Inicial",
    youtubeId: "9W3y2v_yU9E",
    capa: "https://i.ytimg.com/vi/9W3y2v_yU9E/hqdefault.jpg",
    significado: "A gente já errou, mas nossos acertos foram maiores."
  },
  {
    titulo: "Natasha",
    artista: "Capital Inicial",
    youtubeId: "zAjUKlWJi50",
    capa: "https://i.ytimg.com/vi/zAjUKlWJi50/hqdefault.jpg",
    significado: "Cada pessoa que passa na nossa vida, ensina algo. Você me ensinou tudo."
  }
];
