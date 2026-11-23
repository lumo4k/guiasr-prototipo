import {
  ROUTES_V2,
  GUIDES_V2,
  CIRCUITS_V2,
  PROFILES_V2,
  GUIDE_SPECIALTY_FILTERS,
  MEETING_POINTS,
  CANCELLATION_POLICY
} from './data-v2.js';

function getSelectedRouteV2(state) {
  return ROUTES_V2.find((r) => r.slug === state.selectedRouteSlug) || ROUTES_V2[0];
}

function getSelectedGuideV2(state) {
  return GUIDES_V2[state.selectedGuideId] || GUIDES_V2['carlos-mendes'];
}

function computeEstimatedPrice(guide, state) {
  if (state.v2.modality === 'group') {
    return state.v2.durationOption === 'half' ? guide.pricing.groupHalfDay : guide.pricing.groupFullDay;
  }
  const hours = state.v2.privateHours || 5;
  const hourly = state.v2.transportOption === 'guide-car'
    ? guide.pricing.privateDriverHour
    : guide.pricing.privateCompanionHour;
  return hours * hourly;
}

function renderStars(rating) {
  return `<span class="v2-rating-badge" aria-label="Avaliação ${rating} de 5">★ ${rating.toFixed(1)}</span>`;
}

function renderGuideBadges(guide) {
  return `
    ${guide.isTopGuide ? `<span class="v2-badge-top" title="Entre os guias mais bem avaliados da plataforma">★ Top Guia</span>` : ''}
    ${guide.isPartner ? `<span class="v2-badge-partner" title="Guia parceiro oficial do GuiaSR">✓ Parceiro GuiaSR</span>` : ''}
  `;
}

function renderHeaderV2(ctx, activeSection) {
  const { state, icons } = ctx;
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
          <a href="#/guias" class="nav-link ${activeSection === 'guides' ? 'is-active' : ''}">Guias credenciados</a>
        </nav>

        <div class="header-actions">
          <button type="button" class="v2-support-pill" id="v2SupportBtn" title="Canal de suporte demonstrativo">
            ${icons.shield} Suporte
          </button>
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
          <a href="#/guias" class="mobile-nav-link ${activeSection === 'guides' ? 'is-active' : ''}">Guias credenciados</a>
          <a href="#/acesso" class="mobile-nav-link">${userLabel}</a>
        </div>
      </div>
    </header>
    ${state.v2.supportOpen ? `
      <div class="v2-support-banner" role="status">
        <div class="container v2-support-banner-inner">
          <div>
            <strong>Central de Suporte GuiaSR (demonstrativo):</strong>
            Dúvidas sobre roteiros, remarcações ou verificação Cadastur? Atendimento orientativo das 08h às 18h via suporte@guiasr.demo.
          </div>
          <button type="button" class="v2-support-close" id="v2SupportClose" aria-label="Fechar aviso de suporte">Fechar</button>
        </div>
      </div>
    ` : ''}
  `;
}

function renderFooterV2(ctx) {
  const { icons } = ctx;
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <a href="#/" class="brand brand--light">
          <span class="brand-mark">${icons.leaf}</span>
          <span>Guia<span class="brand-sr">SR</span></span>
        </a>
        <span>Versão v2 • Remodelada com dados das pesquisas e Boletim ASGUIT 2025</span>
        <span>Protótipo acadêmico • FATEC São Roque (dados demonstrativos)</span>
      </div>
    </footer>
  `;
}

function renderRouteCardV2(ctx, route) {
  const { icons } = ctx;
  return `
    <article class="route-card v2-route-card reveal">
      <a href="#/roteiros/${route.slug}" class="route-card-media">
        <img src="${route.image}" alt="${route.title}" loading="lazy" />
        <span class="category-pill">${route.circuit}</span>
        ${route.accessible ? `<span class="v2-access-pill" title="Roteiro com acessibilidade">Acessível</span>` : ''}
      </a>
      <div class="route-card-body">
        <div class="v2-card-meta-row">
          <span class="route-meta">${icons.clock} ${route.durationLabel}</span>
          <span class="v2-rating-inline">★ ${route.rating.toFixed(1)} <small>(${route.reviewsCount} demo)</small></span>
        </div>
        <h3 class="route-card-title">${route.title}</h3>
        <p class="route-card-desc">${route.shortDescription}</p>
        <div class="v2-card-tags">
          ${route.profiles.slice(0, 2).map((p) => `<span class="v2-mini-tag">${p}</span>`).join('')}
        </div>
        <div class="v2-card-footer">
          <div class="v2-card-price">
            <small>Guia a partir de</small>
            <strong>R$ ${route.priceFrom}</strong>
          </div>
          <a href="#/roteiros/${route.slug}" class="card-link" style="margin-top: 0;">Ver detalhes ${icons.arrowRight}</a>
        </div>
      </div>
    </article>
  `;
}

// =========================================
// TELA 01 — INÍCIO (v2)
// =========================================
function renderHomeV2(ctx) {
  const { state, icons } = ctx;
  const featured = ROUTES_V2.filter((r) => r.featured);

  return `
    ${renderHeaderV2(ctx, 'home')}
    <main class="page-main">
      <section class="hero v2-hero">
        <div class="hero-media">
          <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=85" alt="Paisagem de vinhedos e natureza em São Roque" />
        </div>
        <div class="hero-content">
          <span class="eyebrow eyebrow--accent">Toda São Roque em um só lugar</span>
          <h1 class="hero-title">Muito além da Rota do Vinho.</h1>
          <p class="hero-subtitle">
            Explore roteiros digitais pela cidade inteira — vinícolas, centro histórico, trilhas e turismo rural — ou contrate um guia local credenciado com preço transparente.
          </p>
          <form class="search-bar" id="v2HomeSearchForm">
            <span class="search-bar-icon">${icons.search}</span>
            <input type="text" id="v2HomeSearchInput" placeholder="Busque por circuito, vinícola, Brasital, trilha..." value="${state.v2.filters.query}" aria-label="Buscar experiência em São Roque" />
            <button type="submit" class="btn-primary">Buscar</button>
          </form>

          <div class="v2-profile-shortcuts" aria-label="Filtrar por perfil de viagem">
            <span>Qual é o seu perfil?</span>
            <div class="v2-shortcut-chips">
              ${PROFILES_V2.filter((p) => p.id !== 'all').map((p) => `
                <button type="button" class="v2-shortcut-chip" data-v2-profile-jump="${p.id}">${p.label}</button>
              `).join('')}
            </div>
          </div>

          <a href="#/roteiros" class="hero-link">Explorar todos os ${ROUTES_V2.length} roteiros ${icons.arrowRight}</a>
        </div>
      </section>

      <!-- Faixa de Confiança baseada em V07 (95,2% de segurança quando presente) -->
      <section class="v2-trust-strip" aria-label="Pilares de confiança do GuiaSR">
        <div class="container v2-trust-grid">
          <div class="v2-trust-item">
            <span class="v2-trust-icon">★</span>
            <div>
              <strong>Avaliações transparentes</strong>
              <small>Notas e relatos reais por perfil (demo)</small>
            </div>
          </div>
          <div class="v2-trust-item">
            <span class="v2-trust-icon">${icons.shield}</span>
            <div>
              <strong>Verificação Cadastur</strong>
              <small>Guias profissionais com registro validado</small>
            </div>
          </div>
          <div class="v2-trust-item">
            <span class="v2-trust-icon">${icons.clock}</span>
            <div>
              <strong>Preço e cancelamento claros</strong>
              <small>Sem taxas ocultas • regras antes de solicitar</small>
            </div>
          </div>
          <div class="v2-trust-item">
            <span class="v2-trust-icon">${icons.users}</span>
            <div>
              <strong>Suporte dedicado</strong>
              <small>Apoio em dúvidas e remarcações</small>
            </div>
          </div>
        </div>
      </section>

      <!-- Diferenciação clara: Roteiro Digital vs Guia Profissional (resolve V05) -->
      <section class="section v2-compare-section">
        <div class="container">
          <div class="section-header reveal">
            <div>
              <span class="eyebrow">Como funciona o GuiaSR</span>
              <h2 class="section-title">Escolha como quer explorar São Roque</h2>
            </div>
          </div>
          <div class="v2-compare-grid reveal">
            <div class="v2-compare-card">
              <span class="v2-compare-badge">Opção 1 • Autoguiado</span>
              <h3>Acessar Roteiro Digital</h3>
              <p>Ideal para quem quer planejar por conta própria com paradas, horários de funcionamento, curiosidades e dicas de movimento.</p>
              <ul class="v2-check-list">
                <li>${icons.check} Paradas ordenadas e horários de funcionamento</li>
                <li>${icons.check} Avisos de acessibilidade e movimento nos fins de semana</li>
                <li>${icons.check} Sem necessidade de agendar data ou guia</li>
              </ul>
              <a href="#/roteiros" class="btn-outline">Explorar roteiros digitais</a>
            </div>
            <div class="v2-compare-card v2-compare-card--highlight">
              <span class="v2-compare-badge v2-compare-badge--accent">Opção 2 • Serviço Presencial</span>
              <h3>Contratar Guia Profissional</h3>
              <p>Para tours privativos (4h a 6h, com retirada no hotel/Airbnb) ou grupos e excursões (período integral 8h) com acompanhamento local.</p>
              <ul class="v2-check-list">
                <li>${icons.check} Guia credenciado com aprovação manual da agenda</li>
                <li>${icons.check} Apoio em reservas de almoço e visitas técnicas</li>
                <li>${icons.check} Preço transparente e política de cancelamento clara</li>
              </ul>
              <a href="#/guias" class="btn-primary">Explorar guias credenciados ${icons.arrowRight}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top: 24px;">
        <div class="container">
          <div class="section-header reveal">
            <div>
              <span class="eyebrow">Experiências selecionadas</span>
              <h2 class="section-title">Roteiros em destaque</h2>
            </div>
            <a href="#/roteiros" class="card-link" style="margin-top: 0;">Ver catálogo completo ${icons.arrowRight}</a>
          </div>
          <div class="routes-grid">
            ${featured.map((r) => renderRouteCardV2(ctx, r)).join('')}
          </div>
        </div>
      </section>

      <!-- Circuitos territoriais reais de São Roque (Boletim ASGUIT + V09/V10) -->
      <section class="categories-section">
        <div class="container categories-layout">
          <div class="reveal">
            <span class="eyebrow">Toda a cidade de São Roque</span>
            <h2 class="section-title">Explore por circuito territorial</h2>
            <p class="v2-muted-copy" style="margin-top: 12px;">
              Além do tradicional Roteiro do Vinho, descubra o Centro Histórico, o Morro do Saboó e o turismo rural de Raposo e Darcy Penteado.
            </p>
            <div class="v2-season-box">
              <strong>Dica de sazonalidade e trânsito (ASGUIT 2025):</strong>
              <p>91% das excursões chegam aos fins de semana e feriados (pico de maio a agosto). Se busca menos filas e mais guias disponíveis, prefira dias úteis para passeios privativos.</p>
            </div>
          </div>
          <div class="categories-grid reveal">
            ${CIRCUITS_V2.map((circ) => `
              <a href="#/roteiros" class="category-row" data-v2-circuit-jump="${circ.id}">
                <div class="category-row-left">
                  <span class="category-num">${circ.number}</span>
                  <div>
                    <div class="category-name">${circ.name}</div>
                    <div class="category-sub">${circ.subtitle}</div>
                    <div class="v2-circuit-hint">${circ.shareHint}</div>
                  </div>
                </div>
                <span>${icons.arrowRight}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 02 — EXPLORAR ROTEIROS (v2)
// =========================================
function getFilteredRoutesV2(state) {
  const f = state.v2.filters;
  const q = f.query.trim().toLowerCase();

  let list = ROUTES_V2.filter((route) => {
    if (f.circuit !== 'Todos' && route.circuit !== f.circuit) return false;
    if (f.profile !== 'all' && !route.profiles.includes(f.profile)) return false;
    if (f.duration !== 'all' && route.durationBucket !== f.duration) return false;
    if (f.modality !== 'all' && !route.modalitiesSupported.includes(f.modality)) return false;
    if (f.accessibleOnly && !route.accessible) return false;
    if (q) {
      const hay = `${route.title} ${route.circuit} ${route.category} ${route.shortDescription} ${route.description} ${route.stops.map((s) => s.name).join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (f.sort === 'rating') {
    list = [...list].sort((a, b) => b.rating - a.rating);
  } else if (f.sort === 'price_asc') {
    list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
  } else if (f.sort === 'shortest') {
    list = [...list].sort((a, b) => a.durationHours - b.durationHours);
  }
  return list;
}

function renderExploreResultsV2(ctx, filtered) {
  const { state } = ctx;
  return `
    <div class="v2-crowd-alert">
      <strong>Planejamento inteligente (aviso orientativo):</strong>
      Aos domingos e no inverno (maio–agosto), a Estrada do Vinho tem maior movimento. Para passeios mais tranquilos, considere dias úteis ou circuitos alternativos como Centro Histórico e Raposo.
    </div>

    <div class="explore-toolbar">
      <p class="results-count"><strong>${filtered.length}</strong> ${filtered.length === 1 ? 'roteiro encontrado' : 'roteiros encontrados'} em São Roque</p>
      <select id="v2SortSelect" class="select-input sort-select" aria-label="Ordenar roteiros">
        <option value="relevant" ${state.v2.filters.sort === 'relevant' ? 'selected' : ''}>Mais relevantes</option>
        <option value="rating" ${state.v2.filters.sort === 'rating' ? 'selected' : ''}>Melhor avaliados</option>
        <option value="price_asc" ${state.v2.filters.sort === 'price_asc' ? 'selected' : ''}>Menor preço de guia</option>
        <option value="shortest" ${state.v2.filters.sort === 'shortest' ? 'selected' : ''}>Menor duração</option>
      </select>
    </div>

    ${filtered.length > 0 ? `
      <div class="routes-grid">
        ${filtered.map((r) => renderRouteCardV2(ctx, r)).join('')}
      </div>
    ` : `
      <div class="empty-state">
        <h3>Nenhum roteiro encontrado com esses filtros</h3>
        <p>Tente remover um dos filtros de perfil, circuito ou acessibilidade para ver mais opções em São Roque.</p>
        <button type="button" class="btn-outline" id="v2EmptyResetBtn">Limpar filtros</button>
      </div>
    `}
  `;
}

function renderExploreV2(ctx) {
  const { state, icons } = ctx;
  const f = state.v2.filters;
  const filtered = getFilteredRoutesV2(state);
  const circuits = ['Todos', ...CIRCUITS_V2.map((c) => c.id)];

  return `
    ${renderHeaderV2(ctx, 'explore')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/" class="back-link">${icons.chevronLeft} Voltar ao início</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Catálogo completo de São Roque</span>
          <h1>Explore por perfil e circuito</h1>
          <p>Compare preço, avaliações, horários das paradas e acessibilidade antes de escolher.</p>
          <div class="explore-search-wrap">
            <form class="search-bar" id="v2ExploreSearchForm">
              <span class="search-bar-icon">${icons.search}</span>
              <input type="text" id="v2ExploreSearchInput" placeholder="Busque por Brasital, vinícola, Saboó, alcachofra..." value="${f.query}" aria-label="Buscar roteiros" />
              <button type="submit" class="btn-primary">Buscar</button>
            </form>
          </div>
        </div>

        <div class="explore-layout">
          <aside class="filters-panel" aria-label="Filtros de roteiros">
            <div class="filters-header">
              <h2>Filtros</h2>
              <button type="button" class="link-clear" id="v2ClearFiltersBtn">Limpar</button>
            </div>

            <div class="filter-group">
              <span class="filter-label">Circuito em São Roque</span>
              <div class="radio-list">
                ${circuits.map((circ) => `
                  <label class="radio-item ${f.circuit === circ ? 'is-selected' : ''}">
                    <span>${circ}</span>
                    <input type="radio" name="v2circuit" value="${circ}" ${f.circuit === circ ? 'checked' : ''} />
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="v2ProfileSelect">Perfil / Ocasião</label>
              <select id="v2ProfileSelect" class="select-input">
                ${PROFILES_V2.map((p) => `
                  <option value="${p.id}" ${f.profile === p.id ? 'selected' : ''}>${p.label}</option>
                `).join('')}
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="v2DurationSelect">Duração</label>
              <select id="v2DurationSelect" class="select-input">
                <option value="all" ${f.duration === 'all' ? 'selected' : ''}>Todas as durações</option>
                <option value="short" ${f.duration === 'short' ? 'selected' : ''}>Curto (até 3h)</option>
                <option value="medium" ${f.duration === 'medium' ? 'selected' : ''}>Privativo padrão (4h a 6h)</option>
                <option value="full" ${f.duration === 'full' ? 'selected' : ''}>Período integral (8h)</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-label" for="v2ModalitySelect">Modalidade</label>
              <select id="v2ModalitySelect" class="select-input">
                <option value="all" ${f.modality === 'all' ? 'selected' : ''}>Todas as modalidades</option>
                <option value="Privativo" ${f.modality === 'Privativo' ? 'selected' : ''}>Tour Privativo</option>
                <option value="Pequenos grupos" ${f.modality === 'Pequenos grupos' ? 'selected' : ''}>Pequenos grupos</option>
                <option value="Grupo / Excursão" ${f.modality === 'Grupo / Excursão' ? 'selected' : ''}>Grupo / Excursão (van/ônibus)</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="v2-checkbox-row">
                <input type="checkbox" id="v2AccessibleOnly" ${f.accessibleOnly ? 'checked' : ''} />
                <span>Apenas roteiros acessíveis</span>
              </label>
            </div>
          </aside>

          <section id="v2ExploreResultsArea">
            ${renderExploreResultsV2(ctx, filtered)}
          </section>
        </div>
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 03 — DETALHES DO ROTEIRO (v2)
// =========================================
function renderRouteDetailV2(ctx, slug) {
  const { state, icons } = ctx;
  const route = ROUTES_V2.find((r) => r.slug === slug) || ROUTES_V2[0];
  state.selectedRouteSlug = route.slug;
  const routeGuideIds = route.guideIds && route.guideIds.length ? route.guideIds : [route.guideId];
  if (!routeGuideIds.includes(state.selectedGuideId)) {
    state.selectedGuideId = routeGuideIds[0];
  }
  const routeGuides = routeGuideIds.map((id) => GUIDES_V2[id]).filter(Boolean);
  const guide = GUIDES_V2[state.selectedGuideId] || routeGuides[0] || GUIDES_V2['carlos-mendes'];

  return `
    ${renderHeaderV2(ctx, 'explore')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/roteiros" class="back-link">${icons.chevronLeft} Voltar aos roteiros</a>
        </div>

        <section class="route-banner reveal">
          <img src="${route.image}" alt="${route.title}" />
          <div class="route-banner-content">
            <div class="v2-banner-pills">
              <span class="route-banner-pill">${route.circuit}</span>
              ${renderStars(route.rating)}
              ${route.accessible ? `<span class="v2-banner-access">Acessível</span>` : ''}
            </div>
            <h1>${route.title}</h1>
            <span class="route-banner-time">${icons.clock} ${route.durationLong} • Guia a partir de R$ ${route.priceFrom}</span>
          </div>
        </section>

        <div class="detail-grid">
          <div>
            <div class="reveal">
              <span class="eyebrow">Sobre o roteiro</span>
              <h2 class="detail-section-title">${route.subtitle}</h2>
              <p class="detail-lead">${route.description}</p>
            </div>

            <div class="v2-info-cards-grid reveal">
              <div class="v2-info-card">
                <small>Transporte e encontro</small>
                <p>${route.transportInfo}</p>
              </div>
              <div class="v2-info-card">
                <small>Esforço físico e acessibilidade</small>
                <p><strong>Esforço: ${route.effort}.</strong> ${route.accessibilityNote}</p>
              </div>
              <div class="v2-info-card v2-info-card--warn">
                <small>Movimento e melhor horário (orientativo)</small>
                <p>${route.crowdTip}</p>
              </div>
            </div>

            <div class="v2-curiosity-box reveal">
              <span class="eyebrow">Curiosidade local</span>
              <p>${route.curiosity}</p>
            </div>

            <!-- Paradas com horários de funcionamento (resolve V10) -->
            <div class="v2-stops-block reveal">
              <h3>Locais visitados e horários de funcionamento</h3>
              <p class="v2-muted-copy" style="margin-bottom: 16px;">Horários de referência sujeitos a confirmação em feriados e eventos locais.</p>
              <div class="v2-stops-list">
                ${route.stops.map((stop, idx) => `
                  <div class="v2-stop-item">
                    <span class="v2-stop-num">${idx + 1}</span>
                    <div>
                      <div class="v2-stop-head">
                        <strong>${stop.name}</strong>
                        <span class="v2-stop-hours">${icons.clock} ${stop.hours}</span>
                      </div>
                      <p>${stop.note}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="v2-inc-exc-grid reveal">
              <div class="v2-inc-box">
                <h3>O que está incluído</h3>
                <ul class="highlights-list" style="margin-bottom: 0;">
                  ${route.includes.map((item) => `<li>${icons.check} <span>${item}</span></li>`).join('')}
                </ul>
              </div>
              <div class="v2-exc-box">
                <h3>Não incluído (transparência)</h3>
                <ul class="v2-plain-list">
                  ${route.excludes.map((item) => `<li>• ${item}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="map-block reveal" style="margin-top: 32px;">
              <h3>Mapa ilustrativo do percurso</h3>
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
                <p class="map-caption">Mapa ilustrativo das paradas em São Roque. Este protótipo não utiliza GPS ou trânsito em tempo real.</p>
              </div>
            </div>

            <!-- Avaliações demonstrativas (resolve V04 e V07) -->
            <div class="v2-reviews-block reveal">
              <div class="v2-reviews-head">
                <h3>Avaliações de viajantes <small>(ilustrativas)</small></h3>
                <span>★ ${route.rating.toFixed(1)} • ${route.reviewsCount} avaliações</span>
              </div>
              <div class="v2-reviews-list">
                ${route.reviews.map((rev) => `
                  <article class="v2-review-card">
                    <div class="v2-review-top">
                      <strong>${rev.author}</strong>
                      <span>★ ${rev.rating} • ${rev.date}</span>
                    </div>
                    <p>${rev.text}</p>
                  </article>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Card lateral remodelado: múltiplos guias especializados + nova copy -->
          <aside class="sticky-card reveal">
            <span class="eyebrow">Acompanhamento profissional</span>
            <div class="v2-price-banner">
              <small>Guiamento privativo a partir de</small>
              <div class="price-value">R$ ${guide.pricing.privateTypicalTotal}</div>
              <p class="v2-price-note">R$ ${guide.pricing.privateCompanionHour}/h acompanhante • roteiro digital gratuito (demo)</p>
            </div>

            <div class="v2-route-guides-head">
              <strong>Escolha o guia ideal para este roteiro</strong>
              <small>${routeGuides.length} especialistas disponíveis</small>
            </div>

            <div class="v2-route-guides-list" role="radiogroup" aria-label="Guias disponíveis para este roteiro">
              ${routeGuides.map((g) => {
                const isSelected = g.id === guide.id;
                return `
                  <button type="button" class="v2-route-guide-option ${isSelected ? 'is-selected' : ''}" data-v2-pick-guide="${g.id}" aria-pressed="${isSelected ? 'true' : 'false'}">
                    <img src="${g.avatar}" alt="${g.name}" class="v2-rg-avatar" />
                    <div class="v2-rg-info">
                      <div class="v2-rg-top">
                        <strong>${g.name}</strong>
                        <span class="v2-rg-rating">★ ${g.rating.toFixed(1)}</span>
                      </div>
                      <span class="v2-rg-spec">${g.shortRole}</span>
                      <div class="v2-rg-badges">
                        ${g.isTopGuide ? `<span class="v2-badge-top v2-badge--xs">★ Top Guia</span>` : ''}
                        ${g.isPartner ? `<span class="v2-badge-partner v2-badge--xs">✓ Parceiro</span>` : ''}
                      </div>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>

            <p class="guide-quote" style="margin-top: 14px;">${guide.quote}</p>

            <div class="demo-note-row">
              ${icons.shield}
              <span><strong>Credenciamento Cadastur:</strong> todos os perfis reais passam por validação oficial. Dados ilustrativos neste protótipo.</span>
            </div>

            <a href="#/guias/${guide.id}" class="btn-primary btn-full">Ver perfil de ${guide.name.split(' ')[0]} ${icons.arrowRight}</a>
            <a href="#/solicitacao/data" class="btn-outline btn-full" style="margin-top: 10px;">Agendar com ${guide.name.split(' ')[0]} ${icons.calendar}</a>

            <a href="#/guias" class="card-link" style="margin-top: 14px; font-size: 0.84rem;">Ver todos os ${Object.keys(GUIDES_V2).length} guias credenciados ${icons.arrowRight}</a>

            <div class="v2-digital-note">
              <strong>Prefere explorar no seu ritmo?</strong>
              <p>Use gratuitamente todas as paradas, horários de funcionamento e curiosidades acima como roteiro digital autoguiado.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 04 — GALERIA DE GUIAS CREDENCIADOS (v2)
// =========================================
function getFilteredGuidesV2(state) {
  const gf = state.v2.guideFilters;
  const q = (gf.query || '').trim().toLowerCase();
  return Object.values(GUIDES_V2).filter((g) => {
    if (gf.specialty !== 'Todas' && g.specialtyCategory !== gf.specialty) return false;
    if (gf.badge === 'top' && !g.isTopGuide) return false;
    if (gf.badge === 'partner' && !g.isPartner) return false;
    if (q) {
      const hay = `${g.name} ${g.role} ${g.shortRole} ${g.specialtyCategory} ${g.area} ${g.languages.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
}

function renderGuidesGalleryV2(ctx) {
  const { state, icons } = ctx;
  const gf = state.v2.guideFilters;
  const filtered = getFilteredGuidesV2(state);

  return `
    ${renderHeaderV2(ctx, 'guides')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/" class="back-link">${icons.chevronLeft} Voltar ao início</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Guias credenciados em São Roque</span>
          <h1>Encontre o especialista ideal para o seu passeio</h1>
          <p>Compare especialidades, avaliações, idiomas e valores transparentes. Cada profissional atua com autonomia e registro Cadastur (dados demonstrativos).</p>
          <div class="explore-search-wrap">
            <form class="search-bar" id="v2GuideSearchForm">
              <span class="search-bar-icon">${icons.search}</span>
              <input type="text" id="v2GuideSearchInput" placeholder="Busque por nome, vinícolas, trilhas, excursões ou idioma..." value="${gf.query}" aria-label="Buscar guias" />
              <button type="submit" class="btn-primary">Buscar</button>
            </form>
          </div>
        </div>

        <!-- Filtros rápidos de selos e especialidades -->
        <div class="v2-gallery-toolbar reveal">
          <div class="v2-badge-filter-row" role="group" aria-label="Filtrar por destaque">
            <button type="button" class="v2-filter-pill ${gf.badge === 'all' ? 'is-active' : ''}" data-v2-guide-badge="all">Todos (${Object.keys(GUIDES_V2).length})</button>
            <button type="button" class="v2-filter-pill v2-filter-pill--top ${gf.badge === 'top' ? 'is-active' : ''}" data-v2-guide-badge="top">★ Top Guia (melhores estrelas)</button>
            <button type="button" class="v2-filter-pill v2-filter-pill--partner ${gf.badge === 'partner' ? 'is-active' : ''}" data-v2-guide-badge="partner">✓ Parceiro Oficial GuiaSR</button>
          </div>

          <div class="v2-spec-filter-row" role="group" aria-label="Filtrar por especialidade">
            ${GUIDE_SPECIALTY_FILTERS.map((sp) => `
              <button type="button" class="v2-spec-chip ${gf.specialty === sp ? 'is-active' : ''}" data-v2-guide-spec="${sp}">${sp}</button>
            `).join('')}
          </div>
        </div>

        <p class="results-count" style="margin-bottom: 18px;">
          <strong>${filtered.length}</strong> ${filtered.length === 1 ? 'guia encontrado' : 'guias encontrados'} em São Roque
        </p>

        ${filtered.length > 0 ? `
          <div class="v2-guides-gallery-grid">
            ${filtered.map((g) => `
              <article class="v2-guide-gallery-card reveal">
                <div class="v2-gg-header">
                  <img src="${g.avatar}" alt="${g.name}" class="v2-gg-avatar" loading="lazy" />
                  <div class="v2-gg-head-info">
                    <div class="v2-gg-badges">
                      ${renderGuideBadges(g)}
                    </div>
                    <h2>${g.name}</h2>
                    <span class="v2-gg-spec">${g.specialtyCategory}</span>
                    <div class="v2-gg-rating-row">
                      <strong>★ ${g.rating.toFixed(1)}</strong>
                      <span>(${g.reviewsCount} avaliações demo)</span>
                      <span>• ${g.completedTours} passeios</span>
                    </div>
                  </div>
                </div>

                <p class="v2-gg-role">${g.role}</p>
                <p class="v2-gg-quote">${g.quote}</p>

                <div class="v2-gg-chips">
                  ${g.languages.map((lang) => `<span class="v2-mini-tag">${icons.globe} ${lang}</span>`).join('')}
                  <span class="v2-mini-tag">${icons.shield} Cadastur (demo)</span>
                </div>

                <div class="v2-gg-footer">
                  <div class="v2-card-price">
                    <small>Privativo a partir de</small>
                    <strong>R$ ${g.pricing.privateCompanionHour}/h</strong>
                  </div>
                  <div class="v2-gg-actions">
                    <a href="#/guias/${g.id}" class="btn-outline">Ver perfil</a>
                    <button type="button" class="btn-primary" data-v2-book-guide="${g.id}">Ver agenda ${icons.calendar}</button>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <h3>Nenhum guia encontrado com esses filtros</h3>
            <p>Tente remover o filtro de especialidade ou destaque para ver todos os guias credenciados.</p>
            <button type="button" class="btn-outline" id="v2ResetGuideFiltersBtn">Mostrar todos os guias</button>
          </div>
        `}
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 05 — PERFIL DO GUIA (v2)
// =========================================
function renderGuideProfileV2(ctx, guideId) {
  const { state, icons } = ctx;
  const guide = GUIDES_V2[guideId] || GUIDES_V2['carlos-mendes'];
  state.selectedGuideId = guide.id;
  const route = getSelectedRouteV2(state);
  const offeredRoutes = ROUTES_V2.filter((r) => (r.guideIds || [r.guideId]).includes(guide.id));
  const otherGuides = Object.values(GUIDES_V2).filter((g) => g.id !== guide.id).slice(0, 3);

  return `
    ${renderHeaderV2(ctx, 'guides')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar v2-back-flex">
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="#/guias" class="back-link">${icons.chevronLeft} Todos os guias credenciados</a>
            <a href="#/roteiros/${route.slug}" class="back-link">Voltar ao roteiro</a>
          </div>
          <div class="v2-guide-switcher">
            <span>Outros especialistas:</span>
            ${otherGuides.map((g) => `<a href="#/guias/${g.id}" class="v2-mini-link">${g.name.split(' ')[0]}</a>`).join('')}
          </div>
        </div>

        <section class="guide-hero-card reveal">
          <img src="${guide.avatar}" alt="${guide.name}" class="guide-avatar-lg" />
          <div class="guide-hero-info">
            <div class="v2-guide-badges">
              ${renderGuideBadges(guide)}
              <button type="button" class="v2-cadastur-pill" id="v2CadasturToggle" aria-expanded="${state.v2.cadasturInfoOpen ? 'true' : 'false'}">
                ${icons.shield} Cadastur demonstrativo <span class="v2-help-q">?</span>
              </button>
            </div>
            ${state.v2.cadasturInfoOpen ? `
              <div class="v2-cadastur-popover" role="note">
                <strong>O que é Cadastur?</strong> É o cadastro oficial obrigatório do Ministério do Turismo que habilita legalmente guias de turismo no Brasil. Na plataforma final, o administrador valida o registro antes de ativar o perfil; neste protótipo, os dados são demonstrativos.
              </div>
            ` : ''}
            <h1>${guide.name}</h1>
            <p class="guide-hero-role">${guide.role}</p>
            <div class="v2-guide-stats">
              <span>★ <strong>${guide.rating.toFixed(1)}</strong> (${guide.reviewsCount} avaliações)</span>
              <span>•</span>
              <span><strong>${guide.completedTours}</strong> atendimentos registrados (demo)</span>
              <span>•</span>
              <span>${guide.responseTime}</span>
            </div>
            <div class="chips-row">
              ${guide.languages.map((lang) => `<span class="chip">${icons.globe} ${lang}</span>`).join('')}
              <span class="chip">${guide.hasOwnVehicle ? 'Atende com carro próprio ou do visitante' : 'Atende no carro do visitante ou a pé'}</span>
            </div>
          </div>
          <div class="guide-price-box">
            <div class="price-label">Tabela transparente (ref. ASGUIT)</div>
            <div class="price-value">R$ ${guide.pricing.privateCompanionHour} <span>/ hora privativo</span></div>
            <p class="v2-price-sub">Grupos a partir de R$ ${guide.pricing.groupHalfDay} (meio período)</p>
            <a href="#/solicitacao/data" class="btn-primary">Ver agenda e simular ${icons.calendar}</a>
          </div>
        </section>

        <div class="detail-grid">
          <div>
            <div class="reveal">
              <span class="eyebrow">Apresentação</span>
              <h2 class="detail-section-title">Experiência local com autonomia e clareza</h2>
              <p class="detail-lead">${guide.bio}</p>
            </div>

            <!-- Tabela de preços transparente por modalidade (Guias G14 + ASGUIT p.50-51 + Viajantes V07) -->
            <div class="v2-pricing-table-card reveal">
              <h3>Preços por modalidade (valores demonstrativos de referência)</h3>
              <div class="v2-pricing-rows">
                <div class="v2-pricing-row">
                  <div>
                    <strong>Tour privativo — guia acompanhante</strong>
                    <small>No carro do visitante ou a pé • duração típica de 4h a 6h</small>
                  </div>
                  <span class="v2-pricing-val">R$ ${guide.pricing.privateCompanionHour}/h</span>
                </div>
                <div class="v2-pricing-row">
                  <div>
                    <strong>Tour privativo — guia motorista</strong>
                    <small>Com veículo do guia e retirada no hotel/Airbnb</small>
                  </div>
                  <span class="v2-pricing-val">R$ ${guide.pricing.privateDriverHour}/h</span>
                </div>
                <div class="v2-pricing-row">
                  <div>
                    <strong>Grupos e excursões — meio período (4h)</strong>
                    <small>Para vans, micro-ônibus ou ônibus fechados</small>
                  </div>
                  <span class="v2-pricing-val">R$ ${guide.pricing.groupHalfDay}</span>
                </div>
                <div class="v2-pricing-row">
                  <div>
                    <strong>Grupos e excursões — período integral (8h)</strong>
                    <small>Recepção no Portal Guaçu e acompanhamento completo</small>
                  </div>
                  <span class="v2-pricing-val">R$ ${guide.pricing.groupFullDay}</span>
                </div>
              </div>
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

            <div class="v2-reviews-block reveal">
              <div class="v2-reviews-head">
                <h3>Avaliações de viajantes <small>(ilustrativas)</small></h3>
                <span>★ ${guide.rating.toFixed(1)} • ${guide.reviewsCount} avaliações</span>
              </div>
              <div class="v2-reviews-list">
                ${guide.reviews.map((rev) => `
                  <article class="v2-review-card">
                    <div class="v2-review-top">
                      <strong>${rev.author}</strong>
                      <span>★ ${rev.rating} • ${rev.date}</span>
                    </div>
                    <small class="v2-review-profile">${rev.profile}</small>
                    <p>${rev.comment}</p>
                  </article>
                `).join('')}
              </div>
            </div>

            <div class="reveal" style="margin-top: 36px;">
              <h3>Roteiros conduzidos por ${guide.name.split(' ')[0]}</h3>
              <div class="guide-routes-mini">
                ${offeredRoutes.map((r) => renderRouteCardV2(ctx, r)).join('')}
              </div>
            </div>
          </div>

          <aside class="sticky-card reveal">
            <span style="color: var(--accent); display: inline-flex; margin-bottom: 10px;">${icons.shield}</span>
            <h3 style="font-size: 1.05rem; font-weight: 600;">Credenciais e segurança</h3>
            <p style="margin-top: 6px; font-size: 0.82rem; color: var(--text-muted);">
              O GuiaSR verifica o registro Cadastur antes de ativar perfis reais. Neste protótipo acadêmico, os dados abaixo são ilustrativos.
            </p>
            <div class="info-box-list">
              <div class="info-box-item">
                <small>Registro Cadastur</small>
                <strong>${guide.credentialStatus}</strong>
              </div>
              <div class="info-box-item">
                <small>Tempo de atuação</small>
                <strong>${guide.experienceYears}</strong>
              </div>
              <div class="info-box-item">
                <small>Modalidades aceitas</small>
                <strong>${guide.modalities.join(' • ')}</strong>
              </div>
              <div class="info-box-item">
                <small>Aprovação e agenda (M08)</small>
                <strong>Manual pelo guia • 1 atendimento/dia por padrão (evita conflitos)</strong>
              </div>
            </div>

            <div class="v2-policy-mini">
              <strong>Política de cancelamento</strong>
              <ul>
                ${CANCELLATION_POLICY.slice(0, 3).map((c) => `<li><span>${c.range}:</span> <strong>${c.refund}</strong></li>`).join('')}
              </ul>
            </div>

            <button type="button" class="btn-outline btn-full" style="margin-top: 14px;" data-v2-open-support>
              ${icons.shield} Precisa de ajuda? Suporte
            </button>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 05 — DATA, MODALIDADE E PONTO DE ENCONTRO (v2)
// =========================================
function renderDateSelectionV2(ctx) {
  const { state, icons, formatDatePt, isDayUnavailable, ensureDefaultDate, MONTHS_PT } = ctx;
  ensureDefaultDate();
  const route = getSelectedRouteV2(state);
  const guide = getSelectedGuideV2(state);
  const estimated = computeEstimatedPrice(guide, state);
  const isGroup = state.v2.modality === 'group';
  const maxParticipants = isGroup ? 45 : 8;
  if (state.participants > maxParticipants) state.participants = maxParticipants;

  const firstDow = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
  const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();
  const monthLabel = `${MONTHS_PT[state.calendarMonth]} ${state.calendarYear}`;

  let dayButtons = '';
  for (let i = 0; i < firstDow; i++) {
    dayButtons += `<span></span>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const unavailable = isDayUnavailable(state.calendarYear, state.calendarMonth, d);
    const dow = new Date(state.calendarYear, state.calendarMonth, d).getDay();
    const isWeekend = dow === 0 || dow === 6;
    const selected = state.selectedDate &&
      state.selectedDate.year === state.calendarYear &&
      state.selectedDate.month === state.calendarMonth &&
      state.selectedDate.day === d;

    dayButtons += `
      <button
        type="button"
        class="calendar-day ${unavailable ? 'is-unavailable' : ''} ${selected ? 'is-selected' : ''} ${!unavailable && isWeekend ? 'v2-day-busy' : ''}"
        ${unavailable ? 'disabled' : ''}
        data-day="${d}"
        title="${unavailable ? 'Indisponível' : (isWeekend ? 'Fim de semana: maior movimento' : 'Dia útil: mais tranquilo')}"
        aria-label="Dia ${d} de ${monthLabel}"
      >${d}</button>
    `;
  }

  return `
    ${renderHeaderV2(ctx, 'guides')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/guias/${guide.id}" class="back-link">${icons.chevronLeft} Voltar ao perfil do guia</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Planeje sua solicitação</span>
          <h1>Modalidade, data e ponto de encontro</h1>
          <p>Preencha os detalhes para que o guia confirme disponibilidade com agilidade e sem trocas excessivas de mensagens.</p>
        </div>

        <div class="booking-grid">
          <div class="reveal">
            <div class="selected-route-strip">
              <img src="${route.image}" alt="${route.title}" class="selected-route-thumb" />
              <div>
                <span class="eyebrow">${route.circuit}</span>
                <h3>${route.title}</h3>
                <p>com ${guide.name} • ★ ${guide.rating.toFixed(1)}</p>
              </div>
            </div>

            <!-- Modalidade (Privativo vs Grupo) -->
            <div class="v2-form-card">
              <h3>1. Tipo de atendimento</h3>
              <div class="v2-modality-toggle">
                <button type="button" class="v2-mod-btn ${!isGroup ? 'is-active' : ''}" data-v2-modality="private">
                  <strong>Tour Privativo</strong>
                  <small>1 a 8 pessoas • 4h a 6h • retirada na hospedagem</small>
                </button>
                <button type="button" class="v2-mod-btn ${isGroup ? 'is-active' : ''}" data-v2-modality="group">
                  <strong>Grupo / Excursão</strong>
                  <small>Van, micro ou ônibus • meio período ou integral (8h)</small>
                </button>
              </div>

              ${!isGroup ? `
                <div class="v2-inline-fields">
                  <div class="form-field">
                    <label for="v2PrivateHours">Duração desejada</label>
                    <select id="v2PrivateHours" class="select-input">
                      <option value="4" ${state.v2.privateHours === 4 ? 'selected' : ''}>4 horas (padrão compacto)</option>
                      <option value="5" ${state.v2.privateHours === 5 ? 'selected' : ''}>5 horas (recomendado)</option>
                      <option value="6" ${state.v2.privateHours === 6 ? 'selected' : ''}>6 horas (ritmo tranquilo)</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label for="v2TransportOption">Transporte</label>
                    <select id="v2TransportOption" class="select-input">
                      <option value="own-car" ${state.v2.transportOption === 'own-car' ? 'selected' : ''}>Carro próprio / guia acompanhante (R$ ${guide.pricing.privateCompanionHour}/h)</option>
                      <option value="guide-car" ${state.v2.transportOption === 'guide-car' ? 'selected' : ''}>Carro do guia / guia motorista (R$ ${guide.pricing.privateDriverHour}/h)</option>
                    </select>
                  </div>
                </div>
              ` : `
                <div class="v2-inline-fields">
                  <div class="form-field">
                    <label for="v2DurationOption">Diária de grupo</label>
                    <select id="v2DurationOption" class="select-input">
                      <option value="full" ${state.v2.durationOption === 'full' ? 'selected' : ''}>Período integral — 8h (R$ ${guide.pricing.groupFullDay})</option>
                      <option value="half" ${state.v2.durationOption === 'half' ? 'selected' : ''}>Meio período — 4h (R$ ${guide.pricing.groupHalfDay})</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label for="v2VehicleType">Veículo do grupo</label>
                    <select id="v2VehicleType" class="select-input">
                      <option value="Van" ${state.v2.vehicleType === 'Van' ? 'selected' : ''}>Van (tarifa reduzida em vários locais)</option>
                      <option value="Micro-ônibus" ${state.v2.vehicleType === 'Micro-ônibus' ? 'selected' : ''}>Micro-ônibus</option>
                      <option value="Ônibus" ${state.v2.vehicleType === 'Ônibus' ? 'selected' : ''}>Ônibus de excursão</option>
                    </select>
                  </div>
                </div>
              `}
            </div>

            <!-- Calendário com legenda de movimento -->
            <div class="calendar-card" style="margin-top: 20px;">
              <h3 style="font-size: 1rem; margin-bottom: 14px;">2. Escolha a data</h3>
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
                <span class="legend-item"><span class="legend-dot legend-dot--available"></span> Dia útil (tranquilo)</span>
                <span class="legend-item"><span class="legend-dot v2-legend-busy"></span> Fim de semana (maior movimento)</span>
                <span class="legend-item"><span class="legend-dot legend-dot--selected"></span> Selecionada</span>
                <span class="legend-item"><span class="legend-dot legend-dot--unavailable"></span> Indisponível</span>
              </div>
            </div>

            <!-- Ponto de encontro, horário e preferências (resolve G18, G19 e Boletim ASGUIT) -->
            <div class="v2-form-card" style="margin-top: 20px;">
              <h3>3. Ponto de encontro, horário e preferências</h3>
              <div class="v2-inline-fields">
                <div class="form-field">
                  <label for="v2MeetingPoint">Ponto de encontro</label>
                  <select id="v2MeetingPoint" class="select-input">
                    ${MEETING_POINTS.map((mp) => `
                      <option value="${mp.id}" ${state.v2.meetingPoint === mp.id ? 'selected' : ''}>${mp.label}</option>
                    `).join('')}
                  </select>
                </div>
                <div class="form-field">
                  <label for="v2StartTime">Horário de início</label>
                  <select id="v2StartTime" class="select-input">
                    <option value="08:30" ${state.v2.startTime === '08:30' ? 'selected' : ''}>08h30 (padrão grupos / sem trânsito)</option>
                    <option value="09:30" ${state.v2.startTime === '09:30' ? 'selected' : ''}>09h30 (manhã tranquila)</option>
                    <option value="10:30" ${state.v2.startTime === '10:30' ? 'selected' : ''}>10h30 (privativo flexível)</option>
                    <option value="13:30" ${state.v2.startTime === '13:30' ? 'selected' : ''}>13h30 (período da tarde)</option>
                  </select>
                </div>
              </div>

              <div class="form-field" style="margin-top: 4px;">
                <label for="v2MeetingPointDetail">Nome da hospedagem ou endereço em São Roque (opcional)</label>
                <input type="text" id="v2MeetingPointDetail" placeholder="Ex.: Pousada Vila do Vinho, Airbnb no Centro ou Portal Guaçu" value="${state.v2.meetingPointDetail || ''}" />
              </div>

              <div class="v2-extras-list">
                <label class="v2-checkbox-row">
                  <input type="checkbox" id="v2WantLunch" ${state.v2.wantLunch ? 'checked' : ''} />
                  <span>Quero apoio para reservar almoço em restaurante local</span>
                </label>
                <label class="v2-checkbox-row">
                  <input type="checkbox" id="v2WantTechVisit" ${state.v2.wantTechVisit ? 'checked' : ''} />
                  <span>Tenho interesse em visita técnica / degustação orientada</span>
                </label>
                <label class="v2-checkbox-row">
                  <input type="checkbox" id="v2NeedAccess" ${state.v2.needAccessibility ? 'checked' : ''} />
                  <span>Preciso de adaptação de acessibilidade no percurso</span>
                </label>
              </div>
            </div>
          </div>

          <aside class="sticky-card reveal">
            <span class="eyebrow">Resumo transparente</span>
            <div class="summary-row">
              <small>Roteiro</small>
              <strong>${route.title}</strong>
            </div>
            <div class="summary-row">
              <small>Modalidade</small>
              <strong>${isGroup ? `Grupo (${state.v2.vehicleType})` : `Tour Privativo (${state.v2.privateHours}h)`}</strong>
            </div>
            <div class="summary-row">
              <small>Data e início</small>
              <strong>${formatDatePt(state.selectedDate)} • ${state.v2.startTime}</strong>
            </div>
            <div class="stepper-block">
              <small style="font-size: 0.78rem; color: var(--text-muted);">Participantes (máx. ${maxParticipants})</small>
              <div class="stepper">
                <button type="button" class="stepper-btn" id="decParticipants" ${state.participants <= 1 ? 'disabled' : ''} aria-label="Diminuir participantes">−</button>
                <span class="stepper-val">${state.participants}</span>
                <button type="button" class="stepper-btn" id="incParticipants" ${state.participants >= maxParticipants ? 'disabled' : ''} aria-label="Aumentar participantes">+</button>
              </div>
            </div>

            <div class="v2-estimate-box">
              <small>Valor estimado do guiamento (demo)</small>
              <div class="price-value">R$ ${estimated},00</div>
              <small>Sem cobrança agora • pagamento só após aceite do guia</small>
            </div>

            <p class="summary-disclaimer" style="margin-top: 12px;">Reembolso integral com 15+ dias de antecedência. Simulação acadêmica sem reserva real.</p>
            <button type="button" class="btn-primary btn-full" id="continueDateBtn" ${!state.selectedDate ? 'disabled' : ''}>
              Continuar para revisão ${icons.arrowRight}
            </button>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 06 — ACESSO (v2)
// =========================================
function renderAuthV2(ctx) {
  const { state, icons, formatDatePt } = ctx;
  const isRegister = state.authTab === 'register';
  const route = getSelectedRouteV2(state);

  return `
    ${renderHeaderV2(ctx, '')}
    <main class="page-main">
      <section class="auth-split">
        <div class="auth-media">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85" alt="Mata preservada em São Roque" />
          <div class="auth-media-caption">
            ${icons.leaf}
            <h2>Quase lá para enviar sua solicitação.</h2>
            <div class="v2-auth-summary-pill">
              <strong>${route.title}</strong>
              <span>${formatDatePt(state.selectedDate)} • ${state.v2.startTime} • ${state.participants} ${state.participants === 1 ? 'pessoa' : 'pessoas'}</span>
            </div>
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
            <p class="auth-box-sub">Identificação necessária para acompanhar a resposta do guia e acessar o suporte (simulação local).</p>

            <div class="v2-saved-draft-pill" role="status">
              ${icons.check} <span><strong>Suas escolhas de data e guia estão salvas.</strong> Ao entrar, você irá direto para a revisão.</span>
            </div>

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
                ${isRegister ? 'Criar conta e revisar pedido' : 'Entrar e revisar pedido'} ${icons.arrowRight}
              </button>
            </form>

            <p class="auth-footnote">Privacidade (LGPD): coletamos apenas o necessário para a simulação acadêmica; nenhum dado é enviado a servidores externos.</p>
          </div>
        </div>
      </section>
    </main>
  `;
}

// =========================================
// TELA 07 — REVISÃO (v2)
// =========================================
function renderReviewV2(ctx) {
  const { state, icons, formatDatePt, ensureDefaultDate } = ctx;
  ensureDefaultDate();
  const route = getSelectedRouteV2(state);
  const guide = getSelectedGuideV2(state);
  const estimated = computeEstimatedPrice(guide, state);
  const requester = state.user || { name: 'Mariana Oliveira', email: 'visitante@guiasr.demo' };
  const mp = MEETING_POINTS.find((m) => m.id === state.v2.meetingPoint) || MEETING_POINTS[0];
  const isGroup = state.v2.modality === 'group';

  const extras = [];
  if (state.v2.wantLunch) extras.push('Apoio para reserva de almoço');
  if (state.v2.wantTechVisit) extras.push('Visita técnica / degustação');
  if (state.v2.needAccessibility) extras.push('Adaptação de acessibilidade');

  return `
    ${renderHeaderV2(ctx, '')}
    <main class="page-main">
      <div class="container">
        <div class="back-bar">
          <a href="#/solicitacao/data" class="back-link">${icons.chevronLeft} Editar detalhes</a>
        </div>

        <div class="page-hero-centered reveal">
          <span class="eyebrow">Transparência antes do envio</span>
          <h1>Revise sua solicitação</h1>
          <p>Confira o ponto de encontro, valor estimado e política de cancelamento antes de enviar ao guia.</p>
        </div>

        <div class="review-grid">
          <section class="review-card reveal">
            <h2>Detalhes completos do pedido</h2>
            <div class="review-route-box">
              <img src="${route.image}" alt="${route.title}" class="selected-route-thumb" />
              <div>
                <span class="eyebrow">${route.circuit}</span>
                <h3 style="font-size: 1rem; margin-top: 2px;">${route.title}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${isGroup ? `Grupo / Excursão (${state.v2.vehicleType})` : `Tour Privativo • ${state.v2.privateHours}h`}</p>
              </div>
            </div>

            <div class="review-list">
              <div class="review-item">
                <span class="review-item-label">${icons.users} Guia selecionado</span>
                <span class="review-item-val">${guide.name} <small>★ ${guide.rating.toFixed(1)} • Cadastur (demo)</small></span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.calendar} Data e horário</span>
                <span class="review-item-val">${formatDatePt(state.selectedDate)} <small>Início às ${state.v2.startTime}</small></span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.pin} Ponto de encontro</span>
                <span class="review-item-val">${mp.label}${state.v2.meetingPointDetail ? `<small>${state.v2.meetingPointDetail}</small>` : ''}</span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.users} Participantes</span>
                <span class="review-item-val">${state.participants} ${state.participants === 1 ? 'pessoa' : 'pessoas'}</span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.check} Preferências</span>
                <span class="review-item-val">${extras.length ? extras.join(', ') : 'Nenhuma preferência adicional'}</span>
              </div>
              <div class="review-item">
                <span class="review-item-label">${icons.globe} Solicitante</span>
                <span class="review-item-val">${requester.name}<small>${requester.email}</small></span>
              </div>
            </div>

            <!-- Política de cancelamento completa (V07) -->
            <div class="v2-policy-box">
              <h3>Política de cancelamento transparente</h3>
              <ul>
                ${CANCELLATION_POLICY.map((c) => `<li><span>${c.range}</span><strong>${c.refund}</strong></li>`).join('')}
              </ul>
            </div>

            <a href="#/solicitacao/data" class="card-link">Voltar e editar dados ${icons.arrowRight}</a>
          </section>

          <aside class="sticky-card reveal">
            <span class="eyebrow">Resumo financeiro (demo)</span>
            <p class="price-label" style="margin-top: 6px;">Serviço de guiamento estimado</p>
            <div class="price-value" style="margin-top: 4px;">R$ ${estimated},00</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">
              Inclui acompanhamento do guia. Alimentação, compras e taxas de degustação são pagos diretamente nos locais.
            </p>

            <div class="alert-pending">
              <span>${icons.clock}</span>
              <div>
                <strong>Aprovação manual pelo guia</strong>
                Nenhuma cobrança acontece agora. Após o guia confirmar a agenda, você terá 24h para concluir o pagamento na versão final.
              </div>
            </div>

            <button type="button" class="btn-primary btn-full" id="v2SubmitRequestBtn">
              Enviar solicitação ao guia ${icons.arrowRight}
            </button>
            <button type="button" class="btn-outline btn-full" style="margin-top: 10px;" data-v2-open-support>
              ${icons.shield} Precisa de ajuda? Suporte
            </button>
            <p class="auth-footnote">Suporte disponível em caso de dúvidas ou alterações. Protótipo acadêmico.</p>
          </aside>
        </div>
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// TELA 08 — ENVIADA (v2)
// =========================================
function renderSentV2(ctx) {
  const { state, icons, formatDatePt, ensureDefaultDate } = ctx;
  ensureDefaultDate();
  const data = state.lastSubmitted || {
    route: getSelectedRouteV2(state),
    guide: getSelectedGuideV2(state),
    date: state.selectedDate,
    participants: state.participants,
    startTime: state.v2.startTime,
    meetingPointLabel: (MEETING_POINTS.find((m) => m.id === state.v2.meetingPoint) || MEETING_POINTS[0]).label,
    estimated: computeEstimatedPrice(getSelectedGuideV2(state), state)
  };

  return `
    ${renderHeaderV2(ctx, '')}
    <main class="page-main">
      <section class="sent-wrap reveal">
        <div class="success-circle">${icons.check}</div>
        <span class="eyebrow">Protocolo demonstrativo #GSR-2025</span>
        <h1>Solicitação enviada — aguardando análise do guia</h1>
        <p class="sent-sub">Ainda não há cobrança nem confirmação automática. Todos os detalhes de data, horário e ponto de encontro foram enviados para agilizar a resposta.</p>
        <div class="status-pill" title="Status: AGUARDANDO_CONFIRMACAO_GUIA">
          <span class="status-dot"></span> Aguardando análise do guia
        </div>

        <div class="sent-card">
          <div class="selected-route-strip" style="margin-bottom: 14px;">
            <img src="${data.route.image}" alt="${data.route.title}" class="selected-route-thumb" />
            <div>
              <span class="eyebrow">${data.route.circuit}</span>
              <h3>${data.route.title}</h3>
              <p>${formatDatePt(data.date)} às ${data.startTime || state.v2.startTime} • ${data.participants} ${data.participants === 1 ? 'participante' : 'participantes'}</p>
            </div>
          </div>

          <div class="v2-sent-meta">
            <div><small>Ponto de encontro</small><strong>${data.meetingPointLabel || 'Combinado com o guia'}</strong></div>
            <div><small>Valor estimado (demo)</small><strong>R$ ${data.estimated || 300},00</strong></div>
          </div>

          <div class="steps-list">
            <h3>Próximos passos</h3>
            <div class="step-row">
              <span class="step-num">1</span>
              <div>
                <strong>O guia revisa agenda e ponto de encontro</strong>
                <p>Evita conflitos de horário e confirma a logística do seu passeio.</p>
              </div>
            </div>
            <div class="step-row">
              <span class="step-num">2</span>
              <div>
                <strong>Confirmação e prazo de 24h</strong>
                <p>No sistema completo, após o aceite do guia, a vaga fica reservada por 24h para pagamento.</p>
              </div>
            </div>
            <div class="step-row">
              <span class="step-num">3</span>
              <div>
                <strong>Suporte e pontualidade no dia</strong>
                <p>Chegue com 10 min de antecedência ao ponto de encontro. Em domingos/inverno, considere trânsito na Castello Branco e Estrada do Vinho.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="sent-actions">
          <a href="#/" class="btn-primary">Voltar ao início</a>
          <a href="#/roteiros" class="btn-outline">Explorar outros circuitos</a>
          <button type="button" class="btn-outline" data-v2-open-support>${icons.shield} Precisa de ajuda? Suporte</button>
        </div>

        <p class="sent-footnote">Protótipo acadêmico (v2). Nenhuma reserva ou cobrança real foi efetuada.</p>
      </section>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

// =========================================
// MODO 03 — FLUXOGRAMA (v2)
// =========================================
export function renderFlowViewV2(ctx) {
  return `
    <div class="proto-subbar">Versão v2 (Remodelada) • 03 — Fluxo principal atualizado</div>
    <main class="page-main">
      <div class="container flow-wrap">
        <div class="page-hero-centered" style="padding-top: 0;">
          <span class="eyebrow">Arquitetura v2 baseada em pesquisas</span>
          <h1>Fluxograma remodelado do GuiaSR (v2)</h1>
          <p>Incorpora descoberta por circuito/perfil, diferenciação entre roteiro digital e guia, transparência de preço/cancelamento e ponto de encontro estruturado.</p>
        </div>

        <div class="flowchart-card">
          <svg class="flowchart-svg" viewBox="0 0 820 1160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluxograma v2 do GuiaSR">
            <defs>
              <marker id="arrow-v2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#7b8880" />
              </marker>
              <marker id="arrow-accent-v2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#c69749" />
              </marker>
            </defs>

            <path class="fc-edge" d="M 410 76 L 410 108" marker-end="url(#arrow-v2)" />
            <path class="fc-edge" d="M 410 170 L 410 202" marker-end="url(#arrow-v2)" />
            <path class="fc-edge" d="M 410 264 L 410 296" marker-end="url(#arrow-v2)" />

            <!-- Decisão nova: Contratar guia ou usar roteiro digital? -->
            <path class="fc-edge fc-edge--accent" d="M 300 340 L 140 340 L 140 233 L 266 233" marker-end="url(#arrow-accent-v2)" />
            <rect class="fc-edge-label-bg" x="155" y="328" width="108" height="20" rx="4" />
            <text class="fc-edge-label fc-edge-label--no" x="209" y="342" text-anchor="middle">Só roteiro digital</text>

            <path class="fc-edge" d="M 410 384 L 410 416" marker-end="url(#arrow-v2)" />
            <rect class="fc-edge-label-bg" x="418" y="390" width="90" height="18" rx="4" />
            <text class="fc-edge-label" x="463" y="403" text-anchor="middle">Com guia</text>

            <path class="fc-edge" d="M 410 478 L 410 510" marker-end="url(#arrow-v2)" />
            <path class="fc-edge" d="M 410 572 L 410 606" marker-end="url(#arrow-v2)" />

            <!-- Decisão: Autenticado? -->
            <path class="fc-edge fc-edge--accent" d="M 300 652 L 185 652 L 185 712" marker-end="url(#arrow-accent-v2)" />
            <rect class="fc-edge-label-bg" x="215" y="640" width="38" height="20" rx="4" />
            <text class="fc-edge-label fc-edge-label--no" x="234" y="654" text-anchor="middle">Não</text>
            <path class="fc-edge" d="M 185 776 L 185 836 L 266 836" marker-end="url(#arrow-v2)" />

            <path class="fc-edge" d="M 520 652 L 605 652 L 605 836 L 554 836" marker-end="url(#arrow-v2)" />
            <rect class="fc-edge-label-bg" x="550" y="640" width="36" height="20" rx="4" />
            <text class="fc-edge-label" x="568" y="654" text-anchor="middle">Sim</text>

            <path class="fc-edge" d="M 410 868 L 410 904" marker-end="url(#arrow-v2)" />

            <!-- Decisão: Confirmar envio? -->
            <path class="fc-edge fc-edge--accent" d="M 510 948 L 705 948 L 705 540 L 554 540" marker-end="url(#arrow-accent-v2)" />
            <rect class="fc-edge-label-bg" x="642" y="936" width="96" height="20" rx="4" />
            <text class="fc-edge-label fc-edge-label--no" x="690" y="950" text-anchor="middle">Não (editar)</text>

            <path class="fc-edge" d="M 410 992 L 410 1030" marker-end="url(#arrow-v2)" />
            <rect class="fc-edge-label-bg" x="418" y="1000" width="34" height="18" rx="4" />
            <text class="fc-edge-label" x="435" y="1013" text-anchor="middle">Sim</text>

            <g class="fc-node" data-flow-open="#/">
              <rect x="260" y="14" width="300" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="33" text-anchor="middle">TELA 01 (v2)</text>
              <text class="fc-node-title" x="410" y="51" text-anchor="middle">Início • Toda São Roque</text>
              <text class="fc-node-sub" x="410" y="65" text-anchor="middle">Perfis, confiança, Roteiro vs Guia e circuitos</text>
            </g>

            <g class="fc-node" data-flow-open="#/roteiros">
              <rect x="260" y="108" width="300" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="127" text-anchor="middle">TELA 02 (v2)</text>
              <text class="fc-node-title" x="410" y="145" text-anchor="middle">Explorar por circuito e perfil</text>
              <text class="fc-node-sub" x="410" y="159" text-anchor="middle">Preço, nota, acessibilidade e alerta de movimento</text>
            </g>

            <g class="fc-node" data-flow-open="#/roteiros/sabores-da-rota-do-vinho">
              <rect x="260" y="202" width="300" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="221" text-anchor="middle">TELA 03 (v2)</text>
              <text class="fc-node-title" x="410" y="239" text-anchor="middle">Detalhes do roteiro</text>
              <text class="fc-node-sub" x="410" y="253" text-anchor="middle">Paradas + horários, curiosidades, avaliações</text>
            </g>

            <g>
              <polygon class="fc-diamond" points="410,298 520,340 410,382 300,340" />
              <text class="fc-diamond-text" x="410" y="344" text-anchor="middle">Quer guia presencial?</text>
            </g>

            <g class="fc-node" data-flow-open="#/guias">
              <rect x="260" y="416" width="300" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="435" text-anchor="middle">TELA 04 & 05 (v2)</text>
              <text class="fc-node-title" x="410" y="453" text-anchor="middle">Galeria e Perfil do Guia</text>
              <text class="fc-node-sub" x="410" y="467" text-anchor="middle">Top Guia, Parceiro GuiaSR, Cadastur e preços</text>
            </g>

            <g class="fc-node" data-flow-open="#/solicitacao/data">
              <rect x="260" y="510" width="300" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="529" text-anchor="middle">TELA 06 (v2)</text>
              <text class="fc-node-title" x="410" y="547" text-anchor="middle">Modalidade, data e encontro</text>
              <text class="fc-node-sub" x="410" y="561" text-anchor="middle">Privativo/Grupo, hotel/Portal, preço estimado</text>
            </g>

            <g>
              <polygon class="fc-diamond" points="410,608 520,652 410,696 300,652" />
              <text class="fc-diamond-text" x="410" y="656" text-anchor="middle">Usuário autenticado?</text>
            </g>

            <g class="fc-node" data-flow-open="#/acesso">
              <rect x="55" y="714" width="260" height="62" rx="12" />
              <text class="fc-node-num" x="185" y="733" text-anchor="middle">TELA 06 (v2)</text>
              <text class="fc-node-title" x="185" y="751" text-anchor="middle">Entrar ou criar conta</text>
              <text class="fc-node-sub" x="185" y="765" text-anchor="middle">Com resumo do pedido preservado</text>
            </g>

            <g class="fc-node" data-flow-open="#/solicitacao/revisao">
              <rect x="260" y="806" width="300" height="62" rx="12" />
              <text class="fc-node-num" x="410" y="825" text-anchor="middle">TELA 07 (v2)</text>
              <text class="fc-node-title" x="410" y="843" text-anchor="middle">Revisão e cancelamento</text>
              <text class="fc-node-sub" x="410" y="857" text-anchor="middle">Valor transparente, regras e suporte</text>
            </g>

            <g>
              <polygon class="fc-diamond" points="410,906 510,948 410,990 310,948" />
              <text class="fc-diamond-text" x="410" y="952" text-anchor="middle">Confirmar envio?</text>
            </g>

            <g class="fc-node" data-flow-open="#/solicitacao/enviada">
              <rect class="fc-end" x="225" y="1032" width="370" height="66" rx="33" />
              <text class="fc-node-num" x="410" y="1052" text-anchor="middle">TELA 08 (v2) • FIM DO FLUXO</text>
              <text class="fc-end-text" x="410" y="1070" text-anchor="middle">Solicitação enviada ao guia</text>
              <text class="fc-node-sub" x="410" y="1085" text-anchor="middle">Protocolo, ponto de encontro e próximos passos</text>
            </g>
          </svg>
        </div>
      </div>
    </main>
    ${renderFooterV2(ctx)}
  `;
}

export function renderScreenV2(ctx, path) {
  if (path === '/' || path === '') return renderHomeV2(ctx);
  if (path === '/roteiros') return renderExploreV2(ctx);
  if (path.startsWith('/roteiros/')) return renderRouteDetailV2(ctx, path.replace('/roteiros/', ''));
  if (path === '/guias') return renderGuidesGalleryV2(ctx);
  if (path.startsWith('/guias/')) return renderGuideProfileV2(ctx, path.replace('/guias/', ''));
  if (path === '/solicitacao/data') return renderDateSelectionV2(ctx);
  if (path === '/acesso') return renderAuthV2(ctx);
  if (path === '/solicitacao/revisao') return renderReviewV2(ctx);
  if (path === '/solicitacao/enviada') return renderSentV2(ctx);
  return renderHomeV2(ctx);
}

export function bindEventsV2(ctx) {
  const { state, navigate, render } = ctx;

  // Suporte banner e atalhos contextuais (M03)
  document.getElementById('v2SupportBtn')?.addEventListener('click', () => {
    state.v2.supportOpen = !state.v2.supportOpen;
    render();
  });
  document.querySelectorAll('[data-v2-open-support]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.v2.supportOpen = true;
      render();
      window.scrollTo(0, 0);
    });
  });
  document.getElementById('v2SupportClose')?.addEventListener('click', () => {
    state.v2.supportOpen = false;
    render();
  });

  // Explicação interativa do selo Cadastur (M03)
  document.getElementById('v2CadasturToggle')?.addEventListener('click', () => {
    state.v2.cadasturInfoOpen = !state.v2.cadasturInfoOpen;
    render();
  });

  // Seleção de guia na sidebar da Tela 03 (múltiplos guias por roteiro)
  document.querySelectorAll('[data-v2-pick-guide]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedGuideId = btn.getAttribute('data-v2-pick-guide');
      render();
    });
  });

  // Galeria de Guias Credenciados (#/guias)
  document.getElementById('v2GuideSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.v2.guideFilters.query = document.getElementById('v2GuideSearchInput').value;
    render();
  });

  document.querySelectorAll('[data-v2-guide-badge]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.v2.guideFilters.badge = btn.getAttribute('data-v2-guide-badge');
      render();
    });
  });

  document.querySelectorAll('[data-v2-guide-spec]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.v2.guideFilters.specialty = btn.getAttribute('data-v2-guide-spec');
      render();
    });
  });

  document.getElementById('v2ResetGuideFiltersBtn')?.addEventListener('click', () => {
    state.v2.guideFilters = { query: '', specialty: 'Todas', badge: 'all' };
    render();
  });

  document.querySelectorAll('[data-v2-book-guide]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedGuideId = btn.getAttribute('data-v2-book-guide');
      navigate('#/solicitacao/data');
    });
  });

  // Home search & shortcuts
  document.getElementById('v2HomeSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.v2.filters.query = document.getElementById('v2HomeSearchInput').value;
    navigate('#/roteiros');
  });

  document.querySelectorAll('[data-v2-profile-jump]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.v2.filters.profile = btn.getAttribute('data-v2-profile-jump');
      navigate('#/roteiros');
    });
  });

  document.querySelectorAll('[data-v2-circuit-jump]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      state.v2.filters.circuit = el.getAttribute('data-v2-circuit-jump');
      navigate('#/roteiros');
    });
  });

  // Explore partial update
  const resetFiltersV2 = () => {
    state.v2.filters = {
      query: '',
      circuit: 'Todos',
      profile: 'all',
      duration: 'all',
      modality: 'all',
      accessibleOnly: false,
      sort: 'relevant'
    };
    render();
  };

  const updateExploreV2 = () => {
    const area = document.getElementById('v2ExploreResultsArea');
    if (!area) return;
    const filtered = getFilteredRoutesV2(state);
    area.innerHTML = renderExploreResultsV2(ctx, filtered);
    area.querySelectorAll('.route-card, .empty-state').forEach((el, idx) => {
      el.classList.remove('reveal');
      el.style.setProperty('--card-index', String(idx));
      el.classList.add('filter-fade-up');
    });
    area.querySelector('#v2SortSelect')?.addEventListener('change', (e) => {
      state.v2.filters.sort = e.target.value;
      updateExploreV2();
    });
    area.querySelector('#v2EmptyResetBtn')?.addEventListener('click', resetFiltersV2);
  };

  document.getElementById('v2ExploreSearchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.v2.filters.query = document.getElementById('v2ExploreSearchInput').value;
    updateExploreV2();
  });

  document.querySelectorAll('input[name="v2circuit"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      state.v2.filters.circuit = e.target.value;
      document.querySelectorAll('input[name="v2circuit"]').forEach((r) => {
        r.closest('.radio-item')?.classList.toggle('is-selected', r.checked);
      });
      updateExploreV2();
    });
  });

  document.getElementById('v2ProfileSelect')?.addEventListener('change', (e) => {
    state.v2.filters.profile = e.target.value;
    updateExploreV2();
  });
  document.getElementById('v2DurationSelect')?.addEventListener('change', (e) => {
    state.v2.filters.duration = e.target.value;
    updateExploreV2();
  });
  document.getElementById('v2ModalitySelect')?.addEventListener('change', (e) => {
    state.v2.filters.modality = e.target.value;
    updateExploreV2();
  });
  document.getElementById('v2AccessibleOnly')?.addEventListener('change', (e) => {
    state.v2.filters.accessibleOnly = e.target.checked;
    updateExploreV2();
  });
  document.getElementById('v2SortSelect')?.addEventListener('change', (e) => {
    state.v2.filters.sort = e.target.value;
    updateExploreV2();
  });
  document.getElementById('v2ClearFiltersBtn')?.addEventListener('click', resetFiltersV2);
  document.getElementById('v2EmptyResetBtn')?.addEventListener('click', resetFiltersV2);

  // Tela 05 — Modalidade, horários, ponto de encontro e extras
  document.querySelectorAll('[data-v2-modality]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.v2.modality = btn.getAttribute('data-v2-modality');
      if (state.v2.modality === 'group' && state.participants < 6) {
        state.participants = 10;
      } else if (state.v2.modality === 'private' && state.participants > 8) {
        state.participants = 2;
      }
      render();
    });
  });

  document.getElementById('v2PrivateHours')?.addEventListener('change', (e) => {
    state.v2.privateHours = Number(e.target.value);
    render();
  });
  document.getElementById('v2TransportOption')?.addEventListener('change', (e) => {
    state.v2.transportOption = e.target.value;
    render();
  });
  document.getElementById('v2DurationOption')?.addEventListener('change', (e) => {
    state.v2.durationOption = e.target.value;
    render();
  });
  document.getElementById('v2VehicleType')?.addEventListener('change', (e) => {
    state.v2.vehicleType = e.target.value;
    render();
  });
  document.getElementById('v2MeetingPoint')?.addEventListener('change', (e) => {
    state.v2.meetingPoint = e.target.value;
    render();
  });
  document.getElementById('v2MeetingPointDetail')?.addEventListener('input', (e) => {
    state.v2.meetingPointDetail = e.target.value;
  });
  document.getElementById('v2StartTime')?.addEventListener('change', (e) => {
    state.v2.startTime = e.target.value;
    render();
  });
  document.getElementById('v2WantLunch')?.addEventListener('change', (e) => {
    state.v2.wantLunch = e.target.checked;
  });
  document.getElementById('v2WantTechVisit')?.addEventListener('change', (e) => {
    state.v2.wantTechVisit = e.target.checked;
  });
  document.getElementById('v2NeedAccess')?.addEventListener('change', (e) => {
    state.v2.needAccessibility = e.target.checked;
  });

  // Tela 07 -> Tela 08 (v2) com prevenção de duplo clique (Quadro 15 PNI)
  document.getElementById('v2SubmitRequestBtn')?.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (btn.disabled) return;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    const route = getSelectedRouteV2(state);
    const guide = getSelectedGuideV2(state);
    const mp = MEETING_POINTS.find((m) => m.id === state.v2.meetingPoint) || MEETING_POINTS[0];
    const mpFull = state.v2.meetingPointDetail ? `${mp.label} (${state.v2.meetingPointDetail})` : mp.label;
    state.lastSubmitted = {
      route,
      guide,
      date: state.selectedDate,
      participants: state.participants,
      startTime: state.v2.startTime,
      meetingPointLabel: mpFull,
      estimated: computeEstimatedPrice(guide, state),
      status: 'AGUARDANDO_CONFIRMACAO_GUIA'
    };
    navigate('#/solicitacao/enviada');
  });
}
