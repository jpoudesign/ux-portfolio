export type HookLineType = 'body' | 'header' | 'jared-link';

export interface HookLine {
  text: string;
  type: HookLineType;
}

export interface ProjectHook {
  lines: HookLine[];
  backgroundImage?: string;
}

export interface ProjectInfo {
  caseStudy: string;
  background: string;
  objective: string;
  role: string;
  team: string;
  image?: string;
}

export interface ProcessCard {
  header: string;
  text: string;
  image?: string;
  headerImage?: string;
}

export interface ProjectSubsection {
  id?: string;
  title: string;
  question?: string;
  cards: ProcessCard[];
}

export interface ProjectChaos {
  subsections: ProjectSubsection[];
}

export interface ProjectOrder {
  subsections: ProjectSubsection[];
}

export interface ProjectListMeta {
  title?: string;
  subtitle?: string;
  tags?: string[];
}

export interface Project {
  title: string;
  hook: ProjectHook;
  info: ProjectInfo;
  chaos: ProjectChaos;
  order: ProjectOrder;
  list?: ProjectListMeta;
}

export type ProjectSlug = string;
