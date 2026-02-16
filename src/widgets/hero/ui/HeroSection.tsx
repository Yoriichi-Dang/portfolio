import { motion } from 'framer-motion';
import { profile } from '@/entities/profile';
import { MapPin, FileText } from 'lucide-react';
import { IconBrandLinkedin, IconBrandGithub, IconMail, IconCheck } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/shared/hooks/useCopy';
import { TypingAnimation } from '@/components/ui/typing-animation';

export const HeroSection = () => {
  const { copied, copyToClipboard } = useCopy();

  return (
    <section id="hero" className="container mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
        >
          <div className="mb-6">
            <h1 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl md:mb-6 lg:text-5xl">
              <TypingAnimation words={[`Hi, I'm ${profile.name}`]} loop />
            </h1>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg md:mb-8">
              {profile.bio.join(' ')}
            </p>
          </div>
          <div className="mb-6 flex flex-col items-center gap-2 md:mb-8 lg:items-start">
            <div className="text-muted-foreground flex items-center gap-2 text-sm sm:text-base">
              <MapPin className="size-4" />
              {profile.location}
            </div>
            <div className="text-muted-foreground flex items-center gap-3 text-sm sm:text-base">
              <div className="bg-primary size-2 rounded-full" />
              {profile.status}
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
            {/* Primary CTA - Preview Resume */}
            <Button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-2 transition-colors sm:w-auto"
              size="default"
            >
              <FileText className="size-4" />
              Preview Resume
            </Button>

            {/* Secondary - Social Links */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Button
                onClick={() => window.open(profile.social.github, '_blank')}
                variant="ghost"
                size="icon"
                className="size-10 sm:size-11"
              >
                <IconBrandGithub className="size-5 sm:size-6" />
              </Button>
              <Button
                onClick={() => window.open(profile.social.linkedin, '_blank')}
                variant="ghost"
                size="icon"
                className="size-10 sm:size-11"
              >
                <IconBrandLinkedin className="size-5 sm:size-6" />
              </Button>
              <Button
                onClick={() => copyToClipboard(profile.social.email)}
                variant="ghost"
                size="icon"
                className="size-10 sm:size-11"
              >
                {copied ? (
                  <IconCheck className="size-5 text-green-500 sm:size-6" />
                ) : (
                  <IconMail className="size-5 sm:size-6" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Avatar Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Stacked layers behind avatar */}
            <div className="bg-border/30 absolute top-2 left-2 size-48 rounded-2xl sm:top-3 sm:left-3 sm:size-56 md:size-64 lg:size-72 xl:size-80" />
            <div className="bg-border/20 absolute top-4 left-4 size-48 rounded-2xl sm:top-6 sm:left-6 sm:size-56 md:size-64 lg:size-72 xl:size-80" />

            {/* Gradient glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />

            {/* Main avatar */}
            <img
              src={profile.image}
              alt={profile.name}
              className="border-border relative size-48 rounded-2xl border-4 object-cover shadow-2xl sm:size-56 md:size-64 lg:size-72 xl:size-80"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
