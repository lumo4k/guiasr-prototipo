// Dados enriquecidos da versão v2 (remodelada com base nas pesquisas com viajantes,
// pesquisa com guias de turismo, Boletim ASGUIT 2025 e documentos PNI/PPTU v4).
// Todos os perfis, avaliações e valores são demonstrativos para fins acadêmicos.

export const CANCELLATION_POLICY = [
  { range: '15 dias ou mais de antecedência', refund: '100% de reembolso' },
  { range: 'Entre 7 e 14 dias antes do passeio', refund: '75% de reembolso' },
  { range: 'Entre 3 e 6 dias antes do passeio', refund: '50% de reembolso' },
  { range: 'Menos de 3 dias de antecedência', refund: 'Sem reembolso (0%)' },
  { range: 'Cancelamento pelo guia ou plataforma', refund: '100% do valor pago' }
];

export const MEETING_POINTS = [
  { id: 'hotel', label: 'Hotel ou pousada em São Roque', hint: '60% dos tours privativos iniciam na hospedagem' },
  { id: 'airbnb', label: 'Casa de temporada / Airbnb em São Roque', hint: '24% dos tours privativos iniciam em hospedagens alternativas' },
  { id: 'castello', label: 'Portal Guaçu (Rodovia Castello Branco)', hint: 'Principal acesso de grupos (83% das excursões)' },
  { id: 'rodoviaria', label: 'Rodoviária Municipal / Centro', hint: '7% dos tours privativos' },
  { id: 'outro', label: 'Outro local combinado em São Roque', hint: 'Definido na confirmação com o guia' }
];

export const CIRCUITS_V2 = [
  {
    id: 'Roteiro do Vinho',
    number: '01',
    name: 'Roteiro do Vinho',
    subtitle: 'Vinícolas, adegas, degustações e gastronomia',
    shareHint: 'Circuito mais visitado (76% grupos • 73% privativos)'
  },
  {
    id: 'Centro Histórico',
    number: '02',
    name: 'Centro Histórico',
    subtitle: 'Brasital, Matriz, Estação Ferroviária e Mata da Câmara',
    shareHint: '2º circuito mais procurado por privativos (18%)'
  },
  {
    id: 'Saboó & Castello',
    number: '03',
    name: 'Rota Saboó & Castello',
    subtitle: 'Morro do Saboó, mirantes naturais e natureza',
    shareHint: 'Trilhas, vistas panorâmicas e ecoturismo'
  },
  {
    id: 'Raposo & Darcy Penteado',
    number: '04',
    name: 'Raposo & Darcy Penteado',
    subtitle: 'Sítio Santo Antônio, produtores rurais e apiários',
    shareHint: 'Turismo rural, história e experiências autênticas'
  }
];

export const PROFILES_V2 = [
  { id: 'all', label: 'Todos os perfis' },
  { id: 'Primeira vez', label: 'Primeira vez em São Roque' },
  { id: 'Família', label: 'Em família' },
  { id: 'Romântico', label: 'Romântico / Casal' },
  { id: 'Grupo / Excursão', label: 'Grupo / Excursão' },
  { id: 'Bate-volta econômico', label: 'Bate-volta econômico' }
];

export const GUIDE_SPECIALTY_FILTERS = [
  'Todas',
  'Enoturismo & Gastronomia',
  'Natureza & Trilhas',
  'Cultura & História',
  'Excursões & Grupos',
  'Turismo Rural & Família'
];

export const GUIDES_V2 = {
  'carlos-mendes': {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    specialtyCategory: 'Enoturismo & Gastronomia',
    role: 'Especialista em Enoturismo, Vinícolas e Gastronomia Local',
    shortRole: 'Enoturismo e gastronomia',
    isTopGuide: true,
    isPartner: true,
    partnerLabel: 'Parceiro Oficial GuiaSR',
    quote: '“Cada vinícola de São Roque tem uma história de família. Conduzo o passeio no seu ritmo, sem pressa e sem filas.”',
    bio: 'Perfil demonstrativo criado para o protótipo acadêmico GuiaSR. Especializado no Roteiro do Vinho, harmonizações e roteiros personalizados com retirada em hotéis e pousadas.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês'],
    area: 'Roteiro do Vinho e Centro Histórico',
    experienceYears: '8 anos de atuação (demonstrativo)',
    completedTours: 142,
    rating: 4.9,
    reviewsCount: 38,
    responseTime: 'Responde em até 4h (demo)',
    credentialStatus: 'Cadastur demonstrativo (não verificado neste protótipo)',
    credentialCode: 'DEMO-SP-2025-001',
    hasOwnVehicle: true,
    pricing: {
      privateCompanionHour: 60,
      privateDriverHour: 75,
      privateTypicalTotal: 300,
      groupHalfDay: 260,
      groupFullDay: 450
    },
    modalities: ['Tour privativo (carro próprio ou do guia)', 'Pequenos grupos / Vans', 'Excursões (micro e ônibus)'],
    specialties: [
      { icon: 'leaf', title: 'Roteiro do Vinho', description: 'Degustações orientadas e visitas técnicas' },
      { icon: 'globe', title: 'Cultura regional', description: 'Histórias da imigração italiana e portuguesa' },
      { icon: 'pin', title: 'Gastronomia', description: 'Reservas de almoço em restaurantes típicos' }
    ],
    reviews: [
      {
        author: 'Fernanda S. (demo)',
        date: 'Out/2025',
        rating: 5,
        profile: 'Casal • Tour privativo',
        comment: 'Primeira vez em São Roque. Buscou na pousada no horário combinado e montou paradas sem fila no sábado.'
      },
      {
        author: 'Ricardo M. (demo)',
        date: 'Set/2025',
        rating: 5,
        profile: 'Família • 5 pessoas',
        comment: 'Explicou tudo com clareza antes do passeio, inclusive horários das vinícolas e valores à parte.'
      }
    ]
  },
  'juliana-prado': {
    id: 'juliana-prado',
    name: 'Juliana Prado',
    specialtyCategory: 'Enoturismo & Gastronomia',
    role: 'Especialista em Visitas Técnicas, Harmonizações e Roteiros Românticos',
    shortRole: 'Visitas técnicas e roteiros românticos',
    isTopGuide: true,
    isPartner: true,
    partnerLabel: 'Parceiro Oficial GuiaSR',
    quote: '“Transformo sua visita às adegas em uma experiência intimista, conectando vinhos autorais, mirantes e boa mesa.”',
    bio: 'Perfil demonstrativo focado em passeios privativos para casais e pequenos grupos, com forte atuação em visitas técnicas, caves históricas e atendimento trilíngue.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês', 'Francês'],
    area: 'Roteiro do Vinho e Hospedagens de São Roque',
    experienceYears: '5 anos de atuação (demonstrativo)',
    completedTours: 84,
    rating: 5.0,
    reviewsCount: 29,
    responseTime: 'Responde em até 3h (demo)',
    credentialStatus: 'Cadastur demonstrativo (não verificado neste protótipo)',
    credentialCode: 'DEMO-SP-2025-004',
    hasOwnVehicle: true,
    pricing: {
      privateCompanionHour: 65,
      privateDriverHour: 80,
      privateTypicalTotal: 325,
      groupHalfDay: 280,
      groupFullDay: 470
    },
    modalities: ['Tour privativo romântico', 'Visitas técnicas em vinícolas', 'Atendimento trilíngue'],
    specialties: [
      { icon: 'pin', title: 'Visitas técnicas', description: 'Bastidores de vinificação e caves' },
      { icon: 'globe', title: 'Trilíngue', description: 'Atendimento a visitantes internacionais' },
      { icon: 'leaf', title: 'Roteiros para casais', description: 'Pôr do sol, mirantes e harmonização' }
    ],
    reviews: [
      {
        author: 'Aline & Bruno (demo)',
        date: 'Out/2025',
        rating: 5,
        profile: 'Casal • Tour privativo',
        comment: 'Experiência impecável! Organizou duas visitas técnicas e o almoço com vista para os vinhedos.'
      }
    ]
  },
  'beatriz-nogueira': {
    id: 'beatriz-nogueira',
    name: 'Beatriz Nogueira',
    specialtyCategory: 'Natureza & Trilhas',
    role: 'Especialista em Ecoturismo, Morro do Saboó e Mata da Câmara',
    shortRole: 'Natureza, trilhas e ecoturismo',
    isTopGuide: true,
    isPartner: false,
    partnerLabel: '',
    quote: '“São Roque vai muito além das vinícolas: temos Mata Atlântica preservada, mirantes 360° e trilhas para todos os ritmos.”',
    bio: 'Perfil demonstrativo voltado a ecoturismo, trilhas monitoradas no Morro do Saboó e Mata da Câmara, além de caminhadas interpretativas e atendimento bilíngue.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês', 'Espanhol'],
    area: 'Rota Saboó & Castello e Mata da Câmara',
    experienceYears: '6 anos de atuação (demonstrativo)',
    completedTours: 96,
    rating: 4.9,
    reviewsCount: 24,
    responseTime: 'Responde em até 4h (demo)',
    credentialStatus: 'Cadastur demonstrativo (não verificado neste protótipo)',
    credentialCode: 'DEMO-SP-2025-002',
    hasOwnVehicle: false,
    pricing: {
      privateCompanionHour: 60,
      privateDriverHour: 75,
      privateTypicalTotal: 240,
      groupHalfDay: 240,
      groupFullDay: 420
    },
    modalities: ['Tour privativo (no carro do visitante ou a pé)', 'Pequenos grupos de trilha', 'Atendimento bilíngue'],
    specialties: [
      { icon: 'leaf', title: 'Trilhas e mirantes', description: 'Morro do Saboó e Mata da Câmara' },
      { icon: 'globe', title: 'Atendimento bilíngue', description: 'Inglês e espanhol para visitantes' },
      { icon: 'pin', title: 'Educação ambiental', description: 'Flora, fauna e fotografia de natureza' }
    ],
    reviews: [
      {
        author: 'Lucas P. (demo)',
        date: 'Ago/2025',
        rating: 4.9,
        profile: 'Amigos • Trilha Saboó',
        comment: 'Pontualidade impecável e ótimo planejamento de horários para evitar sol forte na subida.'
      }
    ]
  },
  'rafael-tavares': {
    id: 'rafael-tavares',
    name: 'Rafael Tavares',
    specialtyCategory: 'Excursões & Grupos',
    role: 'Especialista em Excursões, Vans e Logística de Período Integral',
    shortRole: 'Excursões, vans e grupos',
    isTopGuide: false,
    isPartner: true,
    partnerLabel: 'Parceiro Oficial GuiaSR',
    quote: '“Recepciono sua van ou ônibus direto no Portal Guaçu e coordeno café, vinícolas e almoço sem atrasos.”',
    bio: 'Perfil demonstrativo com ampla experiência em turismo receptivo de grupos organizados (vans, micro-ônibus e ônibus), reservas em restaurantes e cronogramas de 8 horas.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    languages: ['Português'],
    area: 'Toda São Roque e circuitos combinados',
    experienceYears: '10 anos de atuação (demonstrativo)',
    completedTours: 210,
    rating: 4.8,
    reviewsCount: 41,
    responseTime: 'Responde em até 5h (demo)',
    credentialStatus: 'Cadastur demonstrativo (não verificado neste protótipo)',
    credentialCode: 'DEMO-SP-2025-003',
    hasOwnVehicle: false,
    pricing: {
      privateCompanionHour: 60,
      privateDriverHour: 75,
      privateTypicalTotal: 300,
      groupHalfDay: 250,
      groupFullDay: 440
    },
    modalities: ['Excursões de ônibus e micro-ônibus', 'Grupos em van', 'Roteiros combinados de 8h'],
    specialties: [
      { icon: 'users', title: 'Gestão de grupos', description: 'Coordenação de até 45 participantes' },
      { icon: 'clock', title: 'Pontualidade', description: 'Recepção na Castello Branco e Raposo' },
      { icon: 'pin', title: 'Gastronomia p/ grupos', description: 'Café da manhã e almoço com reserva' }
    ],
    reviews: [
      {
        author: 'Agência Litoral (demo)',
        date: 'Jul/2025',
        rating: 4.9,
        profile: 'Excursão • 32 pessoas',
        comment: 'Excelente controle de horários no domingo de inverno. O grupo aproveitou tudo sem estresse.'
      }
    ]
  },
  'camila-ferraz': {
    id: 'camila-ferraz',
    name: 'Camila Ferraz',
    specialtyCategory: 'Cultura & História',
    role: 'Especialista em Centro Histórico, Brasital e Roteiros Acessíveis',
    shortRole: 'História, Brasital e acessibilidade',
    isTopGuide: true,
    isPartner: false,
    partnerLabel: '',
    quote: '“Contar a história da Brasital, da Matriz e da ferrovia em ritmo acessível faz toda família se encantar por São Roque.”',
    bio: 'Perfil demonstrativo especializado em patrimônio histórico-cultural, turismo acessível para idosos e crianças, e roteiros econômicos de bate-volta.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês'],
    area: 'Centro Histórico, Brasital e Sítio Santo Antônio',
    experienceYears: '4 anos de atuação (demonstrativo)',
    completedTours: 63,
    rating: 4.9,
    reviewsCount: 18,
    responseTime: 'Responde em até 3h (demo)',
    credentialStatus: 'Cadastur demonstrativo (não verificado neste protótipo)',
    credentialCode: 'DEMO-SP-2025-005',
    hasOwnVehicle: false,
    pricing: {
      privateCompanionHour: 60,
      privateDriverHour: 75,
      privateTypicalTotal: 180,
      groupHalfDay: 220,
      groupFullDay: 400
    },
    modalities: ['Caminhada cultural acessível', 'Tour privativo familiar', 'Bate-volta econômico'],
    specialties: [
      { icon: 'globe', title: 'Patrimônio histórico', description: 'Brasital, Matriz e Estação Ferroviária' },
      { icon: 'users', title: 'Acessibilidade', description: 'Percursos planos adaptados para famílias' },
      { icon: 'pin', title: 'Curiosidades locais', description: 'Narrativa envolvente e didática' }
    ],
    reviews: [
      {
        author: 'Patrícia A. (demo)',
        date: 'Out/2025',
        rating: 5,
        profile: 'Família • Centro Histórico',
        comment: 'Roteiro super acessível para minha mãe. Curiosidades locais incríveis sobre a Brasital.'
      }
    ]
  },
  'marcos-rezende': {
    id: 'marcos-rezende',
    name: 'Marcos Rezende',
    specialtyCategory: 'Turismo Rural & Família',
    role: 'Especialista em Turismo Rural, Alcachofras e Circuito Darcy Penteado',
    shortRole: 'Turismo rural, alcachofras e famílias',
    isTopGuide: false,
    isPartner: true,
    partnerLabel: 'Parceiro Oficial GuiaSR',
    quote: '“Levo famílias para conhecer produtores locais, apiários e a autêntica cozinha da roça longe da lotação.”',
    bio: 'Perfil demonstrativo voltado a experiências rurais nos circuitos Raposo e Darcy Penteado, ideal para famílias que buscam tranquilidade mesmo aos fins de semana.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Espanhol'],
    area: 'Circuitos Raposo, Darcy Penteado e Zona Rural',
    experienceYears: '9 anos de atuação (demonstrativo)',
    completedTours: 118,
    rating: 4.8,
    reviewsCount: 27,
    responseTime: 'Responde em até 6h (demo)',
    credentialStatus: 'Cadastur demonstrativo (não verificado neste protótipo)',
    credentialCode: 'DEMO-SP-2025-006',
    hasOwnVehicle: true,
    pricing: {
      privateCompanionHour: 60,
      privateDriverHour: 75,
      privateTypicalTotal: 270,
      groupHalfDay: 250,
      groupFullDay: 430
    },
    modalities: ['Tour rural privativo', 'Passeios em família', 'Guia motorista'],
    specialties: [
      { icon: 'leaf', title: 'Agricultura familiar', description: 'Alcachofras, mel e produtores locais' },
      { icon: 'pin', title: 'Sítio Santo Antônio', description: 'História bandeirista e arquitetura' },
      { icon: 'users', title: 'Roteiros sem filas', description: 'Alternativas tranquilas nos fins de semana' }
    ],
    reviews: [
      {
        author: 'Helena C. (demo)',
        date: 'Out/2025',
        rating: 5,
        profile: 'Família • Circuito Rural',
        comment: 'Fugimos do trânsito do domingo e conhecemos lugares autênticos com calma.'
      }
    ]
  }
};

export const ROUTES_V2 = [
  {
    slug: 'sabores-da-rota-do-vinho',
    title: 'Sabores da Rota do Vinho',
    subtitle: 'Vinícolas, visitas técnicas e gastronomia em São Roque',
    category: 'Gastronomia',
    circuit: 'Roteiro do Vinho',
    profiles: ['Primeira vez', 'Romântico', 'Família', 'Grupo / Excursão'],
    durationLabel: '5 horas',
    durationLong: 'Aproximadamente 5 horas (4h a 6h no privativo)',
    durationPeriod: '4h a 6h',
    durationHours: 5,
    durationBucket: 'medium',
    experienceType: 'Privativo',
    modalitiesSupported: ['Privativo', 'Grupo / Excursão'],
    language: 'Português / Inglês / Francês',
    featured: true,
    guideId: 'carlos-mendes',
    guideIds: ['carlos-mendes', 'juliana-prado', 'rafael-tavares'],
    rating: 4.9,
    reviewsCount: 31,
    priceFrom: 300,
    priceNote: 'a partir de R$ 300 (guia privativo 5h) • acesso ao roteiro digital gratuito (demo)',
    effort: 'Leve',
    accessible: true,
    accessibilityNote: 'Acessível para mobilidade reduzida na maioria das vinícolas (rampas e estacionamento próximo).',
    transportInfo: 'No carro do visitante, com guia motorista ou em van/ônibus de excursão. Retirada em hotel/pousada disponível.',
    crowdTip: 'Aos domingos e entre maio e agosto (inverno), a Estrada do Vinho tem movimento intenso. Em dias úteis, há menos filas e maior disponibilidade de guias.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Circuito enogastronômico com paradas planejadas, degustações orientadas e reserva de almoço.',
    description: 'Combina as principais vinícolas e adegas de São Roque com contexto histórico, degustações e gastronomia típica. Pode ser seguido de forma autoguiada ou acompanhado por guia profissional.',
    includes: [
      'Planejamento de paradas e horários de funcionamento',
      'Acompanhamento de guia credenciado (na contratação do serviço)',
      'Apoio na reserva de almoço e visitas técnicas (opcional)'
    ],
    excludes: [
      'Consumo de refeições, compras e taxas de degustação nos estabelecimentos',
      'Estacionamento de veículos de excursão (vans costumam ter tarifa reduzida)'
    ],
    highlights: [
      'Visita a vinícolas tradicionais com opção de tour pelos vinhedos',
      'Curiosidades sobre a vitivinicultura e a história italiana/portuguesa local',
      'Roteiro adaptável para primeira visita ou retorno à cidade'
    ],
    curiosity: 'Você sabia? No Boletim ASGUIT 2025, 32% dos tours privativos em São Roque incluem visitas técnicas e degustações orientadas em mais de uma vinícola no mesmo dia.',
    stops: [
      { name: 'Portal / Estrada do Vinho', hours: 'Acesso livre • melhor chegar até 9h30', note: 'Início do circuito e orientação geral' },
      { name: 'Vinhedos e Visita Técnica', hours: '09h30 às 17h00 (ter–dom)', note: 'Tour guiado pelos parreirais e produção' },
      { name: 'Parada Gastronômica (Almoço)', hours: '11h30 às 15h30 (reserva recomendada)', note: 'Culinária típica portuguesa e italiana' },
      { name: 'Adega & Mirante Final', hours: '10h00 às 17h30', note: 'Degustação orientada e compras locais' }
    ],
    mapStops: ['Estrada do Vinho', 'Vinhedos', 'Almoço Típico', 'Adega & Mirante'],
    reviews: [
      { author: 'Mariana L. (demo)', rating: 5, date: 'Out/2025', text: 'Ter os horários de cada vinícola e saber o preço do guia antes facilitou muito o planejamento.' },
      { author: 'João V. (demo)', rating: 4.8, date: 'Set/2025', text: 'Fomos numa sexta-feira seguindo a dica de movimento e aproveitamos tudo sem trânsito.' }
    ]
  },
  {
    slug: 'memorias-de-sao-roque',
    title: 'Memórias do Centro Histórico',
    subtitle: 'Brasital, Igreja Matriz, Estação Ferroviária e patrimônio',
    category: 'Cultura',
    circuit: 'Centro Histórico',
    profiles: ['Primeira vez', 'Família', 'Bate-volta econômico'],
    durationLabel: '3 horas',
    durationLong: 'Aproximadamente 3 horas (manhã ou tarde)',
    durationPeriod: 'Meio período (3h)',
    durationHours: 3,
    durationBucket: 'short',
    experienceType: 'Família',
    modalitiesSupported: ['Privativo', 'Pequenos grupos'],
    language: 'Português / Inglês / Espanhol',
    featured: true,
    guideId: 'camila-ferraz',
    guideIds: ['camila-ferraz', 'carlos-mendes', 'beatriz-nogueira'],
    rating: 4.9,
    reviewsCount: 19,
    priceFrom: 180,
    priceNote: 'a partir de R$ 180 (guia acompanhante 3h) • roteiro digital gratuito (demo)',
    effort: 'Leve',
    accessible: true,
    accessibilityNote: 'Percurso urbano plano e acessível, ideal para famílias com crianças e pessoas idosas.',
    transportInfo: 'Caminhada leve pelo Centro Histórico. Fácil acesso a partir de hotéis centrais ou da Rodoviária.',
    crowdTip: 'Excelente opção para combinar com o Roteiro do Vinho ou para fugir do trânsito de domingo na Estrada do Vinho.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Caminhada cultural acessível pela Brasital, Praça da Matriz, Estação Ferroviária e histórias da cidade.',
    description: 'Mostra o lado histórico e cultural de São Roque além das vinícolas: a antiga fábrica têxtil Brasital, a Estação Ferroviária, praças e casarões que marcaram o desenvolvimento do município.',
    includes: [
      'Roteiro completo com curiosidades históricas de cada marco',
      'Condução em ritmo tranquilo por guia credenciado (serviço opcional)',
      'Dicas de cafés e comércio local no centro'
    ],
    excludes: [
      'Alimentação e compras pessoais',
      'Transporte até o ponto de encontro central'
    ],
    highlights: [
      'Centro Cultural Brasital e trilha urbana arborizada',
      'Arquitetura histórica da Praça da Matriz e Estação Ferroviária',
      'Percurso acessível e econômico para bate-volta'
    ],
    curiosity: 'Você sabia? A Brasital foi fundada em 1890 e hoje abriga um dos maiores espaços culturais e áreas verdes do centro de São Roque.',
    stops: [
      { name: 'Praça da Matriz', hours: 'Acesso livre • Igreja 08h às 18h', note: 'Marco inicial e história da fundação' },
      { name: 'Estação Ferroviária', hours: '09h00 às 17h00', note: 'Memória da Estrada de Ferro Sorocabana' },
      { name: 'Centro Cultural Brasital', hours: '08h00 às 17h00 (ter–dom)', note: 'Arquitetura industrial e jardins históricos' },
      { name: 'Largo Cultural & Café', hours: '09h00 às 18h00', note: 'Parada para lanche da tarde e artesanato' }
    ],
    mapStops: ['Praça da Matriz', 'Estação Ferroviária', 'Brasital', 'Largo Cultural'],
    reviews: [
      { author: 'Patrícia A. (demo)', rating: 5, date: 'Out/2025', text: 'Não sabia que São Roque tinha tanta história fora da rota do vinho. Muito bem organizado.' }
    ]
  },
  {
    slug: 'caminhos-da-mata',
    title: 'Caminhos da Mata da Câmara',
    subtitle: 'Respiro, trilhas leves e biodiversidade preservada',
    category: 'Natureza',
    circuit: 'Centro Histórico',
    profiles: ['Família', 'Bate-volta econômico', 'Primeira vez'],
    durationLabel: '3 horas',
    durationLong: 'Aproximadamente 3 horas (manhã ou tarde)',
    durationPeriod: 'Meio período (3h)',
    durationHours: 3,
    durationBucket: 'short',
    experienceType: 'Pequenos grupos',
    modalitiesSupported: ['Privativo', 'Pequenos grupos'],
    language: 'Português / Inglês',
    featured: true,
    guideId: 'beatriz-nogueira',
    guideIds: ['beatriz-nogueira', 'camila-ferraz', 'marcos-rezende'],
    rating: 4.8,
    reviewsCount: 22,
    priceFrom: 180,
    priceNote: 'a partir de R$ 180 (guia acompanhante 3h) • entrada gratuita no parque',
    effort: 'Moderado',
    accessible: false,
    accessibilityNote: 'Trilha leve em chão batido com trechos inclinados; não recomendada para cadeirantes.',
    transportInfo: 'Acesso fácil de carro próprio ou aplicativo a 10 min do Centro. Estacionamento no local.',
    crowdTip: 'Mais fresco e silencioso entre 08h30 e 11h00. Ótima alternativa gratuita para manhãs de fim de semana.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Trilhas leves em área de Mata Atlântica preservada com mirantes, nascentes e observação de flora.',
    description: 'Percurso guiado pelo Parque Natural Municipal Mata da Câmara, com foco em educação ambiental, descanso em meio à natureza e curiosidades sobre a fauna e flora da região.',
    includes: [
      'Acompanhamento de guia com orientações de trilha e segurança',
      'Paradas interpretativas sobre flora e nascentes locais'
    ],
    excludes: [
      'Transporte até a portaria do parque',
      'Lanches e água (recomenda-se levar garrafa reutilizável)'
    ],
    highlights: [
      'Trilha leve em meio à Mata Atlântica preservada',
      'Pontos de contemplação e descanso sombreados',
      'Curiosidades sobre espécies nativas de São Roque'
    ],
    curiosity: 'Você sabia? A Mata da Câmara possui mais de 120 hectares de mata atlântica preservada a poucos minutos do centro urbano.',
    stops: [
      { name: 'Portaria da Mata da Câmara', hours: '08h00 às 17h00 (ter–dom)', note: 'Briefing inicial e aquecimento' },
      { name: 'Trilha das Nascentes', hours: '08h00 às 16h30', note: 'Interpretação ambiental leve' },
      { name: 'Mirante do Bosque', hours: 'Acesso livre na trilha', note: 'Pausa para fotos e descanso' },
      { name: 'Clareira de Retorno', hours: 'Até 17h00', note: 'Encerramento e dicas de almoço próximo' }
    ],
    mapStops: ['Portaria', 'Nascentes', 'Mirante', 'Retorno'],
    reviews: [
      { author: 'Diego T. (demo)', rating: 4.8, date: 'Set/2025', text: 'Adorei o aviso claro sobre o tipo de terreno e o horário de funcionamento do parque.' }
    ]
  },
  {
    slug: 'dia-completo-excursao-sao-roque',
    title: 'São Roque Completo para Grupos',
    subtitle: 'Período integral (8h) • Rota do Vinho + Centro Histórico',
    category: 'Gastronomia',
    circuit: 'Roteiro do Vinho',
    profiles: ['Grupo / Excursão', 'Primeira vez'],
    durationLabel: '8 horas',
    durationLong: 'Período integral • 8 horas (08h30 às 17h00)',
    durationPeriod: 'Período integral (8h)',
    durationHours: 8,
    durationBucket: 'full',
    experienceType: 'Grupo / Excursão',
    modalitiesSupported: ['Grupo / Excursão'],
    language: 'Português',
    featured: false,
    guideId: 'rafael-tavares',
    guideIds: ['rafael-tavares', 'carlos-mendes', 'marcos-rezende'],
    rating: 4.9,
    reviewsCount: 27,
    priceFrom: 440,
    priceNote: 'a partir de R$ 440 diária integral (8h) • ideal para vans, micro-ônibus e ônibus',
    effort: 'Leve',
    accessible: true,
    accessibilityNote: 'Paradas selecionadas com estrutura para embarque/desembarque de grupos e banheiros acessíveis.',
    transportInfo: 'Recepção do guia no Portal Guaçu (Castello Branco) ou Balança Comercial (Raposo). Veículo fornecido pelo grupo.',
    crowdTip: 'Padrão de 95% das excursões em São Roque: chegada entre 8h e 9h com café da manhã e almoço pré-reservados.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Roteiro de dia inteiro para excursões e vans com recepção na rodovia, café, vinícolas e almoço.',
    description: 'Estruturado para agências, organizadores de excursões e grupos de amigos em van, micro-ônibus ou ônibus. Combina recepção estratégica na rodovia, café da manhã, vinícolas selecionadas, almoço reservado e parada cultural.',
    includes: [
      'Diária integral (8h) de guia local credenciado',
      'Recepção do veículo no Portal Guaçu (Castello Branco)',
      'Coordenação de horários de café da manhã e almoço com reserva'
    ],
    excludes: [
      'Transporte turístico (van/micro/ônibus)',
      'Refeições, ingressos e taxas de estacionamento de excursão'
    ],
    highlights: [
      'Cronograma otimizado das 08h30 às 17h30 sem correria',
      'Combina Roteiro do Vinho com parada no Centro Histórico',
      'Orientação sobre tarifas de estacionamento (vantagem para vans)'
    ],
    curiosity: 'Você sabia? Em 2025, 98% dos grupos atendidos pela ASGUIT almoçaram com reserva na cidade e 60% também incluíram café da manhã.',
    stops: [
      { name: 'Portal Guaçu (Castello Branco)', hours: 'Recepção 08h00–09h00', note: 'Encontro com o guia e café da manhã' },
      { name: 'Vinícola Tradicional + Degustação', hours: '09h30 às 12h00', note: 'Visita guiada e compras' },
      { name: 'Almoço Reservado para Grupo', hours: '12h30 às 14h30', note: 'Restaurante parceiro com reserva prévia' },
      { name: 'Brasital / Feira & Retorno', hours: '15h00 às 17h30', note: 'Parada cultural antes da saída' }
    ],
    mapStops: ['Portal Guaçu', 'Vinícola', 'Almoço', 'Brasital'],
    reviews: [
      { author: 'Agência Litoral (demo)', rating: 5, date: 'Jul/2025', text: 'Pontualidade na recepção da Castello Branco e ótimo controle dos horários do grupo.' }
    ]
  },
  {
    slug: 'trilha-do-morro-do-sabo',
    title: 'Trilha do Morro do Saboó',
    subtitle: 'Altitude, vista panorâmica 360° e desafio moderado',
    category: 'Aventura',
    circuit: 'Saboó & Castello',
    profiles: ['Bate-volta econômico', 'Romântico'],
    durationLabel: '4 horas',
    durationLong: 'Aproximadamente 4 horas (saída pela manhã)',
    durationPeriod: '4h a 6h',
    durationHours: 4,
    durationBucket: 'medium',
    experienceType: 'Pequenos grupos',
    modalitiesSupported: ['Privativo', 'Pequenos grupos'],
    language: 'Português / Inglês',
    featured: false,
    guideId: 'beatriz-nogueira',
    guideIds: ['beatriz-nogueira', 'marcos-rezende', 'carlos-mendes'],
    rating: 4.8,
    reviewsCount: 16,
    priceFrom: 240,
    priceNote: 'a partir de R$ 240 (guia privativo 4h) • ideal para manhãs de tempo firme',
    effort: 'Moderado a intenso',
    accessible: false,
    accessibilityNote: 'Subida íngreme em terreno natural; exige calçado fechado e condicionamento físico moderado.',
    transportInfo: 'Acesso pela região do Saboó (próximo à Castello Branco). Carro próprio ou transporte combinado.',
    crowdTip: 'Melhor realizado entre 07h30 e 11h30 para evitar calor intenso e neblina de fim de tarde.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Subida monitorada ao cartão-postal natural de São Roque com vista 360° dos vales da região.',
    description: 'Experiência de ecoturismo na Rota Turística Saboó & Castello, voltada a quem busca natureza, fotografia de paisagem e segurança com orientação de guia local.',
    includes: [
      'Acompanhamento de guia experiente em trilhas locais',
      'Orientações de segurança, hidratação e paradas estratégicas'
    ],
    excludes: [
      'Transporte até a base do Morro do Saboó',
      'Alimentação e equipamentos pessoais'
    ],
    highlights: [
      'Subida monitorada em ritmo adaptado ao grupo',
      'Vista panorâmica de 360° da Serra e vales de São Roque',
      'Curiosidades sobre geografia e lendas locais do Saboó'
    ],
    curiosity: 'Você sabia? O Morro do Saboó chega a cerca de 1.000 metros de altitude e é um dos principais marcos geográficos visíveis da Rodovia Castello Branco.',
    stops: [
      { name: 'Base do Morro do Saboó', hours: 'Saída recomendada 08h00', note: 'Briefing de segurança e alongamento' },
      { name: 'Trecho de Mata', hours: 'Percurso ~1h15', note: 'Subida sombreada em ritmo constante' },
      { name: 'Pedra do Mirante', hours: 'Pausa panorâmica', note: 'Vista para o vale e fotos' },
      { name: 'Cume Panorâmico', hours: 'Retorno até 12h00', note: 'Vista 360° e descida guiada' }
    ],
    mapStops: ['Base', 'Mata', 'Mirante', 'Cume'],
    reviews: [
      { author: 'Thiago F. (demo)', rating: 4.8, date: 'Ago/2025', text: 'Ter a informação real de dificuldade e horário ideal evitou qualquer surpresa na subida.' }
    ]
  },
  {
    slug: 'mesa-da-roca-e-alcachofras',
    title: 'Roteiro Rural: Alcachofras & Sítio Santo Antônio',
    subtitle: 'Produtores locais, história bandeirista e gastronomia afetiva',
    category: 'Gastronomia',
    circuit: 'Raposo & Darcy Penteado',
    profiles: ['Família', 'Romântico', 'Primeira vez'],
    durationLabel: '4h30',
    durationLong: 'Aproximadamente 4h30 (manhã e almoço)',
    durationPeriod: '4h a 6h',
    durationHours: 4.5,
    durationBucket: 'medium',
    experienceType: 'Privativo',
    modalitiesSupported: ['Privativo', 'Pequenos grupos'],
    language: 'Português / Espanhol',
    featured: false,
    guideId: 'marcos-rezende',
    guideIds: ['marcos-rezende', 'juliana-prado', 'camila-ferraz'],
    rating: 4.9,
    reviewsCount: 14,
    priceFrom: 270,
    priceNote: 'a partir de R$ 270 (guia privativo 4h30) • sazonalidade forte na primavera',
    effort: 'Leve',
    accessible: true,
    accessibilityNote: 'Áreas rurais com acesso facilitado para carros e pisos nivelados nas áreas de alimentação.',
    transportInfo: 'Ideal para carro particular ou guia motorista (retirada em hotel, pousada ou casa de temporada).',
    crowdTip: 'Circuito tranquilo mesmo nos fins de semana, excelente para quem quer fugir da lotação da Estrada do Vinho.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Combina o histórico Sítio Santo Antônio com produtores rurais de alcachofra, mel e cozinha da roça.',
    description: 'Um convite para descobrir os circuitos Darcy Penteado e Raposo: patrimônio histórico do século XVII, agricultura familiar, apiários e receitas tradicionais de São Roque.',
    includes: [
      'Acompanhamento de guia local e histórias da região',
      'Organização das visitas a produtores e reserva de almoço'
    ],
    excludes: [
      'Almoço e compras nos empórios rurais',
      'Transporte (opcional via guia motorista)'
    ],
    highlights: [
      'Visita ao conjunto histórico do Sítio Santo Antônio',
      'Contato direto com produtores de alcachofra e apiários',
      'Circuito alternativo com baixo movimento aos fins de semana'
    ],
    curiosity: 'Você sabia? São Roque é nacionalmente conhecida como a Terra do Vinho e da Alcachofra, com colheita celebrada tradicionalmente na primavera.',
    stops: [
      { name: 'Sítio Santo Antônio', hours: '09h00 às 16h30 (ter–dom)', note: 'Casa bandeirista e capela histórica' },
      { name: 'Produtor de Alcachofras', hours: '09h30 às 17h00', note: 'Cultivo sazonal e degustação' },
      { name: 'Cozinha Rural (Almoço)', hours: '12h00 às 15h00', note: 'Pratos típicos com ingredientes locais' },
      { name: 'Apiário & Empório', hours: '10h00 às 17h00', note: 'Mel, compotas e produtos artesanais' }
    ],
    mapStops: ['Sítio Santo Antônio', 'Alcachofras', 'Cozinha Rural', 'Empório'],
    reviews: [
      { author: 'Helena C. (demo)', rating: 5, date: 'Out/2025', text: 'Fugimos do trânsito do domingo e conhecemos lugares autênticos com calma.' }
    ]
  }
];
