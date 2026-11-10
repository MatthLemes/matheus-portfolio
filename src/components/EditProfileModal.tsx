import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Check,
  Sliders,
  Copy,
  CheckCheck,
  User,
  Briefcase,
  GraduationCap,
  Trophy,
  Wrench,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  PortfolioData,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  AchievementItem,
  LanguageItem,
  SkillCategory,
} from '../types/portfolio';

interface EditProfileModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

type TabKey = 'perfil' | 'experiencias' | 'formacao' | 'conquistas' | 'skills';

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('perfil');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar as informações padrão do portfólio?')) {
      onReset();
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  // Helper mutations for Experiences
  const updateExperience = (index: number, updated: Partial<ExperienceItem>) => {
    const list = [...formData.experiences];
    list[index] = { ...list[index], ...updated };
    setFormData({ ...formData, experiences: list });
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Novo Cargo',
      company: 'Empresa',
      location: 'São Paulo, Brasil',
      period: '2024 · Atual',
      description: 'Breve descrição das responsabilidades...',
      highlights: ['Destaque principal 1', 'Destaque principal 2'],
    };
    setFormData({ ...formData, experiences: [newItem, ...formData.experiences] });
  };

  const removeExperience = (index: number) => {
    const list = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: list });
  };

  // Helper mutations for Education
  const updateEducation = (index: number, updated: Partial<EducationItem>) => {
    const list = [...formData.education];
    list[index] = { ...list[index], ...updated };
    setFormData({ ...formData, education: list });
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Curso / Graduação',
      institution: 'Instituição de Ensino',
      period: '2020 - 2024',
    };
    setFormData({ ...formData, education: [...formData.education, newItem] });
  };

  const removeEducation = (index: number) => {
    const list = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: list });
  };

  // Helper mutations for Certifications
  const updateCertification = (index: number, updated: Partial<CertificationItem>) => {
    const list = [...formData.certifications];
    list[index] = { ...list[index], ...updated };
    setFormData({ ...formData, certifications: list });
  };

  const addCertification = () => {
    const newItem: CertificationItem = {
      name: 'Nome da Certificação',
      issuer: 'Emissor (ex: Harvard, Google)',
      year: '2024',
    };
    setFormData({ ...formData, certifications: [...formData.certifications, newItem] });
  };

  const removeCertification = (index: number) => {
    const list = formData.certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, certifications: list });
  };

  // Helper mutations for Languages
  const updateLanguage = (index: number, updated: Partial<LanguageItem>) => {
    const list = [...formData.languages];
    list[index] = { ...list[index], ...updated };
    setFormData({ ...formData, languages: list });
  };

  const addLanguage = () => {
    const newItem: LanguageItem = {
      language: 'Novo Idioma',
      proficiency: 'Intermediário',
    };
    setFormData({ ...formData, languages: [...formData.languages, newItem] });
  };

  const removeLanguage = (index: number) => {
    const list = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: list });
  };

  // Helper mutations for Achievements
  const updateAchievement = (index: number, updated: Partial<AchievementItem>) => {
    const list = [...formData.achievements];
    list[index] = { ...list[index], ...updated };
    setFormData({ ...formData, achievements: list });
  };

  const addAchievement = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: 'Título da Conquista',
      organization: 'Organização ou Prêmio',
      year: '2024',
      description: 'Descrição sucinta da premiação ou projeto aprovado...',
    };
    setFormData({ ...formData, achievements: [...formData.achievements, newItem] });
  };

  const removeAchievement = (index: number) => {
    const list = formData.achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: list });
  };

  // Helper mutations for Skills
  const updateSkillCategory = (index: number, updated: Partial<SkillCategory>) => {
    const list = [...formData.skills];
    list[index] = { ...list[index], ...updated };
    setFormData({ ...formData, skills: list });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#1C1C1A] border border-[#E8E6DF] dark:border-[#2E2E2A] text-[#181816] dark:text-[#F5F5F0] rounded-xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#181816] shrink-0">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
            <h3 className="text-base font-semibold font-sans">
              Gerenciador Editorial Completo (Modo ADM)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#73736C] hover:text-[#181816] dark:hover:text-white transition-colors rounded-lg hover:bg-[#F4F3EE] dark:hover:bg-[#242422]"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5]/50 dark:bg-[#151514] overflow-x-auto no-scrollbar shrink-0 px-4">
          <button
            type="button"
            onClick={() => setActiveTab('perfil')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'perfil'
                ? 'border-[#2563EB] text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]'
                : 'border-transparent text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Perfil & Links</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('experiencias')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'experiencias'
                ? 'border-[#2563EB] text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]'
                : 'border-transparent text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trajetória ({formData.experiences.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('formacao')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'formacao'
                ? 'border-[#2563EB] text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]'
                : 'border-transparent text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Formação & Certificações</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('conquistas')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'conquistas'
                ? 'border-[#2563EB] text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]'
                : 'border-transparent text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Conquistas ({formData.achievements.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-[#2563EB] text-[#2563EB] dark:border-[#3B82F6] dark:text-[#3B82F6]'
                : 'border-transparent text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Habilidades ({formData.skills.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* TAB 1: PERFIL & LINKS */}
            {activeTab === 'perfil' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold mb-3">
                    Identificação & Apresentação
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                            links: { ...formData.links, email: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                      Localização
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                      Headline / Cargo Principal
                    </label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                      Sobre Mim / Resumo Editorial
                    </label>
                    <textarea
                      rows={5}
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB] resize-y"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold mb-3">
                    Links das Redes Sociais & Portfólios
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, linkedin: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                        Behance URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.behance}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, behance: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                        Medium URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.medium || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, medium: e.target.value },
                          })
                        }
                        placeholder="https://medium.com/@..."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                        GitHub URL (Opcional)
                      </label>
                      <input
                        type="url"
                        value={formData.links.github || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, github: e.target.value },
                          })
                        }
                        placeholder="https://github.com/..."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-[#FAF9F5] dark:bg-[#121211] focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TRAJETÓRIA PROFISSIONAL */}
            {activeTab === 'experiencias' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                      Experiências Profissionais
                    </h4>
                    <p className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-0.5">
                      Edite cargos, empresas, períodos e os pontos de impacto de cada experiência.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Experiência</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.experiences.map((exp, index) => (
                    <div
                      key={exp.id || index}
                      className="p-4 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-[#2563EB] dark:text-[#3B82F6]">
                          0{index + 1}. {exp.company}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="text-[#A8A89E] hover:text-red-500 transition-colors p-1"
                          title="Remover experiência"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                            Cargo / Função
                          </label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(index, { role: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                            Empresa
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(index, { company: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                            Período
                          </label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateExperience(index, { period: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                            Localização
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(index, { location: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                          Descrição Geral
                        </label>
                        <textarea
                          rows={2}
                          value={exp.description || ''}
                          onChange={(e) => updateExperience(index, { description: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                          Pontos de Destaque (um por linha)
                        </label>
                        <textarea
                          rows={3}
                          value={(exp.highlights || []).join('\n')}
                          onChange={(e) =>
                            updateExperience(index, {
                              highlights: e.target.value
                                .split('\n')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          placeholder="Linha 1&#10;Linha 2"
                          className="w-full px-3 py-1.5 text-xs font-mono border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FORMAÇÃO & CERTIFICAÇÕES */}
            {activeTab === 'formacao' && (
              <div className="space-y-6">
                {/* Educação */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                      Formação Acadêmica
                    </h4>
                    <button
                      type="button"
                      onClick={addEducation}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Adicionar Formação</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.education.map((edu, index) => (
                      <div
                        key={edu.id || index}
                        className="p-3 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                          <input
                            type="text"
                            placeholder="Curso / Grau"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, { degree: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                          <input
                            type="text"
                            placeholder="Instituição"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, { institution: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                          <input
                            type="text"
                            placeholder="Período"
                            value={edu.period}
                            onChange={(e) => updateEducation(index, { period: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="text-[#A8A89E] hover:text-red-500 p-1"
                          title="Remover formação"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificações */}
                <div className="pt-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                      Certificações & Cursos Relevantes
                    </h4>
                    <button
                      type="button"
                      onClick={addCertification}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Adicionar Certificação</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="p-3 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                          <input
                            type="text"
                            placeholder="Nome da Certificação"
                            value={cert.name}
                            onChange={(e) => updateCertification(index, { name: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                          <input
                            type="text"
                            placeholder="Emissor (Harvard, Google)"
                            value={cert.issuer}
                            onChange={(e) => updateCertification(index, { issuer: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                          <input
                            type="text"
                            placeholder="Ano"
                            value={cert.year}
                            onChange={(e) => updateCertification(index, { year: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="text-[#A8A89E] hover:text-red-500 p-1"
                          title="Remover certificação"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Idiomas */}
                <div className="pt-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A] mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                      Idiomas
                    </h4>
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Adicionar Idioma</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.languages.map((lang, index) => (
                      <div
                        key={index}
                        className="p-3 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 w-full">
                          <input
                            type="text"
                            placeholder="Idioma (ex: Inglês)"
                            value={lang.language}
                            onChange={(e) => updateLanguage(index, { language: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                          <input
                            type="text"
                            placeholder="Proficiência (ex: Fluente, Avançado)"
                            value={lang.proficiency}
                            onChange={(e) => updateLanguage(index, { proficiency: e.target.value })}
                            className="px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLanguage(index)}
                          className="text-[#A8A89E] hover:text-red-500 p-1"
                          title="Remover idioma"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CONQUISTAS & PREMIAÇÕES */}
            {activeTab === 'conquistas' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                      Projetos & Conquistas Notáveis
                    </h4>
                    <p className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-0.5">
                      Edite os prêmios, editais aprovados e reconhecimentos em destaque.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addAchievement}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] rounded-lg transition-colors shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Conquista</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.achievements.map((ach, index) => (
                    <div
                      key={ach.id || index}
                      className="p-4 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-[#2563EB] dark:text-[#3B82F6]">
                          0{index + 1}. {ach.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeAchievement(index)}
                          className="text-[#A8A89E] hover:text-red-500 transition-colors p-1"
                          title="Remover conquista"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                            Título da Conquista
                          </label>
                          <input
                            type="text"
                            value={ach.title}
                            onChange={(e) => updateAchievement(index, { title: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                            Ano
                          </label>
                          <input
                            type="text"
                            value={ach.year}
                            onChange={(e) => updateAchievement(index, { year: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                          Organização / Programa
                        </label>
                        <input
                          type="text"
                          value={ach.organization}
                          onChange={(e) => updateAchievement(index, { organization: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                          Descrição
                        </label>
                        <textarea
                          rows={2}
                          value={ach.description}
                          onChange={(e) => updateAchievement(index, { description: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: HABILIDADES */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="pb-2 border-b border-[#E8E6DF] dark:border-[#2E2E2A]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-semibold">
                    Categorias & Ferramentas
                  </h4>
                  <p className="text-xs text-[#73736C] dark:text-[#A8A89E] mt-0.5">
                    Separe cada habilidade por vírgula (ex: Figma, Adobe Photoshop, UI/UX).
                  </p>
                </div>

                <div className="space-y-4">
                  {formData.skills.map((cat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-[#FAF9F5] dark:bg-[#151514] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-xl space-y-3"
                    >
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                          Nome da Categoria
                        </label>
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => updateSkillCategory(index, { category: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs font-semibold border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#73736C] dark:text-[#A8A89E] mb-1">
                          Itens / Competências (separadas por vírgula)
                        </label>
                        <textarea
                          rows={2}
                          value={cat.items.join(', ')}
                          onChange={(e) =>
                            updateSkillCategory(index, {
                              items: e.target.value
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg bg-white dark:bg-[#1C1C1A] focus:outline-none focus:border-[#2563EB]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#E8E6DF] dark:border-[#2E2E2A] bg-[#FAF9F5] dark:bg-[#181816] shrink-0">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJson}
                className="text-xs font-mono font-medium text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F4F3EE] dark:bg-[#242422] border border-[#E8E6DF] dark:border-[#2E2E2A] rounded-lg transition-colors"
                title="Copiar dados formatados para backup ou envio"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Dados (JSON)</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#73736C] dark:text-[#A8A89E] hover:text-[#181816] dark:hover:text-white transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] transition-colors rounded-lg shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Salvo!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
