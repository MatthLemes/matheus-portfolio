import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Sparkles, Cpu, Layers, ArrowUpRight, Zap, Target } from 'lucide-react';

interface PromptFramework {
  id: string;
  title: string;
  badge: string;
  category: string;
  persona: string;
  context: string;
  instructions: string[];
  outputFormat: string;
  expectedMetric: string;
  fullPromptText: string;
}

export const PromptEngineeringShowcase: React.FC = () => {
  const [activeFrameworkId, setActiveFrameworkId] = useState<string>('crm-ctr');
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const frameworks: PromptFramework[] = [
    {
      id: 'crm-ctr',
      title: 'Otimização de CTR & Teste A/B em Régua de CRM',
      badge: 'RD Station & HubSpot',
      category: 'Automação & Conversão',
      persona: 'Especialista Sênior em Growth Marketing e Automação de CRM com foco em métricas de abertura e clique.',
      context: 'Base de leads B2B que interagiram com material rico sobre tecnologia, mas não avançaram no funil de vendas nas últimas 3 semanas.',
      instructions: [
        'Gerar 3 variantes de linha de assunto com gatilhos de especificidade e curiosidade profissional (máx. 45 caracteres).',
        'Estruturar o corpo do e-mail no formato PAS (Problem, Agitate, Solve) em no máximo 120 palavras.',
        'Inserir um único Call-To-Action direto com verbo de ação clara para reduzir o custo cognitivo do leitor.',
        'Proibir o uso de clichês como "espero que este e-mail o encontre bem" ou jargões vazios de vendas.',
      ],
      outputFormat: 'Tabela comparativa com [Variante, Assunto, Preheader, Âncora do CTA e Hipótese de Conversão].',
      expectedMetric: '+40% de CTR e redução de 25% na taxa de descadastro (unsubscribe).',
      fullPromptText: `# PERSONA & PAPEL
Você é um Especialista Sênior em Growth Marketing e Automação de CRM com histórico comprovado de aumento de CTR no RD Station e HubSpot.

# CONTEXTO DO LEAD
- Segmento: Tomadores de decisão B2B e gestores operacionais.
- Histórico: Baixaram o material rico há 21 dias e esfriaram no fluxo.
- Meta: Reengajar e estimular clique em demonstração interativa.

# DIRETRIZES & GUARDRAILS
1. Gere 3 opções de linha de assunto (máx. 45 caracteres) sem pontuação excessiva.
2. Aplique a estrutura Problem-Agitate-Solve com linguagem editorial limpa.
3. Call-To-Action único (Fitts's Law) com verbo claro de benefício.
4. Jamais use saudações mecânicas como "espero encontrá-lo bem".

# FORMATO ESPERADO
Apresente em tabela Markdown:
| Variante | Assunto | Preheader | Texto do CTA | Justificativa Psicológica |`,
    },
    {
      id: 'lead-scoring',
      title: 'Qualificação Preditiva & Lead Scoring com IA',
      badge: 'Engenharia de Prompt',
      category: 'Inteligência Artificial',
      persona: 'Arquiteto de Inteligência de Vendas e Engenharia de Prompt para CRM e Análise de Comportamento.',
      context: 'Recebimento de transcrições e formulários abertos de contato solicitando orçamentos e consultorias corporativas.',
      instructions: [
        'Analisar os pontos de dor explícitos e implícitos contidos na mensagem do prospect.',
        'Atribuir uma nota de 1 a 100 para maturidade digital e urgência orçamentária.',
        'Identificar 3 objeções potenciais que o SDR deve antecipar na primeira abordagem.',
        'Sintetizar um briefing executivo de 3 linhas pronto para ser enviado via Webhook ao CRM.',
      ],
      outputFormat: 'JSON estruturado contendo score, prioridade (Alta/Média/Baixa), objeções e resumo executivo.',
      expectedMetric: 'Aceleração de 3x no tempo de primeira resposta do SDR e filtragem de leads sem fit.',
      fullPromptText: `# PERSONA
Atue como um Arquiteto de Inteligência de Vendas especializado em Lead Scoring preditivo e análise de linguagem natural.

# TAREFA & PROCESSAMENTO
Analise a transcrição de formulário e gere a qualificação técnica:
- Pontos de dor centrais (explícitos e latentes).
- Nota de maturidade de compra (0 a 100).
- Três objeções imediatas para o time comercial antecipar.

# RESTRIÇÕES & SEGURANÇA
- Somente dados comprovados pela mensagem devem impactar a pontuação.
- Não invente informações ausentes; classifique campos indefinidos como "null".

# SAÍDA ESTRUTURADA (JSON)
{
  "lead_score": number,
  "priority": "HIGH" | "MEDIUM" | "LOW",
  "key_pains": string[],
  "anticipated_objections": string[],
  "sdr_executive_summary": string
}`,
    },
    {
      id: 'tone-editorial',
      title: 'Arquitetura de Tom de Voz & Copywriting Editorial',
      badge: 'Design System & Copy',
      category: 'Identidade & Conteúdo',
      persona: 'Diretor Criativo e Estrategista de Conteúdo focado em marcas contemporâneas de tecnologia e design.',
      context: 'Produção de artigos e posts para LinkedIn visando autoridade técnica, sem clichês algorítmicos ou tom excessivamente corporativo.',
      instructions: [
        'Adotar uma cadência rítmica variada com frases curtas de impacto intercaladas por raciocínios articulados.',
        'Utilizar métricas tabulares e evidências reais em vez de afirmações superlativas não fundamentadas.',
        'Eliminar emojis excessivos, hashtags genéricas e chavões de autoajuda corporativa.',
        'Concluir com uma provocação intelectual que convide à troca profissional nos comentários.',
      ],
      outputFormat: 'Texto completo pronto para publicação com gancho visual e estrutura de leitura vertical escaneável.',
      expectedMetric: 'Aumento de 2.5x no engajamento qualificado e compartilhamentos orgânicos.',
      fullPromptText: `# PAPEL EDITORIAL
Você é um Estrategista de Conteúdo e Diretor de Criação para marcas contemporâneas de tecnologia e design.

# PRINCÍPIOS DA VOZ
- Direto, elegante, fundamentado em dados e sem floreios de autoajuda.
- Proibido usar "No mundo dinâmico de hoje...", "Desbloqueie seu potencial" ou emojis em excesso.
- Use números reais e referências conceituais sólidas.

# ESTRUTURA DO ARTIGO
1. Hook de quebra de padrão em 1 linha.
2. Contextualização do problema com exemplo prático de mercado.
3. Solução com 3 pilares acionáveis numerados.
4. Provocação final aberta para debate qualificado.`,
    },
  ];

  const activeFramework = frameworks.find((f) => f.id === activeFrameworkId) || frameworks[0];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(activeFramework.fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="prompt-engineering" className="py-16 md:py-20 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#121211] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] mb-1.5 font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>08. Metodologia de IA Aplicada</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#141414] dark:text-[#F5F5F0] tracking-tight">
              Engenharia de Prompt & Automação
            </h2>
            <p className="text-xs sm:text-sm text-[#57574F] dark:text-[#A8A89E] mt-2 max-w-2xl leading-relaxed">
              Estruturas de prompts profissionais desenhadas para extrair consistência de modelos avançados em automação comercial, CRM e comunicação editorial.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#73736C] dark:text-[#A8A89E] hidden sm:inline">
              Padronização Harvard & Google
            </span>
          </div>
        </div>

        {/* Framework Selector Pills (Zero-Pill Editorial Buttons) */}
        <div className="mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F4F3EE] dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl text-xs font-mono shadow-2xs">
            {frameworks.map((fw) => {
              const isActive = activeFrameworkId === fw.id;

              return (
                <button
                  key={fw.id}
                  onClick={() => {
                    setActiveFrameworkId(fw.id);
                    setCopied(false);
                  }}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-120 whitespace-nowrap font-medium flex items-center gap-2 ${
                    isActive
                      ? 'bg-white dark:bg-[#242422] text-[#2563EB] dark:text-[#3B82F6] shadow-2xs font-semibold'
                      : 'text-[#57574F] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{fw.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Framework Card with Mouse Spotlight */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="magnetic-card relative bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] hover:border-[#2563EB] dark:hover:border-[#3B82F6] rounded-2xl p-6 sm:p-8 transition-all duration-150 shadow-2xs hover:shadow-md overflow-hidden"
        >
          {/* Radial mouse spotlight */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-200 z-1"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
            }}
            aria-hidden="true"
          />

          <div className="relative z-2 space-y-6">
            {/* Top Bar inside Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E6DF] dark:border-[#2E2E2A] gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] dark:text-[#3B82F6] mb-1 font-semibold">
                  <span>{activeFramework.category}</span>
                  <span>·</span>
                  <span>{activeFramework.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#181816] dark:text-white tracking-tight">
                  {activeFramework.title}
                </h3>
              </div>

              {/* 1-Click Copy with Tactile Feedback */}
              <button
                onClick={handleCopyPrompt}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold rounded-lg transition-all duration-120 hover:-translate-y-0.5 shadow-2xs shrink-0 ${
                  copied
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white'
                }`}
                title="Copiar prompt completo para a área de transferência"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>✓ Prompt Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Prompt Estruturado</span>
                  </>
                )}
              </button>
            </div>

            {/* Structured Layers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Layer 1: Persona & Contexto */}
              <div className="p-4 bg-[#F4F3EE]/60 dark:bg-[#242422]/60 border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold block mb-1">
                    01. Persona & Atribuição
                  </span>
                  <p className="text-xs sm:text-sm text-[#181816] dark:text-[#F5F5F0] leading-relaxed">
                    {activeFramework.persona}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E6DF]/50 dark:border-[#2E2E2A]/50">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold block mb-1">
                    Contexto do Negócio
                  </span>
                  <p className="text-xs text-[#57574F] dark:text-[#A8A89E] leading-relaxed">
                    {activeFramework.context}
                  </p>
                </div>
              </div>

              {/* Layer 2: Formato & Métrica Esperada */}
              <div className="p-4 bg-[#F4F3EE]/60 dark:bg-[#242422]/60 border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold block mb-1">
                    02. Contrato de Saída & Estrutura
                  </span>
                  <p className="text-xs sm:text-sm text-[#181816] dark:text-[#F5F5F0] leading-relaxed">
                    {activeFramework.outputFormat}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E6DF]/50 dark:border-[#2E2E2A]/50">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
                    Impacto Estimado na Operação
                  </span>
                  <p className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-300">
                    {activeFramework.expectedMetric}
                  </p>
                </div>
              </div>
            </div>

            {/* Layer 3: Instruções & Guardrails */}
            <div className="p-4 sm:p-5 bg-[#FAF9F5] dark:bg-[#181816] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#73736C] dark:text-[#A8A89E] font-semibold block">
                03. Guardrails & Regras de Execução
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A4A42] dark:text-[#D4D4CA]">
                {activeFramework.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#2563EB] dark:text-[#3B82F6] font-mono text-[11px] mt-0.5">
                      ›
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
