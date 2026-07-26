import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'blue';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right';
type ContentAlign = 'left' | 'center' | 'right';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: IconPosition;
    contentAlign?: ContentAlign;
    fullWidth?: boolean;
    minWidth?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-8 min-w-20 px-4 text-sm',
    md: 'h-10 min-w-24 px-5 text-sm',
    lg: 'h-12 min-w-28 px-6 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 focus-visible:ring-slate-400',
    secondary: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-slate-300',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300',
    blue: 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 focus-visible:ring-blue-400',
};

const alignClasses: Record<ContentAlign, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        children,
        className,
        variant = 'primary',
        size = 'md',
        icon,
        iconPosition = 'left',
        contentAlign = 'center',
        fullWidth,
        minWidth,
        disabled,
        type = 'button',
        ...props
    },
    ref,
) {
    const iconOnly = !children && !!icon;

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled}
            className={clsx(
                'inline-flex cursor-pointer items-center gap-2 rounded-xl font-medium transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-60',
                sizeClasses[size],
                variantClasses[variant],
                alignClasses[contentAlign],
                fullWidth && 'w-full',
                minWidth,
                iconOnly && 'px-4',
                iconPosition === 'right' && 'flex-row-reverse',
                className,
            )}
            {...props}
        >
            {icon && <span className="flex shrink-0 items-center justify-center">{icon}</span>}
            {children && <span className="leading-none">{children}</span>}
        </button>
    );
});

export default Button;
