import Icon from '@/assets/logo.svg?react';
import { cn } from '@/lib/utils';

type AppLogoLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'h-5.5',
  md: 'h-10',
  lg: 'h-12',
};

export function AppLogo({ className, size = 'md' }: AppLogoLogoProps) {
  return <Icon className={cn(sizeMap[size], className)} />;
}
