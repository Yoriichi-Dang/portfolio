import { Timeline } from '@/components/ui/timeline';
import type { WorkExperience } from '@/entities/work';
import { WorkTimeLineItem } from '@/features/work/ui/WorkTimeLineItem';

export function ExperienceTimeline() {
  // Structured work experience data
  const workExperiences: WorkExperience[] = [
    {
      period: '11/2025 - Present',
      company: {
        name: 'Spartan',
        logo: <img src="/spartan_logo.jpeg" alt="Spartan Logo" className="size-12 rounded-sm" />,
      },
      position: 'Software Engineer',
      descriptions: [
        'Built and developed AI agent projects, with a focus on creating a dedicated AI SDK for native mobile platforms. This SDK enables mobile developers to quickly integrate AI into apps without deep AI expertise, requiring only import and minimal configuration for smooth operation.',
        'Implemented an AI-powered slide deck generation system, similar to concepts like Gamma or Lovart. Managed the entire pipeline from user input prompts to generating slide images, supporting export to .pptx and static image formats, and enabling real-time image editing via AI segmentation. Additionally, developed a feature to render video slideshows with voice-over transcripts for presentations.',
      ],
      achievements: [
        'Authored RFC for a comprehensive referral system, including feature flag management, customizable rewards, frontend for link generation, and backend API for referral creation.',
        'Engineered automated email invitations using AWS SES and managed queue processing with AWS SQS for scalable invite delivery and status tracking.',
        'Implemented metrics and analytics for referral performance, reward triggers, and user engagement, fully integrated with PostHog for A/B testing and feature toggles.',
        'Delivered a full-stack implementation covering frontend, backend, infrastructure (AWS SQS, SES), and dynamic logic via feature flags for event and invite workflows.',
        'Leveraged TanStack Query and Zustand with React and Next.js to architect a high-performance web system, ensuring professional UI/UX strictly aligned with designs from Framer and Figma.',
      ],
      technologies: [
        'ReactJS',
        'Next.js',
        'Tanstack Query',
        'Zustand',
        'Tanstack Router',
        'TypeScript',
        'Kotlin',
        'Python',
        'PostgreSQL',
        'Redis',
        'Docker',
        'AWS',
        'Datadog',
        'Posthog',
        'CMS',
        'LangChain4j',
        'Terraform',
      ],
      images: [
        {
          src: '/layerproof.png',
          alt: 'Layerproof',
        },
      ],
    },
    {
      period: '10/2024 - 10/2025',
      company: {
        name: 'SoC.one',
        logo: <img src="/socone_logo.jpeg" alt="Spartan Logo" className="size-12 rounded-sm" />,
      },
      position: 'Full-Stack Developer',
      descriptions: [
        'Developed an AI-powered Q&A agent solution on big data infrastructure for a marketing company, building a high-performance web interface with virtualized lists and skeleton loading for optimal UX.',
        'Leveraged React Query and Zustand to ensure responsive, scalable data fetching and state management tailored to the demands of large-scale, real-time interactions.',
        'Designed and implemented the frontend for robust user experience, focusing on seamless integration, fast load times, and UI/UX standards that meet project requirements.',
        'Implemented a simulation project for autonomous vehicle telemetry, utilizing gRPC and WebSocket to stream data from a simulated system. The UI, built as a VSCode extension, visualizes dynamic changes in vehicle speed and parameters in real-time, and allows users to drag and drop components within a canvas to connect them and create custom workflows.',
      ],
      technologies: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'PostgreSQL',
        'Zustand',
        'Tanstack Query',
      ],
    },
  ];

  // Convert to timeline format
  const data = workExperiences.map((work) => ({
    title: work.period,
    content: <WorkTimeLineItem work={work} />,
  }));
  return (
    <div className="relative mt-4 w-full overflow-clip">
      <Timeline
        heading="Work Experience"
        description="I've been working on various projects for the past 2 years. Here's a timeline of my journey."
        data={data}
      />
    </div>
  );
}
