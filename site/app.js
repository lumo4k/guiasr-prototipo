import { ROUTES, GUIDES, CATEGORIES } from './data.js';
import { renderScreenV2, renderFlowViewV2, bindEventsV2 } from './v2.js';

const MONTHS_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

// Estado global persistente durante a navegação
const now = new Date();
const defaultMonth = now.getMonth();
const defaultYear = now.getFullYear();

const SCREENS = [
  { id: 1, key: 'inicio', name: 'Início', hash: '#/', wireframe: '../baixa_fidelidade/01_inicio.jpg', desc: 'Hero, busca, roteiros em destaque e categorias' },
  { id: 2, key: 'explorar', name: 'Explorar', hash: '#/roteiros', wireframe: '../baixa_fidelidade/02_explorar.jpg', desc: 'Catálogo com busca, filtros e ordenação' },
  { id: 3, key: 'roteiro', name: 'Roteiro', hash: '#/roteiros/sabores-da-rota-do-vinho', wireframe: '../baixa_fidelidade/03_roteiro.jpg', desc: 'Banner, destaques, mapa ilustrativo e card do guia' },
  { id: 4, key: 'guia', name: 'Guia', hash: '#/guias/carlos-mendes', wireframe: '../baixa_fidelidade/04_guia.jpg', desc: 'Perfil demonstrativo, idiomas, preço e credenciais' },
  { id: 5, key: 'data', name: 'Data', hash: '#/solicitacao/data', wireframe: '../baixa_fidelidade/05_data.jpg', desc: 'Calendário de disponibilidade e participantes' },
  { id: 6, key: 'acesso', name: 'Acesso', hash: '#/acesso', wireframe: '../baixa_fidelidade/06_acesso.jpg', desc: 'Login e cadastro simulados' },
  { id: 7, key: 'revisao', name: 'Revisão', hash: '#/solicitacao/revisao', wireframe: '../baixa_fidelidade/07_revisao.jpg', desc: 'Conferência dos dados e aviso de confirmação' },
  { id: 8, key: 'enviada', name: 'Enviada', hash: '#/solicitacao/enviada', wireframe: '../baixa_fidelidade/08_enviada.jpg', desc: 'Status pendente e próximos passos' }
];

const SCREENS_V2 = [
  { id: 1, key: 'inicio', name: 'Início', hash: '#/' },
  { id: 2, key: 'explorar', name: 'Explorar', hash: '#/roteiros' },
  { id: 3, key: 'roteiro', name: 'Roteiro', hash: '#/roteiros/sabores-da-rota-do-vinho' },
  { id: 4, key: 'guias-galeria', name: 'Guias Credenciados', hash: '#/guias' },
  { id: 5, key: 'guia', name: 'Perfil do Guia', hash: '#/guias/carlos-mendes' },
  { id: 6, key: 'data', name: 'Data e Local', hash: '#/solicitacao/data' },
  { id: 7, key: 'acesso', name: 'Acesso', hash: '#/acesso' },
  { id: 8, key: 'revisao', name: 'Revisão', hash: '#/solicitacao/revisao' },
  { id: 9, key: 'enviada', name: 'Enviada', hash: '#/solicitacao/enviada' }
];

const state = {
  version: 'v2', // 'v1' (original) | 'v2' (remodelada com base em pesquisas)
  viewMode: 'hifi', // 'wireframe' | 'hifi' | 'flow'
  mobileMenuOpen: false,
  filters: {
    query: '',
    category: 'Todos',
    duration: 'all',
    experience: 'all',
    sort: 'relevant'
  },
  v2: {
    supportOpen: false,
    filters: {
      query: '',
      circuit: 'Todos',
      profile: 'all',
      duration: 'all',
      modality: 'all',
      accessibleOnly: false,
      sort: 'relevant'
    },
    guideFilters: {
      query: '',
      specialty: 'Todas',
      badge: 'all' // 'all' | 'top' | 'partner'
    },
    modality: 'private', // 'private' | 'group'
    privateHours: 5,
    transportOption: 'own-car',
    durationOption: 'full',
    vehicleType: 'Van',
    meetingPoint: 'hotel',
    meetingPointDetail: '',
    cadasturInfoOpen: false,
    startTime: '09:30',
    wantLunch: true,
    wantTechVisit: false,
    needAccessibility: false
  },
  selectedRouteSlug: ROUTES[0].slug,
  selectedGuideId: 'carlos-mendes',
  calendarYear: defaultYear,
  calendarMonth: defaultMonth,
  selectedDate: null, // { year, month, day }
  participants: 2,
  user: null, // { name, email }
  authTab: 'login',
  lastSubmitted: null
};

// Seleciona automaticamente o primeiro dia disponível do mês atual
function isDayUnavailable(year, month, day) {
  const date = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return true;
  // Padrão ilustrativo de indisponibilidade (algumas segundas e terças)
  const dow = date.getDay();
  return (dow === 1 && day % 2 === 0) || (dow === 2 && day % 3 === 0);
}

function ensureDefaultDate() {
  if (state.selectedDate) return;
  const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    if (!isDayUnavailable(state.calendarYear, state.calendarMonth, d)) {
      state.selectedDate = { year: state.calendarYear, month: state.calendarMonth, day: d };
      return;
    }
  }
}

function formatDatePt(d) {
  if (!d) return 'Selecione uma data';
  return `${d.day} de ${MONTHS_PT[d.month]} de ${d.year}`;
}

function getSelectedRoute() {
  return ROUTES.find((r) => r.slug === state.selectedRouteSlug) || ROUTES[0];
}

function getSelectedGuide() {
  return GUIDES[state.selectedGuideId] || GUIDES['carlos-mendes'];
}

// Ícones SVG limpos
const icons = {
  leaf: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  chevronLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  users: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  pin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`
};

function navigate(hash) {
  state.mobileMenuOpen = false;
  if (window.location.hash === hash) {
    render();
  } else {
    window.location.hash = hash;
  }
  window.scrollTo(0, 0);
}

function getRouteInfo() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path] = raw.split('?');
  return path;
}

function getActiveScreens() {
  return state.version === 'v2' ? SCREENS_V2 : SCREENS;
}

function getCurrentScreenIndex() {
  const path = getRouteInfo();
  if (state.version === 'v2') {
    if (path === '/' || path === '') return 0;
    if (path === '/roteiros') return 1;
    if (path.startsWith('/roteiros/')) return 2;
    if (path === '/guias') return 3;
    if (path.startsWith('/guias/')) return 4;
    if (path === '/solicitacao/data') return 5;
    if (path === '/acesso') return 6;
    if (path === '/solicitacao/revisao') return 7;
    if (path === '/solicitacao/enviada') return 8;
    return 0;
  }
  if (path === '/' || path === '') return 0;
  if (path === '/roteiros') return 1;
  if (path.startsWith('/roteiros/')) return 2;
  if (path.startsWith('/guias/')) return 3;
  if (path === '/solicitacao/data') return 4;
  if (path === '/acesso') return 5;
  if (path === '/solicitacao/revisao') return 6;
  if (path === '/solicitacao/enviada') return 7;
  return 0;
}

function renderProtoBar() {
  const screens = getActiveScreens();
  const idx = getCurrentScreenIndex();
  const isFlow = state.viewMode === 'flow';
  return `
    <div class="proto-bar" role="region" aria-label="Controles do protótipo">
      <div class="proto-bar-inner">
        <div class="proto-brand">
          <strong>GuiaSR</strong>
          <span>Protótipo acadêmico navegável</span>
        </div>

        <div class="proto-controls-group">
          <div class="proto-version-switch">
            <label for="protoVersionSelect" class="proto-version-label">Versão:</label>
            <select id="protoVersionSelect" class="proto-version-select" aria-label="Selecionar versão do protótipo">
              <option value="v1" ${state.version === 'v1' ? 'selected' : ''}>v1 — Original</option>
              <option value="v2" ${state.version === 'v2' ? 'selected' : ''}>v2 — Remodelada (UX)</option>
            </select>
          </div>

          <div class="proto-tabs" role="tablist" aria-label="Modo de visualização">
            <button type="button" class="proto-tab ${state.viewMode === 'wireframe' ? 'is-active' : ''}" data-view-mode="wireframe">01 Baixa fidelidade</button>
            <button type="button" class="proto-tab ${state.viewMode === 'hifi' ? 'is-active' : ''}" data-view-mode="hifi">02 Alta fidelidade</button>
            <button type="button" class="proto-tab ${state.viewMode === 'flow' ? 'is-active' : ''}" data-view-mode="flow">03 Fluxo</button>
          </div>
        </div>

        <div class="proto-pager">
          <button type="button" class="proto-pager-btn" id="protoPrevBtn" ${isFlow || idx === 0 ? 'disabled' : ''} aria-label="Tela anterior">${icons.chevronLeft}</button>
          <span>${isFlow ? 'Fluxo' : `${idx + 1} / ${screens.length}`}</span>
          <button type="button" class="proto-pager-btn" id="protoNextBtn" ${isFlow || idx === screens.length - 1 ? 'disabled' : ''} aria-label="Próxima tela">${icons.chevronRight}</button>
        </div>
      </div>
    </div>
  `;
}

function renderFlowView() {
  return `
    <div class="proto-subbar">03 — Fluxo principal • Jornada completa do usuário</div>
    <main class="page-main">
      <div class="container flow-wrap">
        <div class="page-hero-centered" style="padding-top: 0;">
          <span class="eyebrow">Arquitetura e navegação</span>
          <h1>Fluxograma principal do GuiaSR</h1>
          <p>Clique em qualquer tela do fluxograma para abri-la diretamente em alta fidelidade.</p>
        </div>

        <div class="flowchart-card">
          <svg class="flowchart-svg" viewBox="0 0 820 1110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxograma principal do GuiaSR">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#7b8880" />
              </marker>
              <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#c69749" />
              </marker>
            </defs>

            <!-- Conexões verticais principais -->
            <path class="fc-edge" d="M 410 74 L 410 106" marker-end="url(#arrow)" />
            <path class="fc-edge" d="M 410 166 L 410 198" marker-end="url(#arrow)" />
            <path class="fc-edge" d="M 410 258 L 410 290" marker-end="url(#arrow)" />
            <path class="fc-edge" d="M 410 350 L 410 382" marker-end="url(#arrow)" />
            <path class="fc-edge" d="M 410 442 L 410 476" marker-end="url(#arrow)" />

            <!-- Decisão 1: Data disponível? -->
            <!-- NÃO: loop pela esquerda de volta para Escolher data -->
            <path class="fc-edge fc-edge--accent" d="M 310 520 L 140 520 L 140 412 L 266 412" marker-end="url(#arrow-accent)" />
            <rect class="fc-edge-label-bg" x="198" y="508" width="38" height="20" rx="4" />
            <text class="fc-edge-label fc-edge-label--no" x="217" y="522" text-anchor="middle">Não</text>

            <!-- SIM: desce para Usuário autenticado? -->
            <path class="fc-edge" d="M 410 564 L 410 606" marker-end="url(#arrow)" />
            <rect class="fc-edge-label-bg" x="418" y="574" width="34" height="18" rx="4" />
            <text class="fc-edge-label" x="435" y="587" text-anchor="middle">Sim</text>

            <!-- Decisão 2: Usuário autenticado? -->
            <!-- NÃO: vai para Tela 06 Acesso à esquerda e depois para Tela 07 Revisão -->
            <path class="fc-edge fc-edge--accent" d="M 300 652 L 185 652 L 185 704" marker-end="url(#arrow-accent)" />
            <rect class="fc-edge-label-bg" x="215" y="640" width="38" height="20" rx="4" />
            <text class="fc-edge-label fc-edge-label--no" x="234" y="654" text-anchor="middle">Não</text>
            <path class="fc-edge" d="M 185 768 L 185 820 L 266 820" marker-end="url(#arrow)" />

            <!-- SIM: vai direto pela direita para Tela 07 Revisão -->
            <path class="fc-edge" d="M 520 652 L 605 652 L 605 820 L 554 820" marker-end="url(#arrow)" />
            <rect class="fc-edge-label-bg" x="550" y="640" width="36" height="20" rx="4" />
            <text class="fc-edge-label" x="568" y="654" text-anchor="middle">Sim</text>

            <!-- Tela 07 -> Decisão 3 -->
            <path class="fc-edge" d="M 410 852 L 410 886" marker-end="url(#arrow)" />

            <!-- Decisão 3: Confirmar envio? -->
            <!-- NÃO: loop pela direita de volta para Tela 05 Escolher data -->
            <path class="fc-edge fc-edge--accent" d="M 510 930 L 705 930 L 705 412 L 554 412" marker-end="url(#arrow-accent)" />
            <rect class="fc-edge-label-bg" x="642" y="918" width="96" height="20" rx="4" />
            <text class="fc-edge-label fc-edge-label--no" x="690" y="932" text-anchor="middle">Não (editar)</text>

            <!-- SIM: desce para Tela 08 Enviada -->
            <path class="fc-edge" d="M 410 974 L 410 1004" marker-end="url(#arrow)" />
            <rect class="fc-edge-label-bg" x="418" y="979" width="34" height="18" rx="4" />
            <text class="fc-edge-label" x="435" y="992" text-anchor="middle">Sim</text>

            <!-- Tela 01 -->
            <g class="fc-node" data-flow-open="#/">
              <rect x="270" y="14" width="280" height="60" rx="12" />
              <text class="fc-node-num" x="410" y="33" text-anchor="middle">TELA 01</text>
              <text class="fc-node-title" x="410" y="51" text-anchor="middle">Início</text>
              <text class="fc-node-sub" x="410" y="65" text-anchor="middle">Hero, busca, destaques e categorias</text>
            </g>

            <!-- Tela 02 -->
            <g class="fc-node" data-flow-open="#/roteiros">
              <rect x="270" y="106" width="280" height="60" rx="12" />
              <text class="fc-node-num" x="410" y="125" text-anchor="middle">TELA 02</text>
              <text class="fc-node-title" x="410" y="143" text-anchor="middle">Explorar roteiros</text>
              <text class="fc-node-sub" x="410" y="157" text-anchor="middle">Busca, filtros e ordenação</text>
            </g>

            <!-- Tela 03 -->
            <g class="fc-node" data-flow-open="#/roteiros/sabores-da-rota-do-vinho">
              <rect x="270" y="198" width="280" height="60" rx="12" />
              <text class="fc-node-num" x="410" y="217" text-anchor="middle">TELA 03</text>
              <text class="fc-node-title" x="410" y="235" text-anchor="middle">Detalhes do roteiro</text>
              <text class="fc-node-sub" x="410" y="249" text-anchor="middle">Descrição, destaques, mapa e guia</text>
            </g>

            <!-- Tela 04 -->
            <g class="fc-node" data-flow-open="#/guias/carlos-mendes">
              <rect x="270" y="290" width="280" height="60" rx="12" />
              <text class="fc-node-num" x="410" y="309" text-anchor="middle">TELA 04</text>
              <text class="fc-node-title" x="410" y="327" text-anchor="middle">Perfil do guia</text>
              <text class="fc-node-sub" x="410" y="341" text-anchor="middle">Idiomas, especialidades e preço</text>
            </g>

            <!-- Tela 05 -->
            <g class="fc-node" data-flow-open="#/solicitacao/data">
              <rect x="270" y="382" width="280" height="60" rx="12" />
              <text class="fc-node-num" x="410" y="401" text-anchor="middle">TELA 05</text>
              <text class="fc-node-title" x="410" y="419" text-anchor="middle">Escolher data e participantes</text>
              <text class="fc-node-sub" x="410" y="433" text-anchor="middle">Calendário e tamanho do grupo</text>
            </g>

            <!-- Losango 1: Data disponível? -->
            <g>
              <polygon class="fc-diamond" points="410,478 510,520 410,562 310,520" />
              <text class="fc-diamond-text" x="410" y="524" text-anchor="middle">Data disponível?</text>
            </g>

            <!-- Losango 2: Usuário autenticado? -->
            <g>
              <polygon class="fc-diamond" points="410,608 520,652 410,696 300,652" />
              <text class="fc-diamond-text" x="410" y="656" text-anchor="middle">Usuário autenticado?</text>
            </g>

            <!-- Tela 06: Acesso -->
            <g class="fc-node" data-flow-open="#/acesso">
              <rect x="55" y="706" width="260" height="62" rx="12" />
              <text class="fc-node-num" x="185" y="725" text-anchor="middle">TELA 06</text>
              <text class="fc-node-title" x="185" y="743" text-anchor="middle">Entrar ou criar conta</text>
              <text class="fc-node-sub" x="185" y="758" text-anchor="middle">Autenticação simulada</text>
            </g>

            <!-- Tela 07: Revisão -->
            <g class="fc-node" data-flow-open="#/solicitacao/revisao">
              <rect x="270" y="790" width="280" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="809" text-anchor="middle">TELA 07</text>
              <text class="fc-node-title" x="410" y="827" text-anchor="middle">Revisão da solicitação</text>
              <text class="fc-node-sub" x="410" y="842" text-anchor="middle">Conferência e aviso de confirmação</text>
            </g>

            <!-- Losango 3: Confirmar envio? -->
            <g>
              <polygon class="fc-diamond" points="410,888 510,930 410,972 310,930" />
              <text class="fc-diamond-text" x="410" y="934" text-anchor="middle">Confirmar envio?</text>
            </g>

            <!-- Tela 08: Enviada (Estado final) -->
            <g class="fc-node" data-flow-open="#/solicitacao/enviada">
              <rect class="fc-end" x="235" y="1006" width="350" height="64" rx="32" />
              <text class="fc-node-num" x="410" y="1026" text-anchor="middle">TELA 08 • FIM DO FLUXO</text>
              <text class="fc-end-text" x="410" y="1044" text-anchor="middle">Solicitação enviada</text>
              <text class="fc-node-sub" x="410" y="1059" text-anchor="middle">Aguardando confirmação do guia</text>
            </g>
          </svg>

          <div class="flowchart-legend">
            <span class="flowchart-legend-item"><span class="fc-swatch fc-swatch--screen"></span> Tela clicável</span>
            <span class="flowchart-legend-item"><span class="fc-swatch fc-swatch--decision"></span> Ponto de decisão</span>
            <span class="flowchart-legend-item"><span class="fc-swatch fc-swatch--end"></span> Estado final</span>
          </div>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

function renderHeader(activeSection) {
  const userLabel = state.user ? state.user.name.split(' ')[0] : 'Entrar';
  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="#/" class="brand" aria-label="GuiaSR Início">
          <span class="brand-mark">${icons.leaf}</span>
          <span>Guia<span class="brand-sr">SR</span></span>
        </a>

        <nav class="nav-links" aria-label="Navegação principal">
          <a href="#/" class="nav-link ${activeSection === 'home' ? 'is-active' : ''}">Início</a>
          <a href="#/roteiros" class="nav-link ${activeSection === 'explore' ? 'is-active' : ''}">Explorar roteiros</a>
          <a href="#/guias/carlos-mendes" class="nav-link ${activeSection === 'guides' ? 'is-active' : ''}">Guias</a>
        </nav>

        <div class="header-actions">
          <a href="#/acesso" class="btn-outline">${userLabel}</a>
          <button type="button" class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Abrir menu">
            ${icons.menu}
          </button>
        </div>
      </div>
      <div class="mobile-nav ${state.mobileMenuOpen ? 'is-open' : ''}">
        <div class="mobile-nav-list">
          <a href="#/" class="mobile-nav-link ${activeSection === 'home' ? 'is-active' : ''}">Início</a>
          <a href="#/roteiros" class="mobile-nav-link ${activeSection === 'explore' ? 'is-active' : ''}">Explorar roteiros</a>
          <a href="#/guias/carlos-mendes" class="mobile-nav-link ${activeSection === 'guides' ? 'is-active' : ''}">Guias</a>
          <a href="#/acesso" class="mobile-nav-link">${userLabel}</a>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <a href="#/" class="brand brand--light">
          <span class="brand-mark">${icons.leaf}</span>
          <span>Guia<span class="brand-sr">SR</span></span>
        </a>
        <span>Protótipo acadêmico • FATEC São Roque</span>
        <span>Dados e experiências demonstrativos</span>
      </div>
    </footer>
  `;
}

function renderRouteCard(route) {
  return `
    <article class="route-card reveal">
      <a href="#/roteiros/${route.slug}" class="route-card-media">
        <img src="${route.image}" alt="${route.title}" loading="lazy" />
        <span class="category-pill">${route.category}</span>
      </a>
      <div class="route-card-body">
        <span class="route-meta">${icons.clock} ${route.durationLabel}</span>
        <h3 class="route-card-title">${route.title}</h3>
        <p class="route-card-desc">${route.shortDescription}</p>
        <a href="#/roteiros/${route.slug}" class="card-link">Ver detalhes ${icons.arrowRight}</a>
      </div>
    </article>
  `;
}

// TELA 01 — INÍCIO
function renderHome() {
  const featured = ROUTES.filter((r) => r.featured);
  return `
    ${renderHeader('home')}
    <main class="page-main">
      <section class="hero">
        <div class="hero-media">
          <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=85" alt="Paisagem de vinhedos em São Roque" />
        </div>
        <div class="hero-content">
          <span class="eyebrow eyebrow--accent">Descubra São Roque</span>
          <h1 class="hero-title">Seu próximo caminho começa aqui.</h1>
          <p class="hero-subtitle">
            Encontre experiências locais e conecte-se a guias para explorar a cidade de um jeito autêntico.
          </p>
          <form class="search-bar" id="homeSearchForm">
            <span class="search-bar-icon">${icons.search}</span>
            <input type="text" id="homeSearchInput" placeholder="Que experiência você procura?" value="${state.filters.query}" aria-label="Buscar experiência" />
            <button type="submit" class="btn-primary">Buscar</button>
          </form>
          <a href="#/roteiros" class="hero-link">Explorar todos os roteiros ${icons.arrowRight}</a>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-header reveal">
            <div>
              <span class="eyebrow">Experiências selecionadas</span>
              <h2 class="section-title">Roteiros em destaque</h2>
            </div>
          </div>
          <div class="routes-grid">
            ${featured.map(renderRouteCard).join('')}
          </div>
        </div>
      </section>

      <section class="categories-section">
        <div class="container categories-layout">
          <div class="reveal">
            <span class="eyebrow">Encontre o seu ritmo</span>
            <h2 class="section-title">Explore por categoria</h2>
          </div>
          <div class="categories-grid reveal">
            ${CATEGORIES.map((cat) => `
              <a href="#/roteiros" class="category-row" data-cat-jump="${cat.name}">
                <div class="category-row-left">
                  <span class="category-num">${cat.number}</span>
                  <div>
                    <div class="category-name">${cat.name}</div>
                    <div class="category-sub">${cat.subtitle}</div>
                  </div>
                </div>
                <span>${icons.arrowRight}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
    ${renderFooter()}
  `;
}

// TELA 02 — EXPLORAR
function getFilteredRoutes() {
  const q = state.filters.query.trim().toLowerCase();
  let list = ROUTES.filter((route) => {
    if (state.filters.category !== 'Todos' && route.category !== state.filters.category) return false;
    if (state.filters.duration === 'short' && route.durationHours > 3) return false;
    if (state.filters.duration === 'medium' && (route.durationHours <= 3 || route.durationHours > 5)) return false;
    if (state.filters.experience !== 'all' && route.experienceType !== state.filters.experience) return false;
    if (q) {
      const hay = `${route.title} ${route.category} ${route.shortDescription} ${route.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (state.filters.sort === 'shortest') {
    list = [...list].sort((a, b) => a.durationHours - b.durationHours);
  } else if (state.filters.sort === 'longest') {
    list = [...list].sort((a, b) => b.durationHours - a.durationHours);
  }
  return list;
}

function renderExploreResultsMarkup(filtered) {
  return `
    <div class="explore-toolbar">
      <p class="results-count"><strong>${filtered.length}</strong> ${filtered.length === 1 ? 'experiência encontrada' : 'experiências encontradas'}</p>
      <select id="sortSelect" class="select-input sort-select" aria-label="Ordenar roteiros">
        <option value="relevant" ${state.filters.sort === 'relevant' ? 'selected' : ''}>Mais relevantes</option>
        <option value="shortest" ${state.filters.sort === 'shortest' ? 'selected' : ''}>Menor duração</option>
        <option value="longest" ${state.filters.sort === 'longest' ? 'selected' : ''}>Maior duração</option>
      </select>
    </div>

    ${filtered.length > 0 ? `
      <div class="routes-grid">
        ${filtered.map(renderRouteCard).join('')}
      </div>
    ` : `
      <div class="empty-state">
        <h3>Nenhuma experiência encontrada</h3>
        <p>Tente ajustar os filtros ou buscar por outro termo em São Roque.</p>
        <button type="button" class="btn-outline" id="emptyResetBtn">Limpar filtros</button>
      </div>
    `}
  `;
}

function renderExplore() {
  const filtered = getFilteredRoutes();
  const categories = ['Todos', 'Gastronomia', 'Natureza', 'Cultura', 'Aventura'];

  return `
    ${renderHeader('explore')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/" class="back-link">${icons.chevronLeft} Voltar ao início</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Roteiros e experiências</span>
          <h1>Explore São Roque</h1>
          <p>Descubra caminhos pensados para diferentes ritmos, interesses e momentos.</p>
          <div class="explore-search-wrap">
            <form class="search-bar" id="exploreSearchForm">
              <span class="search-bar-icon">${icons.search}</span>
              <input type="text" id="exploreSearchInput" placeholder="Que experiência você procura?" value="${state.filters.query}" aria-label="Buscar experiência" />
              <button type="submit" class="btn-primary">Buscar</button>
            </form>
          </div>
        </div>

        <div class="explore-layout">
          <aside class="filters-panel" aria-label="Filtros de roteiros">
            <div class="filters-header">
              <h2>Filtros</h2>
              <button type="button" class="link-clear" id="clearFiltersBtn">Limpar</button>
            </div>

            <div class="filter-group">
              <span class="filter-label">Categoria</span>
              <div class="radio-list">
                ${categories.map((cat) => `
                  <label class="radio-item ${state.filters.category === cat ? 'is-selected' : ''}">
                    <span>${cat}</span>
                    <input type="radio" name="category" value="${cat}" ${state.filters.category === cat ? 'checked' : ''} />
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="durationSelect">Duração</label>
              <select id="durationSelect" class="select-input">
                <option value="all" ${state.filters.duration === 'all' ? 'selected' : ''}>Todas as durações</option>
                <option value="short" ${state.filters.duration === 'short' ? 'selected' : ''}>Até 3 horas</option>
                <option value="medium" ${state.filters.duration === 'medium' ? 'selected' : ''}>3 a 5 horas</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="experienceSelect">Experiência</label>
              <select id="experienceSelect" class="select-input">
                <option value="all" ${state.filters.experience === 'all' ? 'selected' : ''}>Todos os tipos</option>
                <option value="Pequenos grupos" ${state.filters.experience === 'Pequenos grupos' ? 'selected' : ''}>Pequenos grupos</option>
                <option value="Família" ${state.filters.experience === 'Família' ? 'selected' : ''}>Família</option>
                <option value="Privativo" ${state.filters.experience === 'Privativo' ? 'selected' : ''}>Privativo</option>
              </select>
            </div>
          </aside>

          <section id="exploreResultsArea">
            ${renderExploreResultsMarkup(filtered)}
          </section>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// TELA 03 — DETALHES DO ROTEIRO
function renderRouteDetail(slug) {
  const route = ROUTES.find((r) => r.slug === slug) || ROUTES[0];
  state.selectedRouteSlug = route.slug;
  state.selectedGuideId = route.guideId;
  const guide = GUIDES[route.guideId];

  return `
    ${renderHeader('explore')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/roteiros" class="back-link">${icons.chevronLeft} Voltar aos roteiros</a>
        </div>

        <section class="route-banner reveal">
          <img src="${route.image}" alt="${route.title}" />
          <div class="route-banner-content">
            <span class="route-banner-pill">${route.category}</span>
            <h1>${route.title}</h1>
            <span class="route-banner-time">${icons.clock} ${route.durationLong}</span>
          </div>
        </section>

        <div class="detail-grid">
          <div>
            <div class="reveal">
              <span class="eyebrow">Sobre o roteiro</span>
              <h2 class="detail-section-title">${route.subtitle}</h2>
              <p class="detail-lead">${route.description}</p>
            </div>

            <div class="specs-strip reveal">
              <div class="spec-item">
                <span class="spec-icon">${icons.clock}</span>
                <div>
                  <div class="spec-title">${route.durationPeriod}</div>
                  <div class="spec-sub">Duração estimada</div>
                </div>
              </div>
              <div class="spec-item">
                <span class="spec-icon">${icons.users}</span>
                <div>
                  <div class="spec-title">${route.experienceType}</div>
                  <div class="spec-sub">Tipo de experiência</div>
                </div>
              </div>
              <div class="spec-item">
                <span class="spec-icon">${icons.globe}</span>
                <div>
                  <div class="spec-title">${route.language}</div>
                  <div class="spec-sub">Idioma principal</div>
                </div>
              </div>
            </div>

            <div class="highlights-block reveal">
              <h3>Destaques do percurso</h3>
              <ul class="highlights-list">
                ${route.highlights.map((h) => `<li>${icons.check} <span>${h}</span></li>`).join('')}
              </ul>
            </div>

            <div class="map-block reveal">
              <h3>Mapa ilustrativo</h3>
              <div class="illustrative-map">
                <svg viewBox="0 0 640 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mapa ilustrativo do percurso">
                  <rect width="640" height="220" rx="12" fill="#E6EDE7"/>
                  <path d="M0 160 L210 120 L380 155 L640 80" stroke="#D2DFD5" stroke-width="18" stroke-linecap="round"/>
                  <path d="M290 0 L240 220" stroke="#D2DFD5" stroke-width="12"/>
                  <path d="M72 150 C170 65, 290 175, 410 92 C480 48, 535 110, 575 88" stroke="#1E4332" stroke-width="3" stroke-dasharray="7 7" stroke-linecap="round"/>
                  ${route.mapStops.map((stop, idx) => {
                    const coords = [[72, 150], [235, 118], [410, 92], [575, 88]][idx];
                    return `
                      <circle cx="${coords[0]}" cy="${coords[1]}" r="8" fill="#1E4332"/>
                      <circle cx="${coords[0]}" cy="${coords[1]}" r="3.5" fill="#FFFFFF"/>
                      <text x="${coords[0]}" y="${coords[1] + 24}" text-anchor="middle" fill="#1A231E" font-size="11" font-family="Inter, sans-serif" font-weight="500">${stop}</text>
                    `;
                  }).join('')}
                </svg>
                <p class="map-caption">Representação visual ilustrativa do trajeto em São Roque. Não utiliza GPS em tempo real.</p>
              </div>
            </div>
          </div>

          <aside class="sticky-card reveal">
            <span class="eyebrow">Guia da experiência</span>
            <div class="guide-mini-head">
              <img src="${guide.avatar}" alt="${guide.name}" class="guide-avatar-sm" />
              <div>
                <div class="guide-mini-name">${guide.name}</div>
                <div class="guide-mini-role">${guide.shortRole}</div>
              </div>
            </div>
            <p class="guide-quote">${guide.quote}</p>
            <div class="demo-note-row">
              ${icons.shield}
              <span>Perfil e credenciais exibidos apenas para fins demonstrativos.</span>
            </div>
            <a href="#/guias/${guide.id}" class="btn-primary btn-full">Conhecer o guia ${icons.arrowRight}</a>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// TELA 04 — PERFIL DO GUIA
function renderGuideProfile(guideId) {
  const guide = GUIDES[guideId] || GUIDES['carlos-mendes'];
  state.selectedGuideId = guide.id;
  const route = getSelectedRoute();
  const offeredRoutes = ROUTES.filter((r) => r.guideId === guide.id).slice(0, 2);

  return `
    ${renderHeader('guides')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/roteiros/${route.slug}" class="back-link">${icons.chevronLeft} Voltar ao roteiro</a>
        </div>

        <section class="guide-hero-card reveal">
          <img src="${guide.avatar}" alt="${guide.name}" class="guide-avatar-lg" />
          <div class="guide-hero-info">
            <span class="eyebrow">Guia da experiência</span>
            <h1>${guide.name}</h1>
            <p class="guide-hero-role">${guide.role}</p>
            <div class="chips-row">
              ${guide.languages.map((lang) => `<span class="chip">${lang}</span>`).join('')}
            </div>
          </div>
          <div class="guide-price-box">
            <div class="price-label">Valor demonstrativo</div>
            <div class="price-value">R$ ${guide.pricePerGroup} <span>/ grupo</span></div>
            <a href="#/solicitacao/data" class="btn-primary">Ver disponibilidade ${icons.calendar}</a>
          </div>
        </section>

        <div class="detail-grid">
          <div>
            <div class="reveal">
              <span class="eyebrow">Apresentação</span>
              <h2 class="detail-section-title">Histórias que conectam pessoas e lugares</h2>
              <p class="detail-lead">${guide.bio}</p>
            </div>

            <div class="reveal" style="margin-top: 32px;">
              <h3>Especialidades</h3>
              <div class="specialties-grid">
                ${guide.specialties.map((sp) => `
                  <div class="specialty-card">
                    ${icons[sp.icon]}
                    <h4>${sp.title}</h4>
                    <p>${sp.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="reveal">
              <h3>Experiências oferecidas</h3>
              <div class="guide-routes-mini">
                ${offeredRoutes.map(renderRouteCard).join('')}
              </div>
            </div>
          </div>

          <aside class="sticky-card reveal">
            <span style="color: var(--accent); display: inline-flex; margin-bottom: 10px;">${icons.shield}</span>
            <h3 style="font-size: 1.05rem; font-weight: 600;">Informações profissionais</h3>
            <p style="margin-top: 6px; font-size: 0.82rem; color: var(--text-muted);">
              Dados de credenciamento são exemplos visuais e não representam validação oficial do Cadastur.
            </p>
            <div class="info-box-list">
              <div class="info-box-item">
                <small>Atuação</small>
                <strong>${guide.area}</strong>
              </div>
              <div class="info-box-item">
                <small>Experiência</small>
                <strong>${guide.experience}</strong>
              </div>
              <div class="info-box-item">
                <small>Credencial</small>
                <strong>${guide.credential}</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// TELA 05 — ESCOLHER DATA
function renderDateSelection() {
  ensureDefaultDate();
  const route = getSelectedRoute();
  const guide = getSelectedGuide();

  const firstDow = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
  const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();
  const monthLabel = `${MONTHS_PT[state.calendarMonth]} ${state.calendarYear}`;

  let dayButtons = '';
  for (let i = 0; i < firstDow; i++) {
    dayButtons += `<span></span>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const unavailable = isDayUnavailable(state.calendarYear, state.calendarMonth, d);
    const selected = state.selectedDate &&
      state.selectedDate.year === state.calendarYear &&
      state.selectedDate.month === state.calendarMonth &&
      state.selectedDate.day === d;

    dayButtons += `
      <button
        type="button"
        class="calendar-day ${unavailable ? 'is-unavailable' : ''} ${selected ? 'is-selected' : ''}"
        ${unavailable ? 'disabled' : ''}
        data-day="${d}"
        aria-label="Dia ${d} de ${monthLabel}"
      >${d}</button>
    `;
  }

  return `
    ${renderHeader('guides')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/guias/${guide.id}" class="back-link">${icons.chevronLeft} Voltar ao perfil</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Solicitar experiência</span>
          <h1>Escolha uma data</h1>
          <p>Selecione uma data disponível e informe o tamanho do grupo.</p>
        </div>

        <div class="booking-grid">
          <div class="reveal">
            <div class="selected-route-strip">
              <img src="${route.image}" alt="${route.title}" class="selected-route-thumb" />
              <div>
                <span class="eyebrow">Roteiro selecionado</span>
                <h3>${route.title}</h3>
                <p>com ${guide.name} • ${route.durationLabel}</p>
              </div>
            </div>

            <div class="calendar-card">
              <div class="calendar-header">
                <button type="button" class="calendar-nav-btn" id="prevMonthBtn" aria-label="Mês anterior">${icons.chevronLeft}</button>
                <span class="calendar-month">${monthLabel}</span>
                <button type="button" class="calendar-nav-btn" id="nextMonthBtn" aria-label="Próximo mês">${icons.chevronRight}</button>
              </div>
              <div class="calendar-weekdays">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>
              <div class="calendar-days">
                ${dayButtons}
              </div>
              <div class="calendar-legend">
                <span class="legend-item"><span class="legend-dot legend-dot--available"></span> Disponível</span>
                <span class="legend-item"><span class="legend-dot legend-dot--selected"></span> Selecionada</span>
                <span class="legend-item"><span class="legend-dot legend-dot--unavailable"></span> Indisponível</span>
              </div>
            </div>
          </div>

          <aside class="sticky-card reveal">
            <span class="eyebrow">Resumo da escolha</span>
            <div class="summary-row">
              <small>Experiência</small>
              <strong>${route.title}</strong>
            </div>
            <div class="summary-row">
              <small>Guia</small>
              <strong>${guide.name}</strong>
            </div>
            <div class="summary-row">
              <small>Data</small>
              <strong>${formatDatePt(state.selectedDate)}</strong>
            </div>
            <div class="stepper-block">
              <small style="font-size: 0.78rem; color: var(--text-muted);">Participantes</small>
              <div class="stepper">
                <button type="button" class="stepper-btn" id="decParticipants" ${state.participants <= 1 ? 'disabled' : ''} aria-label="Diminuir participantes">−</button>
                <span class="stepper-val">${state.participants}</span>
                <button type="button" class="stepper-btn" id="incParticipants" ${state.participants >= 12 ? 'disabled' : ''} aria-label="Aumentar participantes">+</button>
              </div>
            </div>
            <p class="summary-disclaimer">Nenhuma reserva será processada. Esta é uma simulação acadêmica.</p>
            <button type="button" class="btn-primary btn-full" id="continueDateBtn" ${!state.selectedDate ? 'disabled' : ''}>
              Continuar ${icons.arrowRight}
            </button>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// TELA 06 — ACESSO
function renderAuth() {
  const isRegister = state.authTab === 'register';
  return `
    ${renderHeader('')}
    <main class="page-main">
      <section class="auth-split">
        <div class="auth-media">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85" alt="Trilha em meio à mata em São Roque" />
          <div class="auth-media-caption">
            ${icons.leaf}
            <h2>Falta pouco para o seu próximo caminho.</h2>
          </div>
        </div>

        <div class="auth-panel">
          <div>
            <a href="#/solicitacao/data" class="back-link">${icons.chevronLeft} Voltar à seleção</a>
          </div>

          <div class="auth-box">
            <div class="brand">
              <span class="brand-mark">${icons.leaf}</span>
              <span>Guia<span class="brand-sr">SR</span></span>
            </div>
            <h1>${isRegister ? 'Crie sua conta' : 'Boas-vindas de volta'}</h1>
            <p class="auth-box-sub">Autenticação simulada para continuar a solicitação.</p>

            <div class="auth-tabs" role="tablist">
              <button type="button" class="auth-tab ${!isRegister ? 'is-active' : ''}" data-auth-tab="login">Entrar</button>
              <button type="button" class="auth-tab ${isRegister ? 'is-active' : ''}" data-auth-tab="register">Criar conta</button>
            </div>

            <form id="authForm" novalidate>
              ${isRegister ? `
                <div class="form-field">
                  <label for="authName">Nome completo</label>
                  <input type="text" id="authName" placeholder="Ex.: Mariana Oliveira" value="${state.user?.name || ''}" required />
                </div>
              ` : ''}
              <div class="form-field">
                <label for="authEmail">E-mail</label>
                <input type="email" id="authEmail" placeholder="voce@exemplo.com" value="${state.user?.email || ''}" required />
              </div>
              <div class="form-field">
                <label for="authPassword">Senha</label>
                <input type="password" id="authPassword" placeholder="••••••••" required />
              </div>
              <div class="form-error" id="authError" aria-live="polite"></div>
              <button type="submit" class="btn-primary btn-full">
                ${isRegister ? 'Criar conta e continuar' : 'Entrar e continuar'} ${icons.arrowRight}
              </button>
            </form>

            <p class="auth-footnote">Seus dados não serão enviados ou armazenados em um servidor.</p>
          </div>
        </div>
      </section>
    </main>
  `;
}

// TELA 07 — REVISÃO
function renderReview() {
  ensureDefaultDate();
  const route = getSelectedRoute();
  const guide = getSelectedGuide();
  const requester = state.user || { name: 'Mariana Oliveira', email: 'visitante@guiasr.demo' };

  return `
    ${renderHeader('')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/acesso" class="back-link">${icons.chevronLeft} Voltar ao acesso</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Confira os dados</span>
          <h1>Revise sua solicitação</h1>
          <p>Você poderá voltar e editar antes de enviar.</p>
        </div>

        <div class="review-grid">
          <section class="review-card reveal">
            <h2>Detalhes da experiência</h2>
            <div class="review-route-box">
              <img src="${route.image}" alt="${route.title}" class="selected-route-thumb" />
              <div>
                <span class="eyebrow">Roteiro</span>
                <h3 style="font-size: 1rem; margin-top: 2px;">${route.title}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Experiência demonstrativa</p>
              </div>
            </div>

            <div class="review-list">
              <div class="review-item">
                <span class="review-item-label">${icons.users} Guia escolhido</span>
                <span class="review-item-val">${guide.name}</span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.calendar} Data</span>
                <span class="review-item-val">${formatDatePt(state.selectedDate)}</span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.users} Participantes</span>
                <span class="review-item-val">${state.participants} ${state.participants === 1 ? 'pessoa' : 'pessoas'}</span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.globe} Solicitante</span>
                <span class="review-item-val">
                  ${requester.name}
                  <small>${requester.email}</small>
                </span>
              </div>
            </div>

            <a href="#/solicitacao/data" class="card-link">Voltar e editar ${icons.arrowRight}</a>
          </section>

          <aside class="sticky-card reveal">
            <span class="eyebrow">Sua solicitação</span>
            <p class="price-label" style="margin-top: 6px;">Valor demonstrativo</p>
            <div class="price-value" style="margin-top: 4px;">R$ ${guide.pricePerGroup},00</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">O valor poderá ser confirmado pelo guia.</p>

            <div class="alert-pending">
              <span>${icons.clock}</span>
              <div>
                <strong>Solicitação sujeita à confirmação</strong>
                O envio não confirma a reserva. O guia ainda precisará analisar a disponibilidade.
              </div>
            </div>

            <button type="button" class="btn-primary btn-full" id="submitRequestBtn">
              Enviar solicitação ${icons.arrowRight}
            </button>
            <p class="auth-footnote">Ao enviar, você concorda com o uso demonstrativo dos dados neste protótipo.</p>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooter()}
  `;
}

// TELA 08 — ENVIADA
function renderSent() {
  ensureDefaultDate();
  const data = state.lastSubmitted || {
    route: getSelectedRoute(),
    date: state.selectedDate,
    participants: state.participants
  };

  return `
    ${renderHeader('')}
    <main class="page-main">
      <section class="sent-wrap reveal">
        <div class="success-circle">${icons.check}</div>
        <span class="eyebrow">Solicitação enviada</span>
        <h1>Sua solicitação foi enviada!</h1>
        <p class="sent-sub">Agora é só aguardar a confirmação do guia.</p>
        <div class="status-pill" title="Status: AGUARDANDO_CONFIRMACAO_GUIA">
          <span class="status-dot"></span> Aguardando confirmação
        </div>

        <div class="sent-card">
          <div class="selected-route-strip" style="margin-bottom: 0;">
            <img src="${data.route.image}" alt="${data.route.title}" class="selected-route-thumb" />
            <div>
              <span class="eyebrow">Sua experiência</span>
              <h3>${data.route.title}</h3>
              <p>${formatDatePt(data.date)} • ${data.participants} ${data.participants === 1 ? 'participante' : 'participantes'}</p>
            </div>
          </div>

          <div class="steps-list">
            <h3>Próximos passos</h3>
            <div class="step-row">
              <span class="step-num">1</span>
              <div>
                <strong>O guia analisa a solicitação</strong>
                <p>A disponibilidade e os detalhes serão conferidos.</p>
              </div>
            </div>
            <div class="step-row">
              <span class="step-num">2</span>
              <div>
                <strong>Você recebe um retorno</strong>
                <p>Neste protótipo, esta etapa é apenas ilustrativa.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="sent-actions">
          <a href="#/" class="btn-primary">Voltar ao início</a>
          <a href="#/roteiros" class="btn-outline">Explorar outros roteiros</a>
        </div>

        <p class="sent-footnote">Este é um protótipo acadêmico. Nenhuma reserva real foi criada.</p>
      </section>
    </main>
    ${renderFooter()}
  `;
}

// Reveal suave ao rolar
function setupRevealObserver() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

// Eventos dinâmicos da tela atual
function bindEvents() {
  // Seletor de versão (dropdown v1 / v2) — aplica em 01, 02 e 03
  document.getElementById('protoVersionSelect')?.addEventListener('change', (e) => {
    state.version = e.target.value;
    render();
    window.scrollTo(0, 0);
  });

  // Controles da barra do protótipo (Wireframe / Alta fidelidade / Fluxo)
  document.querySelectorAll('[data-view-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.viewMode = btn.getAttribute('data-view-mode');
      render();
      window.scrollTo(0, 0);
    });
  });

  document.getElementById('protoPrevBtn')?.addEventListener('click', () => {
    const screens = getActiveScreens();
    const idx = getCurrentScreenIndex();
    if (idx > 0) navigate(screens[idx - 1].hash);
  });

  document.getElementById('protoNextBtn')?.addEventListener('click', () => {
    const screens = getActiveScreens();
    const idx = getCurrentScreenIndex();
    if (idx < screens.length - 1) navigate(screens[idx + 1].hash);
  });

  document.querySelectorAll('[data-jump-screen]').forEach((btn) => {
    btn.addEventListener('click', () => {
      navigate(btn.getAttribute('data-jump-screen'));
    });
  });

  document.querySelectorAll('[data-flow-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.viewMode = 'hifi';
      navigate(btn.getAttribute('data-flow-open'));
    });
  });

  document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    document.querySelector('.mobile-nav')?.classList.toggle('is-open', state.mobileMenuOpen);
  });

  // Home search
  document.getElementById('homeSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.filters.query = document.getElementById('homeSearchInput').value;
    navigate('#/roteiros');
  });

  // Home category jump
  document.querySelectorAll('[data-cat-jump]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      state.filters.category = el.getAttribute('data-cat-jump');
      navigate('#/roteiros');
    });
  });

  // Explore search & filters (atualização parcial sem recarregar o cabeçalho)
  const updateExploreResults = () => {
    const area = document.getElementById('exploreResultsArea');
    if (!area) return;
    const filtered = getFilteredRoutes();
    area.innerHTML = renderExploreResultsMarkup(filtered);
    area.querySelectorAll('.route-card, .empty-state').forEach((el, idx) => {
      el.classList.remove('reveal');
      el.style.setProperty('--card-index', String(idx));
      el.classList.add('filter-fade-up');
    });

    area.querySelector('#sortSelect')?.addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      updateExploreResults();
    });

    area.querySelector('#emptyResetBtn')?.addEventListener('click', resetFilters);
  };

  const resetFilters = () => {
    state.filters = { query: '', category: 'Todos', duration: 'all', experience: 'all', sort: 'relevant' };
    const searchInput = document.getElementById('exploreSearchInput');
    if (searchInput) searchInput.value = '';
    const durationSelect = document.getElementById('durationSelect');
    if (durationSelect) durationSelect.value = 'all';
    const experienceSelect = document.getElementById('experienceSelect');
    if (experienceSelect) experienceSelect.value = 'all';
    document.querySelectorAll('input[name="category"]').forEach((r) => {
      r.checked = r.value === 'Todos';
      r.closest('.radio-item')?.classList.toggle('is-selected', r.checked);
    });
    updateExploreResults();
  };

  document.getElementById('exploreSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.filters.query = document.getElementById('exploreSearchInput').value;
    updateExploreResults();
  });

  document.querySelectorAll('input[name="category"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      document.querySelectorAll('input[name="category"]').forEach((r) => {
        r.closest('.radio-item')?.classList.toggle('is-selected', r.checked);
      });
      updateExploreResults();
    });
  });

  document.getElementById('durationSelect')?.addEventListener('change', (e) => {
    state.filters.duration = e.target.value;
    updateExploreResults();
  });

  document.getElementById('experienceSelect')?.addEventListener('change', (e) => {
    state.filters.experience = e.target.value;
    updateExploreResults();
  });

  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    updateExploreResults();
  });

  document.getElementById('clearFiltersBtn')?.addEventListener('click', resetFilters);
  document.getElementById('emptyResetBtn')?.addEventListener('click', resetFilters);

  // Calendar & participants (Tela 05)
  document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
    state.calendarMonth -= 1;
    if (state.calendarMonth < 0) {
      state.calendarMonth = 11;
      state.calendarYear -= 1;
    }
    render();
  });

  document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
    state.calendarMonth += 1;
    if (state.calendarMonth > 11) {
      state.calendarMonth = 0;
      state.calendarYear += 1;
    }
    render();
  });

  document.querySelectorAll('.calendar-day[data-day]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedDate = {
        year: state.calendarYear,
        month: state.calendarMonth,
        day: Number(btn.getAttribute('data-day'))
      };
      render();
    });
  });

  document.getElementById('decParticipants')?.addEventListener('click', () => {
    if (state.participants > 1) {
      state.participants -= 1;
      render();
    }
  });

  document.getElementById('incParticipants')?.addEventListener('click', () => {
    const maxP = state.version === 'v2' && state.v2.modality === 'group' ? 45 : (state.version === 'v2' ? 8 : 12);
    if (state.participants < maxP) {
      state.participants += 1;
      render();
    }
  });

  document.getElementById('continueDateBtn')?.addEventListener('click', () => {
    if (!state.selectedDate) return;
    // Fluxo documentado: se já autenticado vai direto à Revisão; senão vai ao Acesso
    if (state.user) {
      navigate('#/solicitacao/revisao');
    } else {
      navigate('#/acesso');
    }
  });

  // Auth (Tela 06)
  document.querySelectorAll('[data-auth-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.authTab = tab.getAttribute('data-auth-tab');
      render();
    });
  });

  document.getElementById('authForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();
    const nameInput = document.getElementById('authName');
    const errorEl = document.getElementById('authError');

    if (!email || !email.includes('@')) {
      errorEl.textContent = 'Informe um e-mail válido para continuar a simulação.';
      return;
    }
    if (password.length < 4) {
      errorEl.textContent = 'Informe uma senha com pelo menos 4 caracteres.';
      return;
    }

    const derivedName = nameInput?.value.trim() || email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    state.user = { name: derivedName, email };
    navigate('#/solicitacao/revisao');
  });

  // Review submit (Tela 07 -> Tela 08)
  document.getElementById('submitRequestBtn')?.addEventListener('click', () => {
    state.lastSubmitted = {
      route: getSelectedRoute(),
      guide: getSelectedGuide(),
      date: state.selectedDate,
      participants: state.participants,
      status: 'AGUARDANDO_CONFIRMACAO_GUIA'
    };
    navigate('#/solicitacao/enviada');
  });
}

function getV2Context() {
  return {
    state,
    icons,
    navigate,
    getRouteInfo,
    formatDatePt,
    isDayUnavailable,
    ensureDefaultDate,
    MONTHS_PT,
    render
  };
}

function render() {
  const path = getRouteInfo();
  const app = document.getElementById('app');
  const screens = getActiveScreens();
  const screen = screens[getCurrentScreenIndex()];
  let html = '';

  if (state.version === 'v2') {
    const ctx = getV2Context();
    if (state.viewMode === 'flow') {
      html = renderFlowViewV2(ctx);
    } else {
      const modeLabel = state.viewMode === 'wireframe' ? '01 — Baixa fidelidade' : '02 — Alta fidelidade';
      const subbar = `<div class="proto-subbar">Versão v2 (Remodelada) • ${modeLabel} • Tela 0${screen.id} — ${screen.name}</div>`;
      html = subbar + renderScreenV2(ctx, path);
    }
    app.innerHTML = `<div class="page-shell" data-mode="${state.viewMode}" data-site-version="v2">${renderProtoBar()}${html}</div>`;
    bindEvents();
    bindEventsV2(ctx);
    setupRevealObserver();
    return;
  }

  if (state.viewMode === 'flow') {
    html = renderFlowView();
  } else {
    const modeLabel = state.viewMode === 'wireframe' ? '01 — Baixa fidelidade' : '02 — Alta fidelidade';
    const subbar = `<div class="proto-subbar">Versão v1 (Original) • ${modeLabel} • Tela 0${screen.id} — ${screen.name}</div>`;

    if (path === '/' || path === '') {
      html = subbar + renderHome();
    } else if (path === '/roteiros') {
      html = subbar + renderExplore();
    } else if (path.startsWith('/roteiros/')) {
      html = subbar + renderRouteDetail(path.replace('/roteiros/', ''));
    } else if (path.startsWith('/guias/')) {
      html = subbar + renderGuideProfile(path.replace('/guias/', ''));
    } else if (path === '/solicitacao/data') {
      html = subbar + renderDateSelection();
    } else if (path === '/acesso') {
      html = subbar + renderAuth();
    } else if (path === '/solicitacao/revisao') {
      html = subbar + renderReview();
    } else if (path === '/solicitacao/enviada') {
      html = subbar + renderSent();
    } else {
      html = subbar + renderHome();
    }
  }

  app.innerHTML = `<div class="page-shell" data-mode="${state.viewMode}" data-site-version="v1">${renderProtoBar()}${html}</div>`;
  bindEvents();
  setupRevealObserver();
}

window.addEventListener('hashchange', () => {
  render();
  window.scrollTo(0, 0);
});

render();
