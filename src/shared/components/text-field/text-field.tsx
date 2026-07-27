import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

type TextAlign = 'left' | 'center' | 'right';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    align?: TextAlign;
    containerClassName?: string;
    inputClassName?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
    {
        label,
        hint,
        error,
        leftIcon,
        rightIcon,
        align = 'left',
        containerClassName,
        inputClassName,
        id,
        className,
        ...props
    },
    ref,
) {
    const inputId = id ?? props.name;

    return (
        <label className={clsx('block space-y-2', containerClassName)}>
            {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}

            <div
                className={clsx(
                    'flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-sm transition',
                    error && 'border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-100',
                    className,
                )}
            >
                {leftIcon ? <span className="shrink-0 text-slate-400">{leftIcon}</span> : null}

                <input
                    ref={ref}
                    id={inputId}
                    className={clsx(
                        'w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400',
                        align === 'center' && 'text-center',
                        align === 'right' && 'text-right',
                        inputClassName,
                    )}
                    {...props}
                />

                {rightIcon ? <span className="shrink-0 text-slate-400">{rightIcon}</span> : null}
            </div>

            {error ? (
                <p className="text-sm text-rose-500">{error}</p>
            ) : hint ? (
                <p className="text-sm text-slate-500">{hint}</p>
            ) : null}
        </label>
    );
});

export default TextField;
