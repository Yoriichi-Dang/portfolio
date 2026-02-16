'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconPhone, IconCopy, IconCheck } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/shared/hooks/useCopy';
import { CONTACT_INFO, INITIAL_FORM_DATA, type ContactFormData } from '@/entities/contact';

export const ContactSection = () => {
  const { copied, copyToClipboard } = useCopy();
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);

  // Update time every second - Vietnam timezone (UTC+7)
  useEffect(() => {
    const updateTime = () => {
      // Get time in Vietnam timezone (UTC+7)
      const vietnamTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(vietnamTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <section id="contact" className="pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-foreground text-4xl font-semibold md:text-5xl">Let&apos;s talk</h2>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Current Time */}
              <div>
                <p className="text-foreground mb-2 text-lg font-semibold">Time for me (UTC+7):</p>
                <p className="text-muted-foreground text-lg">{currentTime}</p>
              </div>

              {/* Email */}
              <div>
                <p className="text-foreground mb-3 text-lg font-semibold">Email:</p>
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.email)}
                  className="text-muted-foreground hover:text-foreground group flex items-center gap-2 transition-colors"
                >
                  {copied ? (
                    <IconCheck className="size-5 text-green-500" />
                  ) : (
                    <IconCopy className="size-5" />
                  )}
                  <span className="text-base">{CONTACT_INFO.email}</span>
                </button>
              </div>

              {/* Socials */}
              <div>
                <p className="text-foreground mb-3 text-lg font-semibold">Socials:</p>
                <div className="space-y-3">
                  {CONTACT_INFO.socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                      >
                        <Icon className="size-5" />
                        <span className="text-base">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="mb-6">
                <h3 className="text-foreground text-2xl font-semibold">Reach out:</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="Your Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={8}
                    className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="hover:bg-primary/90 w-full bg-white py-6 text-lg font-semibold text-black transition-colors hover:text-white"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
