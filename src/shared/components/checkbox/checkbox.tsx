import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    checkBoxSize?: 'sm' | 'md';
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { title, checkBoxSize = 'md', className, ...props },
    ref,
) {
    const checkbox = (
        <input
            ref={ref}
            type="checkbox"
            className={clsx(
                'rounded border-slate-300 text-slate-900 shadow-sm transition outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                sizeClasses[checkBoxSize],
                className,
            )}
            {...props}
        />
    );

    if (!title) {
        return checkbox;
    }

    return (
        <label className="inline-flex cursor-pointer items-center gap-2">
            <span className="text-xs">{title}</span>
            {checkbox}
        </label>
    );
});

export default Checkbox;
