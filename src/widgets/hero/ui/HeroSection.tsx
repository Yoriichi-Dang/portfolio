import { motion } from 'framer-motion';
import { profile } from '@/entities/profile';
import { MapPin } from 'lucide-react';
import { IconBrandLinkedin, IconBrandGithub, IconMail, IconCheck } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/shared/hooks/useCopy';

export const HeroSection = () => {
  const { copied, copyToClipboard } = useCopy();

  return (
    <section id="hero" className="container mx-auto max-w-5xl px-4 py-32">
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
              Hi, I&apos;m {profile.name}
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
          <div className="mt-8 flex items-center gap-3">
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
        </motion.div>

        {/* Avatar Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-1 flex justify-center md:order-2"
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

      {/* 
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-muted-foreground mb-8 text-xl md:text-2xl"
      >
        {profile.title}
      </motion.p> */}

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a
          href="#projects"
          className="hover:bg-primary/90 bg-primary text-primary-foreground rounded-lg px-8 py-3 font-medium shadow-lg transition-colors duration-200 hover:shadow-xl"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="hover:bg-primary/10 border-primary text-primary rounded-lg border-2 px-8 py-3 font-medium transition-colors duration-200"
        >
          Get in Touch
        </a>
      </motion.div> */}
      {/* 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 flex justify-center gap-6"
      >
        <a
          href={profile.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.14 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href={profile.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>
      </motion.div> */}
    </section>
  );
};
