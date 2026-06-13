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
    youtubeId: "48kf5eG5yeY",
    capa: "https://i.ytimg.com/vi/48kf5eG5yeY/hqdefault.jpg",
    significado: "Cada detalhe teu me faz lembrar por que te amo."
  },
  {
    titulo: "No Rancho Fundo",
    artista: "Chitãozinho & Xororó",
    youtubeId: "Mo6PtQxipr8",
    capa: "https://i.ytimg.com/vi/Mo6PtQxipr8/hqdefault.jpg",
    significado: "A gente tem o nosso cantinho, do nosso jeito."
  },
  {
    titulo: "Página de Amigos",
    artista: "Chitãozinho & Xororó",
    youtubeId: "8N-6CSOyCU4",
    capa: "https://i.ytimg.com/vi/8N-6CSOyCU4/hqdefault.jpg",
    significado: "Você é minha página preferida do caderno da vida."
  },
  {
    titulo: "Galopeira",
    artista: "Chitãozinho & Xororó",
    youtubeId: "nPCg-fjTmWQ",
    capa: "https://i.ytimg.com/vi/nPCg-fjTmWQ/hqdefault.jpg",
    significado: "Quando tô pensando em você, meu coração dispara igual."
  },
  {
    titulo: "Apaixonadinha",
    artista: "Marília Mendonça (com Michel Teló)",
    youtubeId: "1eZXuqrq910",
    capa: "https://i.ytimg.com/vi/1eZXuqrq910/hqdefault.jpg",
    significado: "Como eu fico quando você aparece."
  },
  {
    titulo: "Término",
    artista: "Marília Mendonça",
    youtubeId: "Dt13Wv6Opeo",
    capa: "https://i.ytimg.com/vi/Dt13Wv6Opeo/hqdefault.jpg",
    significado: "Não consigo nem ouvir essa sem pensar 'nunca com a gente'."
  },
  {
    titulo: "Eu Sei Que Vou Te Amar",
    artista: "Marília Mendonça (com Murilo Huff)",
    youtubeId: "tnfbhjbbmu4",
    capa: "https://i.ytimg.com/vi/tnfbhjbbmu4/hqdefault.jpg",
    significado: "Eu sei que vou te amar, todos os dias da vida. ♡"
  },
  {
    titulo: "Infiel",
    artista: "Marília Mendonça",
    youtubeId: "_hIq1rUG5aY",
    capa: "https://i.ytimg.com/vi/_hIq1rUG5aY/hqdefault.jpg",
    significado: "Eu não. Sou teu de corpo e alma."
  },
  {
    titulo: "Deus Me Proteja",
    artista: "Henrique & Juliano",
    youtubeId: "S1VqBykbfv0",
    capa: "https://i.ytimg.com/vi/S1VqBykbfv0/hqdefault.jpg",
    significado: "Deus me proteja, mas principalmente esse nosso amor."
  },
  {
    titulo: "Vidinha de Balada",
    artista: "Henrique & Juliano",
    youtubeId: "PnAMEe0GGG8",
    capa: "https://i.ytimg.com/vi/PnAMEe0GGG8/hqdefault.jpg",
    significado: "A gente já teve fase balada, agora a melhor fase é a nossa."
  },
  {
    titulo: "Na Hora da Raiva",
    artista: "Henrique & Juliano",
    youtubeId: "X8jD3F9PI7Q",
    capa: "https://i.ytimg.com/vi/X8jD3F9PI7Q/hqdefault.jpg",
    significado: "A gente briga, mas a gente ama mais ainda depois."
  },
  {
    titulo: "Liberdade Provisória",
    artista: "Henrique & Juliano",
    youtubeId: "ff3r10rCKFs",
    capa: "https://i.ytimg.com/vi/ff3r10rCKFs/hqdefault.jpg",
    significado: "Me solta que eu vou, mas volto pra você sempre."
  },
  {
    titulo: "Vidinha de Balcão",
    artista: "Luan Santana",
    youtubeId: "g3lP77Rq5Ao",
    capa: "https://i.ytimg.com/vi/g3lP77Rq5Ao/hqdefault.jpg",
    significado: "A gente não tá no balcão não, tá no altar (ou quase)."
  },
  {
    titulo: "Te Esperando",
    artista: "Luan Santana",
    youtubeId: "Z5pWz_OR5Sg",
    capa: "https://i.ytimg.com/vi/Z5pWz_OR5Sg/hqdefault.jpg",
    significado: "Toda vez que você atrasa, eu fico assim: te esperando."
  },
  {
    titulo: "Meteoro",
    artista: "Luan Santana",
    youtubeId: "A8iwQscRxDY",
    capa: "https://i.ytimg.com/vi/A8iwQscRxDY/hqdefault.jpg",
    significado: "Caí de meteoro por você, e não pretendo levantar."
  },
  {
    titulo: "Esquece o Mundo Lá Fora",
    artista: "Luan Santana",
    youtubeId: "F6eqHfA3bNU",
    capa: "https://i.ytimg.com/vi/F6eqHfA3bNU/hqdefault.jpg",
    significado: "Com você eu esqueço tudo que tá lá fora. Só existe a gente."
  },
  {
    titulo: "Erro Vagabundo",
    artista: "Jorge & Mateus",
    youtubeId: "BEz8l69aI8Y",
    capa: "https://i.ytimg.com/vi/BEz8l69aI8Y/hqdefault.jpg",
    significado: "O meu erro é te amar demais, e eu não quero consertar."
  },
  {
    titulo: "Amo Você",
    artista: "Jorge & Mateus (com Maiara & Maraisa)",
    youtubeId: "OpVo12Y55Yg",
    capa: "https://i.ytimg.com/vi/OpVo12Y55Yg/hqdefault.jpg",
    significado: "Amo você, simples assim."
  },
  {
    titulo: "Logo Logo",
    artista: "Jorge & Mateus",
    youtubeId: "4gmR2XfjztA",
    capa: "https://i.ytimg.com/vi/4gmR2XfjztA/hqdefault.jpg",
    significado: "Logo logo eu tô aí, igual todas as noites."
  },
  {
    titulo: "Sosseguei",
    artista: "Jorge & Mateus",
    youtubeId: "vZcjAmfkemk",
    capa: "https://i.ytimg.com/vi/vZcjAmfkemk/hqdefault.jpg",
    significado: "Achei o sossego que eu procurava: do seu lado."
  },
  {
    titulo: "Propaganda",
    artista: "Jorge & Mateus",
    youtubeId: "mQr7XemLs8s",
    capa: "https://i.ytimg.com/vi/mQr7XemLs8s/hqdefault.jpg",
    significado: "Eu faço propaganda do nosso amor, sempre."
  },
  {
    titulo: "Meio Caminho",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "WaOtWOpOGSw",
    capa: "https://i.ytimg.com/vi/WaOtWOpOGSw/hqdefault.jpg",
    significado: "A gente já fez mais da metade do caminho. Vamos até o fim."
  },
  {
    titulo: "É O Amor",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "Be6ROem9ms8",
    capa: "https://i.ytimg.com/vi/Be6ROem9ms8/hqdefault.jpg",
    significado: "É o amor que me faz levantar todo dia feliz."
  },
  {
    titulo: "Coração Está Em Pedaços",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "M_lo8BHG6no",
    capa: "https://i.ytimg.com/vi/M_lo8BHG6no/hqdefault.jpg",
    significado: "Antes de você, meu coração tava em pedaços. Você juntou."
  },
  {
    titulo: "Pra Não Pensar Em Você",
    artista: "Zezé Di Camargo & Luciano",
    youtubeId: "JPITxZbf5H4",
    capa: "https://i.ytimg.com/vi/JPITxZbf5H4/hqdefault.jpg",
    significado: "Já tentei não pensar, não consigo. É você o tempo todo."
  },
  {
    titulo: "Andar Com Fé",
    artista: "João Bosco & Vinícius",
    youtubeId: "afKp9gKzFQo",
    capa: "https://i.ytimg.com/vi/afKp9gKzFQo/hqdefault.jpg",
    significado: "Andar com fé, com você do lado, é tudo que eu preciso."
  },
  {
    titulo: "Sai da Minha Aba",
    artista: "Gusttavo Lima",
    youtubeId: "rqoBO3Nw2ZM",
    capa: "https://i.ytimg.com/vi/rqoBO3Nw2ZM/hqdefault.jpg",
    significado: "Sai da minha aba não, fica pertinho de mim."
  },
  {
    titulo: "Inventor dos Amores",
    artista: "Gusttavo Lima (com Jorge & Mateus)",
    youtubeId: "_y9OCAzcJVw",
    capa: "https://i.ytimg.com/vi/_y9OCAzcJVw/hqdefault.jpg",
    significado: "Você é o inventor dos meus amores, o único que valeu."
  },

  // ============ MPB E CLÁSSICOS ROMÂNTICOS ============
  {
    titulo: "Anunciação",
    artista: "Alceu Valença",
    youtubeId: "j42byy7G_Ow",
    capa: "https://i.ytimg.com/vi/j42byy7G_Ow/hqdefault.jpg",
    significado: "Você veio pra anunciar o amor na minha vida."
  },
  {
    titulo: "Trem das Cores",
    artista: "Caetano Veloso",
    youtubeId: "kS1zGVi3Uxs",
    capa: "https://i.ytimg.com/vi/kS1zGVi3Uxs/hqdefault.jpg",
    significado: "O trem das nossas memórias passa colorido na minha cabeça."
  },
  {
    titulo: "Tigresa",
    artista: "Caetano Veloso",
    youtubeId: "sSqU6vgs3Dc",
    capa: "https://i.ytimg.com/vi/sSqU6vgs3Dc/hqdefault.jpg",
    significado: "Você é a minha tigresa, mansa e feroz ao mesmo tempo."
  },
  {
    titulo: "O Sal da Terra",
    artista: "Caetano Veloso",
    youtubeId: "wAmtLN4PlLU",
    capa: "https://i.ytimg.com/vi/wAmtLN4PlLU/hqdefault.jpg",
    significado: "Você é o sal da minha terra, dá gosto à vida."
  },
  {
    titulo: "Luz do Sol",
    artista: "Caetano Veloso",
    youtubeId: "wVZ5yejK9GA",
    capa: "https://i.ytimg.com/vi/wVZ5yejK9GA/hqdefault.jpg",
    significado: "Você é a luz do sol que entra na minha janela de manhã."
  },
  {
    titulo: "O Trenzinho do Caipira",
    artista: "Heitor Villa-Lobos",
    youtubeId: "wIG4h7lvj4Y",
    capa: "https://i.ytimg.com/vi/wIG4h7lvj4Y/hqdefault.jpg",
    significado: "A gente tem um ritmo só nosso, igual trenzinho do caipira."
  },
  {
    titulo: "Garota de Ipanema",
    artista: "Tom Jobim & Vinícius",
    youtubeId: "rOAGNjCYprY",
    capa: "https://i.ytimg.com/vi/rOAGNjCYprY/hqdefault.jpg",
    significado: "A garota mais linda que eu vi, é você. ♡"
  },
  {
    titulo: "Águas de Março",
    artista: "Tom Jobim",
    youtubeId: "E1tOV7y94DY",
    capa: "https://i.ytimg.com/vi/E1tOV7y94DY/hqdefault.jpg",
    significado: "A gente tá no fim do verão, mas o amor continua enchendo."
  },
  {
    titulo: "Corcovado",
    artista: "Tom Jobim",
    youtubeId: "wilIgoJ294M",
    capa: "https://i.ytimg.com/vi/wilIgoJ294M/hqdefault.jpg",
    significado: "Em qualquer lugar do mundo, eu penso em você."
  },
  {
    titulo: "Wave",
    artista: "Tom Jobim",
    youtubeId: "w73hEZKnDeA",
    capa: "https://i.ytimg.com/vi/w73hEZKnDeA/hqdefault.jpg",
    significado: "Vem dar uma volta comigo, igual as ondas do mar."
  },
  {
    titulo: "Eu Sei Que Vou Te Amar",
    artista: "Tom Jobim & Vinícius",
    youtubeId: "ec_Jzn0bW8w",
    capa: "https://i.ytimg.com/vi/ec_Jzn0bW8w/hqdefault.jpg",
    significado: "A música mais bonita que já fizeram, e descreve a gente."
  },
  {
    titulo: "Travessia",
    artista: "Milton Nascimento",
    youtubeId: "kDe3qOhrJLo",
    capa: "https://i.ytimg.com/vi/kDe3qOhrJLo/hqdefault.jpg",
    significado: "A travessia mais bonita da minha vida, foi contigo."
  },
  {
    titulo: "Cais",
    artista: "Milton Nascimento",
    youtubeId: "frHaMD7eVfA",
    capa: "https://i.ytimg.com/vi/frHaMD7eVfA/hqdefault.jpg",
    significado: "Você é o meu cais, o lugar onde eu descanso."
  },
  {
    titulo: "Canção da América",
    artista: "Milton Nascimento",
    youtubeId: "t5WzApglqMc",
    capa: "https://i.ytimg.com/vi/t5WzApglqMc/hqdefault.jpg",
    significado: "Amigo é coisa pra se guardar debaixo de 7 chaves. Como você."
  },
  {
    titulo: "Amor I Love You",
    artista: "Marisa Monte",
    youtubeId: "hDJDoF1hXdk",
    capa: "https://i.ytimg.com/vi/hDJDoF1hXdk/hqdefault.jpg",
    significado: "Amor, I love you, em todas as línguas."
  },
  {
    titulo: "Beija Eu",
    artista: "Marisa Monte",
    youtubeId: "rJEzHWNKJoA",
    capa: "https://i.ytimg.com/vi/rJEzHWNKJoA/hqdefault.jpg",
    significado: "Beija eu, beija eu, beija eu. Toda vez que precisar."
  },
  {
    titulo: "Depois",
    artista: "Marisa Monte (com Arnaldo Antunes)",
    youtubeId: "BM-mnklMWCQ",
    capa: "https://i.ytimg.com/vi/BM-mnklMWCQ/hqdefault.jpg",
    significado: "Depois, amanhã, sempre, pra sempre. Com você."
  },
  {
    titulo: "Não É Proibido",
    artista: "Marisa Monte",
    youtubeId: "D05vdXdvJIk",
    capa: "https://i.ytimg.com/vi/D05vdXdvJIk/hqdefault.jpg",
    significado: "Amar você não é proibido, é necessário."
  },
  {
    titulo: "Caminhoneiro",
    artista: "Roberto Carlos (com刘德华)",
    youtubeId: "mvg052EGMqc",
    capa: "https://i.ytimg.com/vi/mvg052EGMqc/hqdefault.jpg",
    significado: "Mesmo longe, eu penso em você em cada estrada."
  },
  {
    titulo: "Lady Laura",
    artista: "Roberto Carlos",
    youtubeId: "8sioAQVcaDQ",
    capa: "https://i.ytimg.com/vi/8sioAQVcaDQ/hqdefault.jpg",
    significado: "Lady Laura, minha lady, é você."
  },
  {
    titulo: "Quero Que Vá Tudo Pro Inferno",
    artista: "Roberto Carlos (com Gal Costa)",
    youtubeId: "8QmmAY-hLf4",
    capa: "https://i.ytimg.com/vi/8QmmAY-hLf4/hqdefault.jpg",
    significado: "Menos o nosso amor. Esse fica."
  },
  {
    titulo: "Emoções",
    artista: "Roberto Carlos",
    youtubeId: "DI-n5j_jGyI",
    capa: "https://i.ytimg.com/vi/DI-n5j_jGyI/hqdefault.jpg",
    significado: "Quando você me olha, é isso que eu sinto."
  },
  {
    titulo: "Jesus Cristo",
    artista: "Roberto Carlos",
    youtubeId: "f9VS9z3L9RQ",
    capa: "https://i.ytimg.com/vi/f9VS9z3L9RQ/hqdefault.jpg",
    significado: "Eu nasci há 10 mil anos atrás e não amei ninguém como você."
  },
  {
    titulo: "Café da Manhã",
    artista: "Roberto Carlos",
    youtubeId: "3VpChkkUX9Y",
    capa: "https://i.ytimg.com/vi/3VpChkkUX9Y/hqdefault.jpg",
    significado: "O melhor café da manhã é quando você tá do meu lado."
  },
  {
    titulo: "Mais Uma Vez",
    artista: "Renato Russo (solo)",
    youtubeId: "H_KHjeR2PUs",
    capa: "https://i.ytimg.com/vi/H_KHjeR2PUs/hqdefault.jpg",
    significado: "Se eu fosse explicar o que sinto, eu diria: mais uma vez."
  },
  {
    titulo: "Vento No Litoral",
    artista: "Legião Urbana",
    youtubeId: "8XbHp0HWJtk",
    capa: "https://i.ytimg.com/vi/8XbHp0HWJtk/hqdefault.jpg",
    significado: "O vento do nosso amor sopra sempre a favor."
  },
  {
    titulo: "Pais e Filhos",
    artista: "Legião Urbana",
    youtubeId: "sfixHYBWaiU",
    capa: "https://i.ytimg.com/vi/sfixHYBWaiU/hqdefault.jpg",
    significado: "A gente construiu uma família linda. Nossos filhos são a gente."
  },
  {
    titulo: "Faroeste Caboclo",
    artista: "Legião Urbana",
    youtubeId: "eL6zdEwRKws",
    capa: "https://i.ytimg.com/vi/eL6zdEwRKws/hqdefault.jpg",
    significado: "A história do João de Santo Cristo é a nossa: cheia de reviravoltas e amor."
  },
  {
    titulo: "Lanterna Dos Afogados",
    artista: "Legião Urbana",
    youtubeId: "trFdRPqjwyk",
    capa: "https://i.ytimg.com/vi/trFdRPqjwyk/hqdefault.jpg",
    significado: "Quando tudo escurece, você é minha lanterna."
  },
  {
    titulo: "Meninos E Meninas",
    artista: "Legião Urbana",
    youtubeId: "mvBaHIGhrX8",
    capa: "https://i.ytimg.com/vi/mvBaHIGhrX8/hqdefault.jpg",
    significado: "Quando a gente se conheceu, era tudo meninos e meninas."
  },
  {
    titulo: "Índios",
    artista: "Legião Urbana",
    youtubeId: "nM_gEzvhsM0",
    capa: "https://i.ytimg.com/vi/nM_gEzvhsM0/hqdefault.jpg",
    significado: "Quem tem amor, tem o resto. A gente tem tudo."
  },
  {
    titulo: "Pessoal Inestimável",
    artista: "Legião Urbana",
    youtubeId: "nM_gEzvhsM0",
    capa: "https://i.ytimg.com/vi/nM_gEzvhsM0/hqdefault.jpg",
    significado: "Você é a pessoa mais inestimável da minha vida."
  },
  {
    titulo: "Sutilmente",
    artista: "Skank",
    youtubeId: "v3SQTOZO36E",
    capa: "https://i.ytimg.com/vi/v3SQTOZO36E/hqdefault.jpg",
    significado: "Você me afetou tão sutilmente que eu nem vi chegar."
  },
  {
    titulo: "Vou Deixar",
    artista: "Skank",
    youtubeId: "j9tAJ3ZyLMY",
    capa: "https://i.ytimg.com/vi/j9tAJ3ZyLMY/hqdefault.jpg",
    significado: "Eu vou deixar você ser feliz, mas com você do meu lado."
  },
  {
    titulo: "Resposta",
    artista: "Skank",
    youtubeId: "81Szobx5SLM",
    capa: "https://i.ytimg.com/vi/81Szobx5SLM/hqdefault.jpg",
    significado: "Você é a resposta de tudo que eu sempre procurei."
  },
  {
    titulo: "Acima do Sol",
    artista: "Skank",
    youtubeId: "2m-vthh7s8U",
    capa: "https://i.ytimg.com/vi/2m-vthh7s8U/hqdefault.jpg",
    significado: "A gente tá acima do sol, acima de tudo."
  },
  {
    titulo: "Tão Bem",
    artista: "Lulu Santos",
    youtubeId: "Y0UcBpKX8pg",
    capa: "https://i.ytimg.com/vi/Y0UcBpKX8pg/hqdefault.jpg",
    significado: "Do seu lado, eu tô tão bem."
  },
  {
    titulo: "Toda Forma de Amor",
    artista: "Lulu Santos",
    youtubeId: "bHHfzKYv32I",
    capa: "https://i.ytimg.com/vi/bHHfzKYv32I/hqdefault.jpg",
    significado: "A gente já passou por toda forma de amor, e tá de pé."
  },
  {
    titulo: "Sereia",
    artista: "Lulu Santos",
    youtubeId: "mEXOXjjVs24",
    capa: "https://i.ytimg.com/vi/mEXOXjjVs24/hqdefault.jpg",
    significado: "Você me enfeitiça igual sereia. ♡"
  },
  {
    titulo: "À Sua Maneira",
    artista: "Capital Inicial (com Seu Jorge)",
    youtubeId: "dxCe0b5vVh8",
    capa: "https://i.ytimg.com/vi/dxCe0b5vVh8/hqdefault.jpg",
    significado: "Tudo que eu quero, é você. Só."
  },
  {
    titulo: "Primeiros Erros",
    artista: "Capital Inicial",
    youtubeId: "qiU_XXucYBE",
    capa: "https://i.ytimg.com/vi/qiU_XXucYBE/hqdefault.jpg",
    significado: "A gente já errou, mas nossos acertos foram maiores."
  },
  {
    titulo: "Natasha",
    artista: "Capital Inicial",
    youtubeId: "FltzZX30XyY",
    capa: "https://i.ytimg.com/vi/FltzZX30XyY/hqdefault.jpg",
    significado: "Cada pessoa que passa na nossa vida, ensina algo. Você me ensinou tudo."
  }
];
