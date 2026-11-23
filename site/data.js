export const GUIDES = {
  'carlos-mendes': {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    role: 'Guia demonstrativo de turismo cultural e gastronômico',
    shortRole: 'Turismo cultural e gastronomia',
    quote: '“Gosto de apresentar os detalhes que tornam cada caminho especial.”',
    bio: 'Carlos é um perfil criado para este protótipo acadêmico. Sua apresentação ilustra como turistas poderiam conhecer especialidades, idiomas e experiências antes de fazer uma solicitação.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    languages: ['Português', 'Inglês intermediário'],
    pricePerGroup: 180,
    area: 'São Roque e região',
    experience: 'Informação demonstrativa',
    credential: 'Não verificada neste protótipo',
    specialties: [
      {
        icon: 'leaf',
        title: 'Turismo rural',
        description: 'Paisagens e modos de vida locais'
      },
      {
        icon: 'globe',
        title: 'Cultura regional',
        description: 'Histórias e patrimônio'
      },
      {
        icon: 'pin',
        title: 'Gastronomia',
        description: 'Sabores e tradições'
      }
    ]
  }
};

export const ROUTES = [
  {
    slug: 'sabores-da-rota-do-vinho',
    title: 'Sabores da Rota do Vinho',
    subtitle: 'Tradição, paisagens e sabores',
    category: 'Gastronomia',
    durationLabel: '5 horas',
    durationLong: 'Aproximadamente 5 horas',
    durationPeriod: 'Meio período',
    durationHours: 5,
    experienceType: 'Pequenos grupos',
    language: 'Português',
    featured: true,
    guideId: 'carlos-mendes',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Uma jornada demonstrativa entre paisagens, sabores regionais e tradição.',
    description: 'Uma experiência demonstrativa que combina a paisagem rural de São Roque com paradas gastronômicas e histórias da cultura regional.',
    highlights: [
      'Paisagens rurais e áreas de cultivo',
      'Paradas gastronômicas demonstrativas',
      'Contexto histórico e cultural da região'
    ],
    mapStops: ['Estrada do Vinho', 'Vinhedos e Mirante', 'Parada Gastronômica', 'Centro Histórico']
  },
  {
    slug: 'caminhos-da-mata',
    title: 'Caminhos da Mata',
    subtitle: 'Respiro, trilhas e biodiversidade',
    category: 'Natureza',
    durationLabel: '3 horas',
    durationLong: 'Aproximadamente 3 horas',
    durationPeriod: 'Manhã ou tarde',
    durationHours: 3,
    experienceType: 'Pequenos grupos',
    language: 'Português',
    featured: true,
    guideId: 'carlos-mendes',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Trilhas leves e contemplação da natureza em um percurso guiado.',
    description: 'Um percurso demonstrativo por áreas de mata atlântica preservada em São Roque, pensado para quem busca contato tranquilo com a natureza.',
    highlights: [
      'Trilha leve em meio à mata preservada',
      'Pontos de contemplação e descanso',
      'Curiosidades sobre flora e fauna locais'
    ],
    mapStops: ['Portal da Trilha', 'Mirante do Bosque', 'Nascente', 'Clairiere de Retorno']
  },
  {
    slug: 'memorias-de-sao-roque',
    title: 'Memórias de São Roque',
    subtitle: 'Histórias, arquitetura e identidade',
    category: 'Cultura',
    durationLabel: '2h30',
    durationLong: 'Aproximadamente 2h30',
    durationPeriod: 'Período curto',
    durationHours: 2.5,
    experienceType: 'Família',
    language: 'Português',
    featured: true,
    guideId: 'carlos-mendes',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Um passeio ilustrativo por histórias, arquitetura e cultura local.',
    description: 'Caminhada cultural demonstrativa apresentando casarões históricos, praças e marcos que ajudam a contar a formação de São Roque.',
    highlights: [
      'Arquitetura histórica e casarões antigos',
      'Relatos sobre a formação cultural da cidade',
      'Percurso acessível em ritmo tranquilo'
    ],
    mapStops: ['Praça da Matriz', 'Casarão Histórico', 'Estação Ferroviária', 'Largo Cultural']
  },
  {
    slug: 'trilha-do-morro-do-sabo',
    title: 'Trilha do Morro do Saboó',
    subtitle: 'Altitude, vista panorâmica e desafio leve',
    category: 'Aventura',
    durationLabel: '4 horas',
    durationLong: 'Aproximadamente 4 horas',
    durationPeriod: 'Meio período',
    durationHours: 4,
    experienceType: 'Pequenos grupos',
    language: 'Português',
    featured: false,
    guideId: 'carlos-mendes',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Subida guiada demonstrativa com vista panorâmica para os vales da região.',
    description: 'Experiência demonstrativa voltada a quem aprecia caminhadas de intensidade moderada e vistas amplas do relevo de São Roque.',
    highlights: [
      'Subida monitorada em ritmo constante',
      'Vista panorâmica de 360° da região',
      'Orientações de segurança e paradas estratégicas'
    ],
    mapStops: ['Base do Morro', 'Trecho de Mata', 'Pedra do Mirante', 'Cume Panorâmico']
  },
  {
    slug: 'mesa-da-roca-e-alcachofras',
    title: 'Mesa da Roça e Alcachofras',
    subtitle: 'Sabores sazonais e produtores locais',
    category: 'Gastronomia',
    durationLabel: '3h30',
    durationLong: 'Aproximadamente 3h30',
    durationPeriod: 'Manhã',
    durationHours: 3.5,
    experienceType: 'Família',
    language: 'Português',
    featured: false,
    guideId: 'carlos-mendes',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Visita demonstrativa a propriedades rurais e culinária afetiva da cidade.',
    description: 'Um roteiro ilustrativo que destaca ingredientes típicos de São Roque, com foco em agricultura familiar e receitas tradicionais.',
    highlights: [
      'Contato com a produção rural demonstrativa',
      'Degustação ilustrativa de pratos típicos',
      'Histórias de famílias produtoras da região'
    ],
    mapStops: ['Sítio Demonstrativo', 'Horta de Alcachofras', 'Cozinha Rural', 'Empório Local']
  },
  {
    slug: 'bike-pelos-vales-verdes',
    title: 'Bike pelos Vales Verdes',
    subtitle: 'Estradas de terra e paisagens abertas',
    category: 'Aventura',
    durationLabel: '2 horas',
    durationLong: 'Aproximadamente 2 horas',
    durationPeriod: 'Período curto',
    durationHours: 2,
    experienceType: 'Privativo',
    language: 'Português',
    featured: false,
    guideId: 'carlos-mendes',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1400&q=80',
    shortDescription: 'Pedal demonstrativo por estradas vicinais cercadas de verde e ar puro.',
    description: 'Percurso ilustrativo de bicicleta em ritmo moderado por estradas rurais de São Roque, ideal para explorar a paisagem com autonomia.',
    highlights: [
      'Estradas rurais arborizadas',
      'Paradas fotográficas em mirantes naturais',
      'Ritmo adaptável ao perfil do grupo'
    ],
    mapStops: ['Ponto de Apoio', 'Estrada Vicinal', 'Vale das Araucárias', 'Retorno']
  }
];

export const CATEGORIES = [
  { number: '01', name: 'Gastronomia', subtitle: 'Sabores locais' },
  { number: '02', name: 'Natureza', subtitle: 'Respire novos ares' },
  { number: '03', name: 'Cultura', subtitle: 'Histórias da cidade' },
  { number: '04', name: 'Aventura', subtitle: 'Novos caminhos' }
];
