import { cn } from '@/lib/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ 
  className, 
  children, 
  size = 'default',
  ...props 
}: ContainerProps) {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1440px]',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}