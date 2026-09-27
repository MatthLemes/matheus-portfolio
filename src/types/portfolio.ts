export interface SocialLinks {
  linkedin: string;
  behance: string;
  medium?: string;
  email: string;
  github?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  type?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  score?: string;
}

export interface EmbeddedProject {
  id: string;
  title: string;
  description: string;
  category: string;
  embedCodeOrUrl: string; // iframe snippet, Behance URL, Figma URL or embed URL
  externalUrl?: string;
  tags: string[];
}

export interface SpotifyEmbedItem {
  id: string;
  title: string;
  subtitle?: string;
  embedUrlOrCode: string; // spotify embed URL or iframe code
  externalUrl?: string;
}

export interface PoetryCompactItem {
  id: string;
  title: string;
  excerpt: string;
  mediumUrl: string;
  date?: string;
}

export interface LinkedInHighlight {
  id: string;
  title: string;
  snippet: string;
  url: string;
  imageUrl?: string;
  embedCode?: string;
  date?: string;
  tag?: string;
}

export interface PortfolioData {
  name: string;
  headline: string;
  about: string;
  location: string;
  email: string;
  links: SocialLinks;
  experiences: ExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  embeddedProjects: EmbeddedProject[];
  spotifyPlaylists: SpotifyEmbedItem[];
  compactPoems: PoetryCompactItem[];
  linkedInHighlights: LinkedInHighlight[];
}
