import { useTheme } from '@/shared/hooks/useTheme';
import { type ComponentPropsWithoutRef } from 'react';
import StackIcon from 'tech-stack-icons';

export type TechStackItemProps = ComponentPropsWithoutRef<typeof StackIcon>;

export const TechStackItem = ({ name, ...props }: TechStackItemProps) => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2">
      <StackIcon name={name} variant={theme === 'dark' ? 'dark' : 'light'} {...props} />
    </div>
  );
};
