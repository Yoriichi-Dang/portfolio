import type { ReactNode } from 'react';

/**
 * Image data for timeline content
 */
export interface TimelineImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * Work experience entry
 */
export interface WorkExperience {
  /** Time period (e.g., "11/2025 - Present") */
  period: string;

  /** Company information */
  company: {
    name: string;
    logo?: ReactNode;
  };

  /** Job position/title */
  position: string;

  /** Description paragraphs */
  descriptions: string[];

  /** Achievement list (optional) */
  achievements?: string[];

  /** Images/screenshots (optional) */
  images?: TimelineImage[];

  /** Technologies used (optional) */
  technologies?: string[];

  /** Custom content (optional) - for advanced customization */
  customContent?: ReactNode;
}

/**
 * Timeline entry - flexible format for Timeline component
 */
export interface TimelineEntry {
  /** Display title (usually the period) */
  title: string;

  /** Rendered content */
  content: ReactNode;
}

/**
 * Converts WorkExperience to TimelineEntry format
 */
export function workExperienceToTimelineEntry(work: WorkExperience): TimelineEntry {
  return {
    title: work.period,
    content: work.customContent || null, // Render logic will be in component
  };
}
