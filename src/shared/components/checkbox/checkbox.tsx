import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    checkBoxSize?: 'sm' | 'md';
    isDisable?: boolean;
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { title, checkBoxSize = 'md', className, isDisable = false, ...props },
    ref,
) {
    const checkbox = (
        <input
            ref={ref}
            type="checkbox"
            disabled={isDisable}
            className={clsx(
                'cursor-pointer rounded border-gray-300 text-slate-900 transition outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
        <label className={clsx('inline-flex items-center gap-2', isDisable ? 'cursor-not-allowed' : 'cursor-pointer')}>
            <span className="text-xs">{title}</span>
            {checkbox}
        </label>
    );
});

export default Checkbox;
