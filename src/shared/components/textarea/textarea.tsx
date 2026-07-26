import clsx from 'clsx';
import { forwardRef, type TextareaHTMLAttributes, type ReactNode } from 'react';

type TextAlign = 'left' | 'center' | 'right';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    hint?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    align?: TextAlign;
    containerClassName?: string;
    textareaClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    {
        label,
        hint,
        error,
        leftIcon,
        rightIcon,
        align = 'left',
        containerClassName,
        textareaClassName,
        className,
        id,
        ...props
    },
    ref,
) {
    const textareaId = id ?? props.name;

    return (
        <label className={clsx('block space-y-2', containerClassName)}>
            {label ? <span className="text-sm font-medium text-slate-700">{label}</span> : null}

            <div
                className={clsx(
                    `flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200`,

                    error && `border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-100`,

                    className,
                )}
            >
                {leftIcon ? <span className="shrink-0 pt-1 text-slate-400">{leftIcon}</span> : null}

                <textarea
                    ref={ref}
                    id={textareaId}

                    className={clsx(
                        `min-h-24 w-full resize-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400`,

                        align === 'center' && 'text-center',

                        align === 'right' && 'text-right',

                        textareaClassName,
                    )}

                    {...props}
                />

                {rightIcon ? <span className="shrink-0 pt-1 text-slate-400">{rightIcon}</span> : null}
            </div>

            {error ? (
                <p className="text-sm text-rose-500">{error}</p>
            ) : hint ? (
                <p className="text-sm text-slate-500">{hint}</p>
            ) : null}
        </label>
    );
});

export default TextArea;
