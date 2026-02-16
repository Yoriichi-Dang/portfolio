import type { IconType } from '@tabler/icons-react';

export interface SocialLink {
  name: string;
  icon: IconType;
  link: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  socials: SocialLink[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
