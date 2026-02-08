import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WorkExperience } from '@/entities/work';

export function WorkTimeLineItem({ work }: { work: WorkExperience }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {/* Company Info */}
      <div className="mb-4 flex items-center gap-3">
        {work.company.logo && <div className="size-14">{work.company.logo}</div>}
        <div>
          <h4 className="text-foreground text-lg font-semibold">{work.company.name}</h4>
          <p className="text-muted-foreground text-base">{work.position}</p>
        </div>
      </div>

      {/* Descriptions */}
      {work.descriptions.map((desc, index) => (
        <p
          key={index}
          className="mb-4 text-sm font-normal text-neutral-800 md:text-base dark:text-neutral-200"
        >
          {desc}
        </p>
      ))}

      {/* Achievements */}
      {work.achievements && work.achievements.length > 0 && (
        <ul className="mb-6 list-inside list-disc space-y-2">
          {work.achievements.map((achievement, index) => (
            <li key={index} className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
              {achievement}
            </li>
          ))}
        </ul>
      )}

      {/* Technologies */}
      {work.technologies && work.technologies.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {work.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-primary/10 text-primary rounded-md px-2 py-1 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Images */}
      {work.images && work.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {work.images.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              width={image.width || 500}
              height={image.height || 500}
              className="h-20 w-full cursor-pointer rounded-sm object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:scale-105 md:h-48 lg:h-60"
              onClick={() => setSelectedImage(image.src)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            />
          ))}
        </div>
      )}

      {/* Custom Content */}
      {work.customContent && <div className="mt-4">{work.customContent}</div>}

      {/* Image Popup with Zoom Animation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size preview"
                className="h-auto max-h-[90vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-background/80 hover:bg-background absolute -top-4 -right-4 flex size-10 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close preview"
              >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
