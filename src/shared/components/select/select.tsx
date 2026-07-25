import clsx from "clsx";
import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

type TextAlign = "left" | "center" | "right";

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    hint?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    align?: TextAlign;
    options: SelectOption[];
    placeholder?: string;
    containerClassName?: string;
    selectClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
        label,
        hint,
        error,
        leftIcon,
        rightIcon,
        align = "left",
        options,
        placeholder,
        containerClassName,
        selectClassName,
        className,
        id,
        ...props
    },
    ref
) {
    const selectId = id ?? props.name;

    return (
        <label className={clsx("block space-y-2", containerClassName)}>
            {label ? (
                <span className="text-sm font-medium text-slate-700">
                    {label}
                </span>
            ) : null}

            <div
                className={clsx(
                    "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200",
                    error && "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-100",
                    className
                )}
            >
                {leftIcon ? (
                    <span className="shrink-0 text-slate-400">
                        {leftIcon}
                    </span>
                ) : null}

                <select
                    ref={ref}
                    id={selectId}
                    className={clsx(
                        "w-full appearance-none bg-transparent text-slate-900 outline-none",
                        align === "center" && "text-center",
                        align === "right" && "text-right",
                        selectClassName
                    )}
                    {...props}
                >
                    {placeholder ? (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    ) : null}

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {rightIcon ? (
                    <span className="shrink-0 text-slate-400">
                        {rightIcon}
                    </span>
                ) : null}
            </div>

            {error ? (
                <p className="text-sm text-rose-500">
                    {error}
                </p>
            ) : hint ? (
                <p className="text-sm text-slate-500">
                    {hint}
                </p>
            ) : null}
        </label>
    );
});

export default Select;