import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
} from '@tabler/icons-react';
import { profile } from '@/entities/profile';
import type { ContactInfo } from './contact.types';

export const CONTACT_INFO: ContactInfo = {
  email: profile.social.email,
  socials: [
    {
      name: 'GitHub',
      icon: IconBrandGithub,
      link: profile.social.github,
    },
    {
      name: 'LinkedIn',
      icon: IconBrandLinkedin,
      link: profile.social.linkedin,
    },
  ],
};

export const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: '',
};
