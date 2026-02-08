import type { WorkExperience } from './types';
import StackIcon from 'tech-stack-icons';

/**
 * Example work experience data
 */
export const workExperienceExample: WorkExperience[] = [
  {
    period: '11/2025 - Present',
    company: {
      name: 'Tech Company Inc.',
      logo: <StackIcon name="react" className="size-12" />,
    },
    position: 'Senior Full-Stack Developer',
    descriptions: [
      'Led development of AI-powered features that increased user engagement by 40%',
      'Architected and implemented microservices infrastructure using Go and Kubernetes',
    ],
    achievements: [
      'Reduced API response time by 60% through optimization',
      'Mentored 5 junior developers and conducted code reviews',
      'Implemented CI/CD pipeline reducing deployment time from 2h to 15min',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Go',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
    ],
    images: [
      {
        src: 'https://assets.aceternity.com/templates/startup-1.webp',
        alt: 'Project dashboard',
      },
      {
        src: 'https://assets.aceternity.com/templates/startup-2.webp',
        alt: 'Analytics view',
      },
      {
        src: 'https://assets.aceternity.com/templates/startup-3.webp',
        alt: 'User management',
      },
      {
        src: 'https://assets.aceternity.com/templates/startup-4.webp',
        alt: 'Settings panel',
      },
    ],
  },
  {
    period: '10/2024 - 10/2025',
    company: {
      name: 'Startup XYZ',
      logo: <StackIcon name="nextjs" className="size-12" />,
    },
    position: 'Full-Stack Developer',
    descriptions: [
      'Built scalable web applications using Next.js and Node.js',
      'Collaborated with design team to implement pixel-perfect UIs',
    ],
    achievements: [
      'Launched 3 major features that attracted 10K+ users',
      'Improved SEO resulting in 3x organic traffic growth',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
    images: [
      {
        src: 'https://assets.aceternity.com/pro/hero-sections.png',
        alt: 'Hero section',
      },
      {
        src: 'https://assets.aceternity.com/features-section.png',
        alt: 'Features',
      },
    ],
  },
];
