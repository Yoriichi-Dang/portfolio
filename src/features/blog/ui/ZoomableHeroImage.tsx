import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';

type ZoomableHeroImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ZoomableHeroImage({
  src,
  alt,
  width = 1200,
  height = 600,
}: ZoomableHeroImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.99 }}
        className="group mx-auto mb-6 flex w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800"
        aria-label="Open image preview"
      >
        <motion.img
          layoutId={layoutId}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="block h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close image preview"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              className="relative z-10 w-full max-w-6xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <motion.img
                layoutId={layoutId}
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="h-auto max-h-[85vh] w-full rounded-xl object-contain shadow-2xl sm:rounded-2xl"
              />

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-background/85 text-foreground hover:bg-background absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full backdrop-blur-sm transition hover:scale-105"
                aria-label="Close preview"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </>
  );
}
