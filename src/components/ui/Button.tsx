import Link from 'next/link';

import { cn } from '@/lib/cn';

type CommonProps = {
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

function styles({
  variant = 'primary',
  size = 'md',
}: Pick<CommonProps, 'variant' | 'size'>) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-taxi-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50';

  const sizes: Record<NonNullable<CommonProps['size']>, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  const variants: Record<NonNullable<CommonProps['variant']>, string> = {
    primary:
      'bg-taxi-yellow text-taxi-black shadow-sm hover:brightness-95 active:brightness-90',
    secondary:
      'bg-taxi-black text-white shadow-sm hover:opacity-95 active:opacity-90',
    ghost:
      'bg-transparent text-taxi-black hover:bg-black/5 active:bg-black/10',
  };

  return cn(base, sizes[size], variants[variant]);
}

export function Button({
  className,
  variant,
  size,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(styles({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: CommonProps &
  Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(styles({ variant, size }), className)}
      {...props}
    />
  );
}

