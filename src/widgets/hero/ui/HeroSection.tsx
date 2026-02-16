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
    <section id="hero" className="container mx-auto max-w-6xl py-32">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <div>
            <h1 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
              <TypingAnimation words={[`Hi, I'm ${profile.name}`]} loop />
            </h1>
            <p className="text-muted-foreground mb-8 text-sm md:text-base">
              {profile.bio.join(' ')}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPin className="size-4" />
              {profile.location}
            </div>
            <div className="text-muted-foreground flex items-center gap-3">
              <div className="bg-primary ml-1 size-2 rounded-full" />
              {profile.status}
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Primary CTA - Preview Resume */}
            <Button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 transition-colors"
              size="default"
            >
              <FileText className="size-4" />
              Preview Resume
            </Button>

            {/* Secondary - Social Links */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => window.open(profile.social.github, '_blank')}
                variant="ghost"
                size="icon"
              >
                <IconBrandGithub size={'30'} />
              </Button>
              <Button
                onClick={() => window.open(profile.social.linkedin, '_blank')}
                variant="ghost"
                size="icon"
              >
                <IconBrandLinkedin />
              </Button>
              <Button
                onClick={() => copyToClipboard(profile.social.email)}
                variant="ghost"
                size="icon"
              >
                {copied ? <IconCheck className="text-green-500" /> : <IconMail />}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Avatar Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-1 flex justify-end md:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Stacked layers behind avatar */}
            <div className="bg-border/30 absolute top-3 left-3 size-64 rounded-2xl md:size-80" />
            <div className="bg-border/20 absolute top-6 left-6 size-64 rounded-2xl md:size-80" />

            {/* Gradient glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />

            {/* Main avatar */}
            <img
              src={profile.image}
              alt={profile.name}
              className="border-border relative size-64 rounded-2xl border-4 object-cover shadow-2xl md:size-80"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
