# Plano de Implementação: Otimização Editorial dos Destaques do LinkedIn, Efeito Spotlight e Showcase de Engenharia de Prompt

## 1. Resumo Executivo & Decisões Alinhadas

Com base nas preferências confirmadas pelo usuário, este plano estrutura o refinamento da seção de Destaques do LinkedIn, a adição de controles de curadoria no Modo ADM, o enriquecimento de microinterações com efeito Spotlight e a inclusão de um módulo interativo de Engenharia de Prompt & IA Aplicada.

### Decisões do Usuário
* **Abas do LinkedIn:** Reduzir de 6 para 4 abas principais coesas, eliminando o excesso visual e quebra de linha.
  1. `Todas as Publicações`
  2. `Credenciais & Carreira` (unifica certificações e eventos de carreira)
  3. `Palestras & Histórias` (unifica palestras presenciais e trajetória)
  4. `Artigos & Insights` (artigos, análises de mercado e reflexões)
* **Paginação Editorial:** Exibição inicial dos 6 primeiros posts na aba "Todas", com botão editorial suave *"Carregar mais publicações (+N)"* com contagem dinâmica.
* **Reordenação no Modo ADM:** Adicionar botões de navegação rápida (Mover para esquerda / Mover para direita) nos cards do LinkedIn quando o Modo ADM estiver ativo, salvando a nova ordem imediatamente no arquivo do projeto.
* **Efeito Spotlight Suave:** Adicionar iluminação sutil radial guiada pelas coordenadas do cursor (`onMouseMove`) sobre os cartões do portfólio, acentuando a profundidade no tema escuro e claro com cor cobalto translúcida.
* **Showcase Interativo de Engenharia de Prompt & IA:** Criar um módulo técnico interativo que demonstra o domínio de Matheus em engenharia de prompt (estrutura de Persona, Contexto, Instruções e Guardrails), permitindo que recrutadores e clientes testem diferentes templates de prompts reais de Marketing/CRM e copiem em 1 clique.

---

## 2. Experiência do Usuário & Detalhamento Visual

### 2.1 Segmentação Limpa em 4 Abas
* **Estrutura Visual:** Pílula segmentada contínua (`bg-[#F4F3EE] dark:bg-[#1C1C1A]` com borda hairline de 1px).
* **Contadores Numéricos Tabulares:** Cada aba exibe a contagem real atualizada em JetBrains Mono (`tabular-nums font-mono`).
* **Transição Suave:** Animação física suave com Framer Motion (`AnimatePresence mode="wait"`).

### 2.2 Reordenação de Posts (Modo ADM)
* Semelhante ao gerenciador de vitrine do Behance já existente: quando o usuário ativa o Modo ADM, cada card de destaque ganha um controle discreto no topo superior direito com setas para reordenar (`ChevronLeft`, `ChevronRight`) e lixeira para exclusão.
* A reorganização atualiza o estado e faz POST imediato para `/api/save-portfolio`, persistindo no disco e no `localStorage`.

### 2.3 Efeito Spotlight nos Cartões
* Um efeito de iluminação suave em gradiente radial (`radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`) que segue a posição do cursor sobre os cards interativos.
* No modo escuro, destaca suavemente as bordas hairline sem brilho excessivo ou distração visual.

### 2.4 Módulo Interativo de Engenharia de Prompt & IA
* Posicionado de forma nobre antes ou dentro da seção de Competências / Destaques:
  - **Seletor de Casos de Uso:**
    1. *Otimização de CTR & Teste A/B em Régua de CRM*
    2. *Automação de Qualificação de Leads (Lead Scoring Inteligente)*
    3. *Arquitetura de Prompt para Tom de Voz de Marca & Copywriting*
  - **Visualizador Estrutural:** Demonstração didática das camadas de prompt: `# PERSONA & PAPEL`, `# CONTEXTO & DADOS`, `# REGRAS & FORMATAÇÃO`, `# FEW-SHOT EXAMPLES`.
  - **Ação Rápida:** Botão para copiar o prompt completo com feedback tátil Fitts's Law ("✓ Prompt Copiado!").

---

## 3. Arquitetura Técnica & Diagrama de Componentes

```
┌────────────────────────────────────────────────────────────────────────┐
│                          App.tsx (Root State)                          │
│        [useTheme] · [handleMoveLinkedInHighlight] · [Spotlight]        │
└───────┬────────────────────────────────────────────────────────┬───────┘
        │                                                        │
┌───────▼────────────────────────┐              ┌────────────────▼───────┐
│ LinkedInHighlightsSection.tsx  │              │  PromptShowcase.tsx    │
│  - 4 Clean Segmented Tabs      │              │  - Framework Editorial │
│  - 6 initial + "Carregar Mais" │              │  - 3 Casos Reais de IA │
│  - ADM Reorder (prev/next)     │              │  - Cópia Fitts's Law   │
│  - Card Spotlight Effect       │              │  - Cobalt Theme Accent │
└────────────────────────────────┘              └────────────────────────┘
```

---

## 4. Fases de Execução

1. **Refatoração do `LinkedInHighlightsSection.tsx`:**
   - Consolidar as abas em 4 categorias definitivas com contadores dinâmicos.
   - Implementar limite inicial de 6 publicações com botão de expansão suave.
   - Adicionar manipuladores `onMoveHighlight(id, direction)` e botões visíveis no Modo ADM.
   - Adicionar efeito Spotlight suave que calcula as coordenadas do mouse no card.
2. **Atualização do `src/App.tsx`:**
   - Implementar o handler `handleMoveLinkedInHighlight(id, direction)` com persistência imediata em `/api/save-portfolio`.
3. **Criação do `PromptEngineeringShowcase.tsx`:**
   - Desenvolver o componente interativo de Engenharia de Prompt & IA Aplicada, integrando-o harmonicamente na grade editorial.
4. **Verificação & Build:**
   - Executar `compile_applet` e `lint_applet` conjuntamente e validar comportamento interativo.
