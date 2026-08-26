import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  children: React.ReactNode;
}

export function Card({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}: CardProps) {
  const variants = {
    default: 'bg-white border-espresso-100 shadow-soft',
    elevated: 'bg-white border-transparent shadow-large',
    bordered: 'bg-surface-secondary border-espresso-200 shadow-none',
    interactive: 'bg-white border-espresso-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 cursor-pointer',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}