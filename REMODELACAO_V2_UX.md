# GuiaSR — Remodelação UX da Versão v2 (Baseada em Evidências)

**Data:** 23/11/2026  
**Escopo:** Evolução do protótipo navegável em `NewWeb/site/` com seletor de versões (`v1` original vs. `v2` remodelada) integrado à barra superior junto aos controles de fidelidade (`01 Baixa fidelidade`, `02 Alta fidelidade`, `03 Fluxo`).

---

## 1. Fontes de Evidência Analisadas

Todas as mudanças implementadas na versão **v2** foram fundamentadas diretamente nos documentos oficiais de pesquisa, análise heurística e entregáveis acadêmicos do projeto:

1. **Pesquisa com Viajantes (`Pesquisa com Viajantes — GuiaSR _ São Roque Rotas.csv`)** — **21 respondentes válidos** (100% maiores de 18 anos com consentimento; 76,2% entre 25–34 anos e 23,8% entre 18–24 anos; 85,7% já visitaram São Roque).
   - **Informações mais importantes antes de escolher um roteiro (V04):** Preço (**81,0%**), Avaliações (**66,7%–76,2%**), Locais visitados (**57,1%**), Duração (**42,9%**), Transporte (**23,8%**), Acessibilidade (**23,8%**) e Disponibilidade (**9,5%**).
   - **Clareza entre roteiro digital vs. contratação de guia (V05):** Média **3,90/5**; **33,3%** (7/21) atribuíram nota ≤ 3, indicando ambiguidade na proposta original.
   - **Fatores que aumentam a confiança para solicitar um guia (V07):** Avaliações (**90,5%** — 19/21), Suporte (**76,2%**), Preço transparente (**52,4%–57,1%**), Fotos (**42,9%**), Política de cancelamento (**33,3%**) e Verificação no Cadastur (**23,8%** — 5/21).
   - **Impacto na segurança (V08):** Média **4,52/5**; **95,2%** (20/21) declararam nota 4 ou 5 de segurança caso a plataforma apresente esses elementos.
   - **Dúvidas e sugestões abertas (V09 e V10):**
     - Esclarecer se o foco é apenas no Roteiro do Vinho ou em toda a cidade de São Roque;
     - Segmentar tipos de roteiro e incluir curiosidades locais;
     - Informar horários de funcionamento dos locais visitados;
     - Oferecer filtro de roteiros por perfil (família, romântico, bate-volta econômico) e alerta de trânsito/lotação nos fins de semana.
   - **Experiências de maior interesse (V12):** Gastronomia e vinícolas (66,7%), Natureza e trilhas (61,9%), Turismo histórico-cultural (57,1%), Passeios em família (42,9%), Passeios românticos (42,9%) e Experiências personalizadas (38,1%).

2. **Pesquisa com Guias de Turismo (`Pesquisa com Guias de Turismo — GuiaSR _ São Roque Rotas.csv`)** — **6 guias ativos em São Roque** (100% com Cadastur ativo; 83,3% com 4+ anos de atuação).
   - **Modalidades (G05):** 100% atuam com excursões/ônibus; 50% com roteiros personalizados, grupos pequenos e grupos grandes.
   - **Precificação (G14):** Predomínio por período/dia (66,7%), seguido por hora, grupo e roteiro — não apenas preço único por grupo.
   - **Dores operacionais e de comunicação (G15, G17, G18, G19):** Alterações de última hora (66,7%), explicar itinerário (50%), conflito de horários (33,3%), acompanhar solicitações (33,3%), esclarecer ponto de encontro, confirmar datas, falta de pontualidade do cliente e clientes que não sabem o que fazer ou aonde ir.
   - **Múltiplos atendimentos e dispositivo (G12, G23):** 66,7% (4/6) **não** querem fazer mais de um atendimento no mesmo dia; 66,7% preferem administrar tudo pelo celular e 83,3% não usam nenhuma ferramenta digital hoje.
   - **Confirmação de reserva (G28):** Aprovação manual (33,3%), depende do serviço (33,3%) ou automática revisável (33,3%).
   - **Prioridades no GuiaSR (G29) e Cadastur (G30):** Perfil profissional (83,3%), histórico de atendimentos (66,7%), divulgação de roteiros (50%), controle de agenda e solicitação de reservas; 66,7% consideram a verificação Cadastur fundamental ou importante.

3. **Boletim Informativo ASGUIT 2025 (`BOLETIM ASGUIT 2025.pdf`, OBSTUHN/Fatec São Roque + ASGUIT)** — **41.280 visitantes** e **1.292 atendimentos** em 2025 (+35,3% de crescimento acumulado em 3 anos).
   - **Grupos (87% dos atendimentos — 1.118 grupos):** 91% aos fins de semana/feriados; 91% sem pernoite (bate-volta); 95% período integral (8h); 67% chegam entre 8h–9h e saem entre 17h–18h; 83% acessam pela Rodovia Castello Branco (Portal Guaçu); vans cresceram 80,5% (18% dos grupos, pela vantagem tarifária de estacionamento); 98% almoçam com reserva e 60% tomam café da manhã na cidade.
   - **Tours Privativos (13% — 174 atendimentos, crescimento de +75,8% em 3 anos):** 88,5% são visitantes em **primeira viagem** a São Roque; **83% hospedados na cidade**; **84% têm ponto de encontro na hospedagem** (60% hotéis/pousadas + 24% Airbnb/casas de temporada); **71% duram de 4h a 6h**; **42% ocorrem em dias úteis** (mais flexibilidade e disponibilidade); **32% incluem visitas técnicas/degustações** (vs. 3% dos grupos); **6% são turistas internacionais** (justificando destaque para idiomas).
   - **Sazonalidade:** Forte pico de inverno entre **maio e agosto** (julho = 6.397 visitantes, 15,5% do ano).
   - **Circuitos territoriais reais:** Roteiro do Vinho (76% grupos / 73% privativos), Centro Histórico (18% privativos / 7% grupos), Rota Saboó & Castello, Roteiro da Raposo, Roteiro Darcy Penteado e Eventos Locais.
   - **Referência de valores ASGUIT 2025:** Privativos a partir de R$ 60/h (guia acompanhante) e R$ 75/h (guia motorista); Grupos por diária de meio período (4h) ou integral (8h).

4. **Documentação Integrada PNI v4, PPTU v4 e Apresentação (`GuiaSR_PNI_19_Entregaveis_v4_ABNT_Final.docx`, `GuiaSR_PPTU_8_Entregaveis_v4_ABNT_Final.docx`, `GuiaSR — São Roque Rotas.pptx`, `guiasr_projeto_de_navega_o_e_intera_o_19_entreg_veis_v4_abnt.md`)**
   - Formalizam os **10 problemas priorizados** (P01–P06 da pesquisa + H01–H04 da inspeção heurística de Nielsen) e o **Plano de Melhorias M01–M09**, aplicados diretamente na versão **v2** do protótipo:
     - **M01 (P01):** Bloco comparativo na Home e caixas separadas *Roteiro Digital vs. Guia Profissional* em W03.
     - **M02 (P02):** Cobertura explícita de toda São Roque em W01 e filtros por circuito, tema, perfil e preço em W02.
     - **M03 (P03):** Avaliações visíveis nos cards/W03/W04, atalho **"Precisa de ajuda? Suporte"** em W04/W07/W08 e botão interativo **`?`** explicando a sigla Cadastur em linguagem simples.
     - **M04 (P04 / H04):** Horários de funcionamento, curiosidades locais, acessibilidade e **esforço físico** em W03, além do campo **Ponto de encontro / Hospedagem (hotel, pousada ou Airbnb)** com campo para nome/endereço em W05.
     - **M05 (H01):** Aviso explícito **"Solicitação enviada — aguardando análise do guia"** em W08, linha do tempo de 3 etapas, alerta de que não há cobrança automática e prevenção de duplo clique no envio em W07.
     - **M06 (H02):** Aviso visível em W06 (**"Suas escolhas de data e guia estão salvas"**) e nota de privacidade (LGPD), preservando o estado completo até a revisão.
     - **M07 / M08 (P05 / P06 / H03):** Indicação no perfil do guia de **1 atendimento/dia por padrão** (evitando conflito de horários) e histórico de atendimentos registrado.
     - **M09 (P03 / P04):** Destaque de **idiomas atendidos** (PT/EN/ES) no perfil do guia para os 6% de visitantes internacionais nos passeios privativos.

---

## 2. Mapa Resumo: Problema na v1 → Solução na v2 → Evidência

| Área | Limitação identificada na v1 | Remodelação aplicada na v2 | Base de evidência |
|---|---|---|---|
| **Barra do protótipo** | Apenas modos `Baixa fidelidade`, `Alta fidelidade` e `Fluxo` | Adicionado seletor **`Versão: v1 \| v2 UX`** ao lado dos modos, preservando a v1 intacta para comparação direta | Solicitação do usuário + avaliação comparativa de usabilidade |
| **Escopo da cidade** | Hero genérico gerava dúvida se o site era só sobre a Rota do Vinho | Hero explicita **"Muito além da Rota do Vinho"** e seção de **Circuitos territoriais de São Roque** (Vinho, Centro Histórico, Saboó & Castello, Raposo & Darcy Penteado) | Viajantes V09 ("esclarecer se o foco é apenas no roteiro do vinho") + Boletim ASGUIT p. 40–43 |
| **Roteiro vs. Guia** | Usuários confundiam acessar roteiro com contratar guia presencial | Bloco comparativo dedicado na Home (**Opção 1: Roteiro Digital Autoguiado** vs. **Opção 2: Guia Profissional**) e escolha explícita na Tela 03 | Viajantes V05 (33,3% com nota ≤ 3 de clareza) |
| **Preço transparente** | Preço aparecia apenas na Tela 04 como valor único (`R$ 180/grupo`) | Preço visível já nos cards da Home/Explorar, na Tela 03, tabela por modalidade na Tela 04 (ref. ASGUIT) e cálculo dinâmico na Tela 05/07 com o que inclui e não inclui | Viajantes V04 (81%) e V07 (57,1%); Guias G14; Boletim ASGUIT p. 50–51 |
| **Avaliações** | Ausentes em todo o protótipo v1 | Notas e quantidade de avaliações (ilustrativas) nos cards, na Tela 03 e no perfil do guia (Tela 04) | Viajantes V04 (76,2%) e V07 (90,5%); Guias G29 |
| **Suporte e Cancelamento** | Ausentes em todo o protótipo v1 | Botão/banner de **Suporte** no cabeçalho e **Política de Cancelamento completa** (100%/75%/50%/0%) na Tela 04 e Tela 07 | Viajantes V07 (Suporte 71,4%, Cancelamento 33,3%) e V08 (95,2% de segurança) |
| **Filtros e Perfis** | Apenas categoria simples, duração curta/média e experiência genérica | Atalhos por **perfil** no Hero (*Primeira vez, Família, Romântico, Grupo/Excursão, Bate-volta econômico*), filtro por **circuito**, **modalidade**, **duração real (3h / 4–6h / 8h)** e **acessibilidade**, além de ordenação por nota e menor preço | Viajantes V04 (Acessibilidade 23,8%), V10, V12; Boletim ASGUIT (88,5% privativos 1ª vez; 71% 4–6h; 95% grupos 8h) |
| **Paradas, Horários e Curiosidades** | Tela 03 tinha apenas lista curta e mapa SVG genérico | Itinerário numerado parada a parada com **horários de funcionamento**, bloco de **curiosidade local**, **transporte** e **acessibilidade** | Viajantes V04 (Locais 52,4%, Transporte 23,8%), V10 (horários de funcionamento e curiosidades); Guias G18 (explicar itinerário) |
| **Movimento / Sazonalidade** | Nenhuma orientação sobre lotação ou melhores dias | Avisos orientativos na Home, Explorar, Tela 03 e legenda no calendário da Tela 05 diferenciando dias úteis (tranquilos) de fins de semana (maior movimento) | Viajantes V10 (alerta de trânsito/lotação nos fins de semana); Boletim ASGUIT p. 12 e 16 (91% grupos em fins de semana; pico mai–ago) |
| **Logística da Solicitação** | Tela 05 pedia apenas data e número de participantes (até 12) | Seletor **Tour Privativo vs. Grupo/Excursão**, veículo (van/micro/ônibus ou carro próprio/guia), **ponto de encontro estruturado** (hotel, Airbnb, Portal Castello Branco, Rodoviária), **horário de início** e preferências de almoço/visita técnica/acessibilidade | Boletim ASGUIT p. 18–21 e 34–38; Guias G05, G18 (ponto de encontro) e G19 (pontualidade) |

---

## 3. Detalhamento Tela a Tela (v2)

### Barra Superior do Protótipo (`proto-bar`)
- **Alteração:** Inclusão do seletor `Versão: [v1] [v2 UX]` ao lado das abas `01 Baixa fidelidade | 02 Alta fidelidade | 03 Fluxo`, com indicador na subbarra (`Versão v1 (Original)` / `Versão v2 (Remodelada)`).
- **Motivo:** Permitir alternar instantaneamente entre a versão original e a remodelada em qualquer tela, inclusive no modo Wireframe (baixa fidelidade) e Fluxograma, facilitando testes comparativos A/B e apresentação acadêmica.

### Tela 01 — Início
- **Alterações:**
  1. Hero reformulado com proposta clara de abrangência municipal (*"Muito além da Rota do Vinho"*).
  2. Atalhos rápidos por perfil de viajante logo abaixo da busca (*Primeira vez em São Roque, Em família, Romântico / Casal, Grupo / Excursão, Bate-volta econômico*).
  3. **Faixa de Confiança** com os 4 pilares validados na V07 (Avaliações, Cadastur, Preço/Cancelamento e Suporte).
  4. **Bloco comparativo "Roteiro Digital vs. Guia Profissional"** resolvendo a ambiguidade da V05.
  5. Cards de roteiros agora exibem circuito, badge de acessibilidade, duração, avaliação (demo), perfis e preço inicial do guia.
  6. Seção de **Circuitos territoriais** substituindo categorias genéricas, acompanhada de dica de sazonalidade/trânsito baseada no Boletim ASGUIT 2025.

### Tela 02 — Explorar Roteiros
- **Alterações:**
  1. Substituição do filtro genérico de categoria por **Circuito em São Roque**.
  2. Inclusão de filtros por **Perfil/Ocasião**, **Modalidade** (Privativo, Pequenos grupos, Grupo/Excursão), **Duração real** (até 3h, 4h–6h, 8h integral) e checkbox **Apenas roteiros acessíveis**.
  3. Ordenação expandida para incluir **Melhor avaliados** e **Menor preço de guia**.
  4. Banner orientativo de movimento (fins de semana e inverno vs. dias úteis).
  5. Catálogo atualizado com roteiros representando todos os principais circuitos de São Roque, incluindo um roteiro dedicado de período integral (8h) para grupos/excursões.

### Tela 03 — Detalhes do Roteiro
- **Alterações:**
  1. Banner exibe circuito, nota de avaliação, badge de acessibilidade e preço inicial.
  2. Três cartões informativos de decisão rápida: **Transporte e encontro**, **Esforço físico e acessibilidade** e **Movimento/melhor horário**.
  3. Bloco de **Curiosidade local** e lista detalhada de **Locais visitados com horários de funcionamento**.
  4. Quadro explícito de **O que está incluído vs. Não incluído** (transparência financeira).
  5. Seção de **Avaliações ilustrativas** de viajantes.
  6. Card lateral remodelado com **múltiplos guias especializados selecionáveis** para o roteiro (cada um com especialidade, avaliação `★` e badges **`★ Top Guia`** / **`✓ Parceiro`**), nova copy mais clara, atalho para a galeria completa de guias e separação nítida do uso gratuito do roteiro digital autoguiado.

### Tela 04 — Galeria de Guias Credenciados (`#/guias` — Nova tela na v2)
- **Alterações:**
  1. Nova tela dedicada exibindo **6 guias demonstrativos** com especialidades distintas (*Enoturismo & Gastronomia*, *Visitas Técnicas & Romântico*, *Natureza & Trilhas*, *Excursões & Grupos*, *Cultura, História & Acessibilidade* e *Turismo Rural & Família*).
  2. Badges visuais de destaque: **`★ Top Guia`** (melhores avaliações da plataforma) e **`✓ Parceiro Oficial GuiaSR`** (parceiros do site), além do selo `Cadastur (demo)`.
  3. Busca por nome/especialidade/idioma e filtros rápidos por selo (`Todos`, `Top Guia`, `Parceiro Oficial GuiaSR`) e por especialidade.
  4. Cards com avaliação, quantidade de passeios, idiomas, preço a partir de `R$/h` e botões diretos para **Ver perfil** ou **Ver agenda**.

### Tela 05 — Perfil do Guia (`#/guias/:id`)
- **Alterações:**
  1. Adição de segundo guia demonstrativo (`Beatriz Nogueira`, trilhas/cultura/bilíngue PT-EN-ES) com seletor rápido entre guias, refletindo diversidade de oferta e os 6% de turistas internacionais nos privativos (ASGUIT p. 47).
  2. Destaque de **avaliações**, **histórico de atendimentos registrados (demo)**, **tempo de resposta** e **selo explicativo de Cadastur** (mantendo honestidade de que no protótipo é demonstrativo).
  3. **Tabela transparente de preços por modalidade** baseada na referência ASGUIT 2025 (R$ 60/h acompanhante, R$ 75/h motorista, meio período e integral para grupos).
  4. Resumo da **política de cancelamento** e aviso de **aprovação manual pelo guia** na barra lateral.

### Tela 05 — Modalidade, Data e Ponto de Encontro
- **Alterações:**
  1. Escolha explícita entre **Tour Privativo** (1–8 pessoas, 4h/5h/6h, carro próprio ou do guia) e **Grupo / Excursão** (até 45 pessoas, 4h/8h, van/micro/ônibus com nota sobre vantagem tarifária de vans).
  2. Calendário destaca visualmente **dias úteis (mais tranquilos)** vs. **fins de semana (maior movimento)**.
  3. Campos estruturados de **Ponto de Encontro** (Hotel/Pousada, Airbnb/Casa de temporada, Portal Guaçu Castello Branco, Rodoviária, Outro) e **Horário de início** — reduzindo trocas de mensagens, erros de localização e atrasos reportados pelos guias (G18, G19).
  4. Checkboxes opcionais de **reserva de almoço**, **visita técnica/degustação** e **adaptação de acessibilidade**.
  5. Cálculo dinâmico do **valor estimado transparente** no resumo lateral.

### Tela 06 — Acesso
- **Alterações:**
  1. Inclusão de resumo compacto do pedido (roteiro, data, horário e participantes) sobre a imagem lateral para reduzir ansiedade e perda de contexto durante o login/cadastro simulado.

### Tela 07 — Revisão da Solicitação
- **Alterações:**
  1. Exibição consolidada de modalidade, data + horário, ponto de encontro, participantes e preferências extras.
  2. Quadro completo da **Política de Cancelamento** (100% ≥15d, 75% 7–14d, 50% 3–6d, 0% <3d; 100% se guia/plataforma cancelar) visível antes do envio.
  3. Resumo financeiro claro distinguindo o valor do guiamento de despesas pagas nos estabelecimentos, reforçando que não há cobrança antes do aceite do guia (hold de 24h na versão completa).

### Tela 08 — Solicitação Enviada
- **Alterações:**
  1. Protocolo demonstrativo, resumo com ponto de encontro, horário e valor estimado.
  2. Próximos passos ampliados com orientações práticas de pontualidade, acesso viário e suporte.

### Modo 03 — Fluxo (v2)
- **Alteração:** Fluxograma SVG atualizado para refletir a decisão explícita entre **usar apenas roteiro digital** ou **contratar guia presencial**, além das novas etapas de modalidade, ponto de encontro e conferência de cancelamento.

---

## 4. Transparência e Limites do Protótipo

- Todos os perfis de guias, números de registro Cadastur, avaliações e valores exibidos na interface são **demonstrativos para fins acadêmicos**; nenhuma credencial real é validada e nenhuma reserva ou cobrança real é processada.
- Os alertas de movimento e sazonalidade são **orientativos**, baseados nos dados históricos do Boletim ASGUIT 2025, e não representam integração com GPS ou trânsito em tempo real.
- A versão **v1** foi mantida integralmente acessível pelo seletor de versão no topo para preservar o histórico do projeto e permitir comparação direta em testes de usabilidade.
