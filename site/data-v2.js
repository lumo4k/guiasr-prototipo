// Dados enriquecidos da versão v2 (remodelada com base nas pesquisas com viajantes,
// pesquisa com guias de turismo e Boletim ASGUIT 2025).
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

export const GUIDES_V2 = {
  'carlos-mendes': {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    role: 'Guia demonstrativo • Enoturismo, Gastronomia e Cultura',
    shortRole: 'Enoturismo e cultura regional',
    quote: '“Gosto de apresentar as histórias por trás de cada vinícola e ajustar o ritmo para que o visitante aproveite sem pressa.”',
    bio: 'Perfil demonstrativo criado para o protótipo acadêmico GuiaSR. Ilustra como um guia profissional apresenta sua experiência, modalidades de atendimento, valores transparentes e avaliações antes da solicitação.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês'],
    area: 'São Roque e circuitos regionais',
    experienceYears: '8 anos de atuação (demonstrativo)',
    completedTours: 142,
    rating: 4.9,
    reviewsCount: 38,
    responseTime: 'Responde em até 6h (demonstrativo)',
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
      { icon: 'globe', title: 'Cultura e história', description: 'Brasital, Matriz e formação local' },
      { icon: 'pin', title: 'Gastronomia', description: 'Reservas de almoço e produtores locais' }
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
  'beatriz-nogueira': {
    id: 'beatriz-nogueira',
    name: 'Beatriz Nogueira',
    role: 'Guia demonstrativa • Natureza, Trilhas e Turismo Cultural',
    shortRole: 'Natureza, trilhas e patrimônio',
    quote: '“São Roque vai muito além da Estrada do Vinho: temos mata atlântica, mirantes e casarões cheios de memória.”',
    bio: 'Perfil demonstrativo criado para mostrar diversidade de especialidades e idiomas no GuiaSR. Focada em passeios ao ar livre, turismo histórico-cultural e atendimento a famílias e visitantes internacionais.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês', 'Espanhol'],
    area: 'Centro Histórico, Saboó e Mata da Câmara',
    experienceYears: '6 anos de atuação (demonstrativo)',
    completedTours: 96,
    rating: 4.8,
    reviewsCount: 24,
    responseTime: 'Responde em até 4h (demonstrativo)',
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
    modalities: ['Tour privativo (no carro do visitante ou a pé)', 'Pequenos grupos / Vans', 'Atendimento bilíngue'],
    specialties: [
      { icon: 'leaf', title: 'Ecoturismo e trilhas', description: 'Morro do Saboó e Mata da Câmara' },
      { icon: 'globe', title: 'Atendimento bilíngue', description: 'Inglês e espanhol para visitantes' },
      { icon: 'pin', title: 'Patrimônio histórico', description: 'Centro Histórico e Sítio Santo Antônio' }
    ],
    reviews: [
      {
        author: 'Camila R. (demo)',
        date: 'Out/2025',
        rating: 5,
        profile: 'Família • Centro Histórico',
        comment: 'Roteiro super acessível para minha mãe. Curiosidades locais incríveis sobre a Brasital.'
      },
      {
        author: 'Lucas P. (demo)',
        date: 'Ago/2025',
        rating: 4.8,
        profile: 'Amigos • Trilha Saboó',
        comment: 'Pontualidade impecável e ótimo planejamento de horários para evitar sol forte na subida.'
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
    language: 'Português / Inglês',
    featured: true,
    guideId: 'carlos-mendes',
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
    guideId: 'beatriz-nogueira',
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
    guideId: 'carlos-mendes',
    rating: 4.9,
    reviewsCount: 27,
    priceFrom: 450,
    priceNote: 'R$ 450 diária integral de guia (8h) • ideal para vans, micro-ônibus e ônibus',
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
    language: 'Português',
    featured: false,
    guideId: 'carlos-mendes',
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
