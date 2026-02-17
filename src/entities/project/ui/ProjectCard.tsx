import { motion } from 'framer-motion';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Project } from '../model/types';
import { Button } from '@/components/ui/button';
import { IconBrandGithub } from '@tabler/icons-react';
import { ArrowUpRight } from 'lucide-react';
type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const projectDetailPath = `/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCardClick = () => {
    window.location.href = projectDetailPath;
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group border-border bg-card relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-md border shadow-lg transition-all duration-300 hover:shadow-2xl"
      aria-label={`View details for ${project.title}`}
    >
      {/* Image */}
      <div className="h-full w-full">
        <div className="bg-muted relative h-58 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-card-foreground mb-2 text-2xl font-bold">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
      </div>
      <div className="flex items-center justify-end gap-2 p-4">
        {project.github && (
          <Button size="sm" asChild>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              <IconBrandGithub className="size-4" />
              Github
            </a>
          </Button>
        )}
        {project.demo && (
          <Button size="sm" variant="outline" asChild>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              <ArrowUpRight className="size-4" />
              Demo
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
