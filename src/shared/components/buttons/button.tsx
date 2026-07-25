import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";
type ContentAlign = "left" | "center" | "right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: IconPosition;
    contentAlign?: ContentAlign;
    fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-5 text-sm",
    lg: "h-14 px-6 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 focus-visible:ring-slate-400",
    secondary:
        "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-slate-300",
    ghost:
        "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300",
};

const alignClasses: Record<ContentAlign, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        children,
        className,
        variant = "primary",
        size = "md",
        icon,
        iconPosition = "left",
        contentAlign = "center",
        fullWidth,
        disabled,
        type = "button",
        ...props
    },
    ref
) {
    const iconOnly = !children && !!icon;

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled}
            className={clsx(
                "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
                sizeClasses[size],
                variantClasses[variant],
                fullWidth && "w-full",
                iconOnly && "px-4",
                iconPosition === "right" && "flex-row-reverse",
                alignClasses[contentAlign],
                className
            )}
            {...props}
        >
            {icon}
            {children}
        </button>
    );
});

export default Button;