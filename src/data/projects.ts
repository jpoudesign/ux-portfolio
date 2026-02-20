import type { Project } from '../types/project';

export const projects: Record<string, Project> = {
  'enterprise-design-system': {
    title: 'Enterprise Design System: creating order out of chaos',
    hook: {
      backgroundImage: '/assets/raingif.webp',
      lines: [
        { text: "It's been 10 years....", type: 'header' },
        { text: "Over a decade of software development at MLB without a unified design system has resulted in serious inconsistencies across enterprise applications.", type: 'body' },
        { text: "Many devs, 1 stressed designer", type: 'header' },
        { text: "Devs are manually styling components, creating errors that need time-consuming design reviews to fix. We only have one designer and she's already overworked!", type: 'body' },
        { text: "Sketch is a sinking ship, what can we do???", type: 'header' },
        { text: "If only we could hire a Figma wizard to rebuild our design library and help support our existing designer with projects in the future..", type: 'body' },
        { text: "Jared to the rescue!", type: 'jared-link' },
      ],
    },
    info: {
      caseStudy: 'Enterprise Design System: creating order out of chaos',
      background: "MLB's internal tools cover various employee roles and are crucial for broadcasting games globally.",
      objective: 'Unify 45+ web apps and 7 unique UI themes into a single design system.',
      role: 'Lead Designer',
      team: 'Design Manager, Engineering Manager',
      image: '/assets/project-details.png',
    },
    chaos: {
      subsections: [
        {
          id: 'audit',
          title: 'Audit',
          question: "The first step to improving a system is understanding what already exists, what's not working, and why?",
          cards: [
            {
              header: 'Hard-coded colors',
              text: '• Hard-coded colors\n• Can\'t make updates in bulk\n• Time-consuming design reviews\n• No dark mode capability\n• Inconsistent user experience\n• Outdated design software',
            },
            {
              header: "Sooo many products!",
              text: 'Over 45 custom-built web apps to support operations on and off the ballpark.',
              image: '/assets/somanyprojects.avif',
            },
            {
              header: '7 separate color themes',
              text: 'With no structure linking them together.',
              image: '/assets/7themes.webp',
            },
            {
              header: '"When should I use this color?"',
              text: 'Color names were based on appearance rather than function.',
              image: '/assets/colors.webp',
            },
            {
              header: 'Darth Vader dark mode',
              text: 'Midnight Theme was used as the only dark mode for all 40+ products.',
              image: '/assets/modes.webp',
              headerImage: '/assets/vader.webp',
            },
            {
              header: "And that's just color…",
              text: "There was also no system for catching WCAG accessibility issues,\nand no standard for the usage of:\nspacing\nfont sizes\nshadows\nborders\nor button hierarchy",
            },
          ],
        },
        {
          id: 'research',
          title: 'Research',
          question: 'What do users and stakeholders need?',
          cards: [
            {
              header: "Now that we've diagnosed the issues in our system.",
              text: "We can direct our research in a productive way. Some basic questions serve as a starting off point:\nWho is doing things right?\nWho has a robust system in Figma?\nWhat are industry best practices?",
            },
            {
              header: "We like Google's semantic color system",
              text: "Colors are named based on function. This allows for a single framework that can be used across many different themes.",
              image: '/assets/google.webp',
            },
            {
              header: "Atlassian has an industry-leading Figma file",
              text: "Intelligently built components and helpful guidance about best practices.",
              image: '/assets/atlassian.png',
            },
            {
              header: "This research revealed our next step…",
              text: "",
            },
            {
              header: "Figma deep-dive!",
              text: "We learned about tokens, variables, slots, modes, styles, libraries, collections, and more.",
              image: '/assets/figma.webp',
            },
          ],
        },
        {
          id: 'explore',
          title: 'Explore',
          question: 'What solutions might work?',
          cards: [
            { header: 'Figma migration', text: 'Evaluating tools and migration paths.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Migration' },
            { header: 'Component exploration', text: 'Sketching and prototyping components.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Components' },
          ],
        },
      ],
    },
    list: {
      title: 'Enterprise Design System',
      subtitle: 'Creating order out of chaos',
      tags: ['Design Systems', 'Figma', 'MLB'],
      hoverImage: '/assets/project-details.png',
    },
    order: {
      subsections: [
        {
          id: 'systemize',
          title: 'Systemize',
          question: 'Creating structure and standards.',
          cards: [
            { header: 'Design tokens', text: 'Establishing color, typography, and spacing tokens.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Tokens' },
            { header: 'Component library', text: 'Building reusable, documented components.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Library' },
          ],
        },
        {
          id: 'implement',
          title: 'Implement',
          question: 'Rolling out across products.',
          cards: [
            { header: 'Developer handoff', text: 'Clear documentation and code components.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Handoff' },
            { header: 'Adoption strategy', text: 'Phased rollout and training.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Adoption' },
          ],
        },
        {
          id: 'refine',
          title: 'Refine',
          question: 'Iterating based on feedback.',
          cards: [
            { header: 'Feedback loops', text: 'Continuous improvement from users and devs.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Feedback' },
            { header: 'Documentation', text: 'Living style guide and usage guidelines.', image: 'https://placehold.co/400x250/1a2a3a/0581EB?text=Docs' },
          ],
        },
      ],
    },
  },
};

export function getProject(slug: string): Project | null {
  return projects[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(projects);
}

export function getProjectsForList(): Array<{ slug: string; title: string; subtitle: string; tags: string[]; hoverImage?: string }> {
  return getAllProjectSlugs().map((slug) => {
    const p = projects[slug];
    const list = p.list;
    const [titlePart, subtitlePart] = p.title.split(': ');
    return {
      slug,
      title: list?.title ?? titlePart ?? p.title,
      subtitle: list?.subtitle ?? subtitlePart ?? '',
      tags: list?.tags ?? [],
      hoverImage: list?.hoverImage ?? p.info.image,
    };
  });
}
