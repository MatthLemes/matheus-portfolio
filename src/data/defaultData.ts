import { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  name: "Matheus Lemes",
  headline: "Analista de Marketing | Automação · CRM · Conteúdo · IA Aplicada",
  about: "Tenho 25 anos, estudante de Gestão Comercial pela FGV e profissional Analista de Marketing com experiência em automação de CRM, gestão de redes sociais e produção de conteúdo estratégico. Combino visão analítica e repertório criativo, formado em Design Gráfico, com extensão em Design Centrado no Usuário para entregar campanhas que geram resultados mensuráveis. \n\nHoje, busco desafios em organizações onde eu possa continuar evoluindo como profissional, contribuir para decisões estratégicas e, ao longo da minha carreira, construir uma trajetória de liderança baseada em conhecimento, colaboração e desenvolvimento de pessoas.",
  location: "São Paulo, SP",
  email: "matheusribeirolemes15@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/matheus-lemes-designer/",
    behance: "https://www.behance.net/matheuslemes1",
    medium: "https://medium.com/@matheusribeirolemes15",
    email: "matheusribeirolemes15@gmail.com"
  },
  experiences: [
    {
      id: "exp-1",
      role: "Analista de Comunicação e Marketing Pleno",
      company: "Fellini Group",
      location: "Porto Alegre, RS (Remoto)",
      period: "Jul 2025 – Set 2025",
      highlights: [
        "Aumentou o CTR em +40% com otimização de fluxos no RD Station Marketing, sem incremento de budget.",
        "Crescimento mensal de +35% no engajamento nas redes sociais por meio de estratégia de conteúdo e análise semanal de dados.",
        "Produziu materiais gráficos institucionais para congressos multissetoriais de saúde, nacionais e internacionais em território brasileiro — incluindo Inter-Noise 2025 (700 especialistas) e outros eventos de grande porte.",
        "Gerenciou comunicação para base de +2.000 clientes, garantindo consistência de marca e relevância das mensagens."
      ]
    },
    {
      id: "exp-2",
      role: "Analista de Comunicação e Marketing Júnior",
      company: "Fellini Group",
      location: "Porto Alegre, RS (Remoto)",
      period: "Fev 2025 – Jul 2025",
      highlights: [
        "Operação diária de redes sociais, produção de conteúdo e suporte em eventos internacionais.",
        "Adaptação de peças bilíngues (PT/EN) e implementação de fluxos de automação de marketing."
      ]
    },
    {
      id: "exp-3",
      role: "Designer Gráfico — Estágio no Setor Público",
      company: "CIEE · Prefeitura de Votorantim, SP",
      location: "Votorantim, SP",
      period: "Jan 2022 – Jun 2022",
      highlights: [
        "Desenvolveu sistemas de identidade visual ainda utilizados como padrão institucional pela Prefeitura."
      ]
    },
    {
      id: "exp-4",
      role: "Atendimento ao Cliente e Suporte Operacional",
      company: "LATAM Airlines (via LIQ Corp)",
      location: "João Pessoa, PB",
      period: "Out 2019 – Fev 2021",
      highlights: [
        "Premiado por excelência no atendimento — resolução de problemas complexos em alta demanda com metas de qualidade cumpridas.",
        "Alocado no turno da manhã — horário de maior concorrência interna, reservado aos operadores de melhor desempenho na operação de +1.200 funcionários.",
        "Suporte em vendas para uma das maiores aéreas da América Latina."
      ]
    }
  ],
  education: [
    {
      id: "edu-fgv",
      degree: "Gestão Comercial",
      institution: "FGV — Fundação Getúlio Vargas",
      period: "2027 – 2029",
      type: "Graduação"
    },
    {
      id: "edu-1",
      degree: "Design Centrado no Usuário (Extensão)",
      institution: "PUCRS — Pontifícia Universidade Católica do RS",
      period: "Jun 2026",
      type: "Extensão Universitária"
    },
    {
      id: "edu-2",
      degree: "UX/UI Designer (Profissionalizante)",
      institution: "EBAC – Escola Britânica de Artes Criativas",
      period: "2023",
      type: "Formação Profissionalizante"
    },
    {
      id: "edu-3",
      degree: "Tecnólogo em Design Gráfico",
      institution: "IFPB — Instituto Federal de Educação, Ciência e Tecnologia da Paraíba",
      period: "2022",
      type: "Graduação Tecnológica"
    },
    {
      id: "edu-4",
      degree: "Técnico em Administração",
      institution: "ETEC de Piedade",
      period: "2018",
      type: "Ensino Técnico"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Conferência de Carreira Na Prática (2026)",
      organization: "Fundação Estudar / Na Prática",
      year: "2026",
      description: "Selecionado entre 11.000 inscritos. Produziu vlog sobre o processo de seleção e a experiência no evento, publicado na página oficial do Na Prática. Exposição a líderes de empresas como Amazon, Unilever, Nestlé, Zamp, Itaú, Bradesco,读 Cora, Riachuelo, Stone, Sabesp, Shopee e Bain & Company.",
      badge: "Top 11.000 inscritos"
    },
    {
      id: "ach-2",
      title: "Desafio Gen I.A — iFood (2026)",
      organization: "iFood",
      year: "2026",
      description: "Desenvolvimento de soluções com IA Generativa para otimização de fluxos em marketplace real."
    },
    {
      id: "ach-3",
      title: "CEO for a Month — Adecco (2025)",
      organization: "Grupo Adecco",
      year: "2025",
      description: "Selecionado para programa de liderança executiva; aplicou ICE Score e análise de dados para priorização estratégica."
    },
    {
      id: "ach-4",
      title: "Voluntariado Estratégico — SES-CRT SP",
      organization: "SES-CRT SP",
      year: "2023 – Atual",
      description: "Atuação em fóruns de saúde pública e direitos humanos, desenvolvendo liderança e comunicação institucional."
    }
  ],
  skills: [
    {
      category: "Marketing Digital",
      items: [
        "RD Station",
        "Google Analytics",
        "SEO/SEM",
        "Automação de Marketing",
        "Gestão de Redes Sociais"
      ]
    },
    {
      category: "Design & UX/UI",
      items: [
        "Figma",
        "Adobe Suite (Ps/Ai/Id)",
        "Identidade Visual",
        "Prototipagem",
        "Design Thinking"
      ]
    },
    {
      category: "IA & Dados",
      items: [
        "ChatGPT",
        "Copilot",
        "Prompt Engineering",
        "Python",
        "Excel Avançado"
      ]
    },
    {
      category: "Soft Skills",
      items: [
        "Comunicação estratégica",
        "Liderança",
        "Gestão de projetos",
        "Trabalho remoto"
      ]
    }
  ],
  certifications: [
    {
      name: "Rhetoric: The Art of Persuasive Writing and Public Speaking",
      issuer: "Harvard",
      year: "2026"
    },
    {
      name: "Prompt Engineering for ChatGPT",
      issuer: "Vanderbilt University",
      year: "2025"
    },
    {
      name: "Google Analytics (Certificação Profissional)",
      issuer: "Google",
      year: "2025"
    },
    {
      name: "RD Station Marketing na Prática",
      issuer: "RD University",
      year: "2025"
    },
    {
      name: "Microsoft Copilot & IA Generativa",
      issuer: "Santander / LinkedIn",
      year: "2025"
    },
    {
      name: "Build Wireframes and Low-Fidelity Prototypes",
      issuer: "Google",
      year: "2025"
    },
    {
      name: "Introdução à Ciência de Dados",
      issuer: "Santander / IE University",
      year: "2024"
    },
    {
      name: "UX Process (Empathize, Define, Ideate)",
      issuer: "Google",
      year: "2024"
    },
    {
      name: "Enterprise Design Thinking Practitioner & Co-Creator",
      issuer: "IBM",
      year: "2023"
    }
  ],
  languages: [
    {
      language: "Inglês",
      proficiency: "B2 Upper-Intermediate",
      score: "EF SET 67/100 (2025)"
    },
    {
      language: "Português",
      proficiency: "Nativo"
    }
  ],
  embeddedProjects: [
    {
      id: "emb-1790459806860",
      title: "Analista de Comunicação e Marketing",
      category: "Identidade Visual",
      embedCodeOrUrl: "<iframe src=\"https://www.behance.net/embed/project/234133589?ilo0=1\" height=\"316\" width=\"404\" allowfullscreen lazyload frameborder=\"0\" allow=\"clipboard-write\" refererPolicy=\"strict-origin-when-cross-origin\"></iframe>",
      description: "",
      externalUrl: "https://www.behance.net/gallery/234133589",
      tags: ["Behance", "Identidade Visual"]
    },
    {
      id: "emb-1790459769300",
      title: "Estágio | Projetos",
      category: "Identidade Visual",
      embedCodeOrUrl: "<iframe src=\"https://www.behance.net/embed/project/155068125?ilo0=1\" height=\"316\" width=\"404\" allowfullscreen lazyload frameborder=\"0\" allow=\"clipboard-write\" refererPolicy=\"strict-origin-when-cross-origin\"></iframe>",
      description: "",
      externalUrl: "https://www.behance.net/gallery/155068125",
      tags: ["Behance", "Identidade Visual"]
    },
    {
      id: "emb-1790457656942",
      title: "Identidade Visual & Branding",
      category: "Identidade Visual",
      embedCodeOrUrl: "<iframe src=\"https://www.behance.net/embed/project/252464915?ilo0=1\" height=\"316\" width=\"404\" allowfullscreen lazyload frameborder=\"0\" allow=\"clipboard-write\" refererPolicy=\"strict-origin-when-cross-origin\"></iframe>",
      description: "",
      externalUrl: "https://www.behance.net/gallery/252464915",
      tags: ["Behance", "Identidade Visual"]
    },
    {
      id: "emb-2",
      title: "Logomarca 2023",
      description: "Estudo e criação de logomarca e identidade visual publicado no Behance.",
      category: "Identidade Visual & Branding",
      embedCodeOrUrl: "<iframe src=\"https://www.behance.net/embed/project/234094405?ilo0=1\" height=\"316\" width=\"404\" allowfullscreen lazyload frameborder=\"0\" allow=\"clipboard-write\" refererPolicy=\"strict-origin-when-cross-origin\"></iframe>",
      externalUrl: "https://www.behance.net/gallery/234094405",
      tags: ["Behance", "Logomarca", "Identidade Visual"]
    },
    {
      id: "emb-256368613",
      title: "TCC - Guia Informacional",
      description: "Projeto de graduação com design editorial e guia informacional publicado no Behance.",
      category: "Design Editorial & Informacional",
      embedCodeOrUrl: "<iframe src=\"https://www.behance.net/embed/project/256368613?ilo0=1\" height=\"316\" width=\"404\" allowfullscreen lazyload frameborder=\"0\" allow=\"clipboard-write\" refererPolicy=\"strict-origin-when-cross-origin\"></iframe>",
      externalUrl: "https://www.behance.net/gallery/256368613/TCC-Guia-Informacional",
      tags: ["Behance", "Design Editorial", "TCC"]
    }
  ],
  spotifyPlaylists: [
    {
      id: "spot-meu-futuro",
      title: "Meu Futuro",
      subtitle: "De onde eu vim, e a onde eu vou!",
      embedUrlOrCode: "https://open.spotify.com/embed/playlist/5OwILCZlYn5SzlS9VG3AkG?utm_source=generator",
      externalUrl: "https://open.spotify.com/playlist/5OwILCZlYn5SzlS9VG3AkG"
    },
    {
      id: "spot-1790461077430",
      title: "Bjork: Mixed",
      subtitle: "Da Islândia pro mundo, gosto muito dela",
      embedUrlOrCode: "https://open.spotify.com/embed/playlist/4tx4HFJwlP1vGsED0P4wb7?utm_source=generator&si=5a15385758354221",
      externalUrl: "https://open.spotify.com/playlist/4tx4HFJwlP1vGsED0P4wb7"
    },
    {
      id: "spot-1790460722714",
      title: "Summer Eletrohits: Mixed",
      subtitle: "Porque a ida até o trabalho tem que ser animada né?",
      embedUrlOrCode: "https://open.spotify.com/embed/playlist/00obTXkkM1GneCmmKaCxQK?utm_source=generator&si=98f1281ecd0842f3",
      externalUrl: "https://open.spotify.com/playlist/00obTXkkM1GneCmmKaCxQK"
    },
    {
      id: "spot-1790460673091",
      title: "Marina Sena: Mixed",
      subtitle: "Uma das minhas artistas brasileiras favoritas",
      embedUrlOrCode: "https://open.spotify.com/embed/playlist/7GAwfB2TAlhWGasN61QOHP?utm_source=generator&si=ac6a843bc4844797",
      externalUrl: "https://open.spotify.com/playlist/7GAwfB2TAlhWGasN61QOHP"
    },
    {
      id: "spot-1790457843373",
      title: "Gotye: MIXED",
      subtitle: "meu cantor favorito",
      embedUrlOrCode: "https://open.spotify.com/embed/playlist/7cmKUN4ZVVme5Ewx0sJeFb?utm_source=generator&si=97e8d9cb6ec64b4e",
      externalUrl: "https://open.spotify.com/playlist/7cmKUN4ZVVme5Ewx0sJeFb"
    }
  ],
  compactPoems: [
    {
      id: "poem-1790462311376",
      title: "Bela Vista",
      excerpt: "\"Essa cidade é muito convidativa\nFloresce miúda e vermelha, lanterna chinesa\"",
      mediumUrl: "https://medium.com/@lemure/bella-vista-93718966e77b",
      date: "Recente"
    },
    {
      id: "poem-1790462001169",
      title: "Ocaso e o acaso",
      excerpt: "\"Me visto da classe de bicho\nQue não cabe em gaiola\nQue se olha livre, o poeta poente\nSem ordem, sem classe, oxente\"",
      mediumUrl: "https://medium.com/@lemure/ocaso-e-o-acaso-7747717de7d2",
      date: "Recente"
    },
    {
      id: "poem-1790461273785",
      title: "Amoras",
      excerpt: "\"E que possamos encontrar em nós mesmos\nO amor que amorou, em toda a sua medida.\"",
      mediumUrl: "https://medium.com/@lemure/amoras-32216fceed9e",
      date: "Recente"
    },
    {
      id: "poem-1790461121314",
      title: "Ainda sem título, mas é sobre você",
      excerpt: "\"Não há a menor dúvida.\nHá uma doçura infantil no ar, a quietude de uma espera tão certa quanto a chegada de um arcano.\nOs olhos estão ternos e meigos;\nEmbora a gente não veja, está sorrindo.\"",
      mediumUrl: "https://medium.com/@lemure/ainda-sem-t%C3%ADtulo-mas-%C3%A9-sobre-voc%C3%AA-8d30a39ce9a2",
      date: "Recente"
    }
  ],
  linkedInHighlights: [
    {
      id: "li-1790460578595",
      title: "Carreira de Excelência - Na Prática",
      snippet: "Bolsista | falamos sobre protagonismo, locus de controle, networking, desenvolvimento e ambição",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7508143077077909505?collapsed=1",
      embedCode: "<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7508143077077909505?collapsed=1\" height=\"566\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Publicação incorporada\"></iframe>",
      tag: "Conquista & Carreira",
      date: "2026"
    },
    {
      id: "li-1790460477555",
      title: "Certificado Harvard University",
      snippet: "Bolsista do curso de retórica e comunicação persuasiva.",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7500902587936768000?collapsed=1",
      embedCode: "<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7500902587936768000?collapsed=1\" height=\"566\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Publicação incorporada\"></iframe>",
      tag: "Conquista & Carreira",
      date: "2026"
    },
    {
      id: "li-1790460400522",
      title: "Conferência Na Prática",
      snippet: "Selecionado para um evento com exposição para grandes empresas",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7492734640831606784?collapsed=1",
      embedCode: "<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7492734640831606784?collapsed=1\" height=\"627\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Publicação incorporada\"></iframe>",
      tag: "Conquista & Carreira",
      date: "2026"
    },
    {
      id: "li-1790460244154",
      title: "Certificação Google Analytics",
      snippet: "Certificação Profissional do Google em Análise de Métricas.",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7394728542279729153?collapsed=1",
      embedCode: "<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:share:7394728542279729153?collapsed=1\" height=\"574\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Publicação incorporada\"></iframe>",
      tag: "Conquista & Carreira",
      date: "2025"
    },
    {
      id: "li-1790460077507",
      title: "Palestra para jovens do interior",
      snippet: "Compartilhamento de trajetórias e incentivo à qualificação e tecnologia.",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7376760098469269504?collapsed=1",
      embedCode: "<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:share:7376760098469269504?collapsed=1\" height=\"547\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Publicação incorporada\"></iframe>",
      tag: "Conquista & Carreira",
      date: "2025"
    },
    {
      id: "li-1790459984668",
      title: "Uma história que moldou minha carreira",
      snippet: "Reflexão sobre persistência, superação e desenvolvimento profissional.",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7399535967675592705?collapsed=1",
      embedCode: "<iframe src=\"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7399535967675592705?collapsed=1\" height=\"566\" width=\"504\" frameborder=\"0\" allowfullscreen=\"\" title=\"Publicação incorporada\"></iframe>",
      tag: "Conquista & Carreira",
      date: "2019 - 2022"
    }
  ]
};
