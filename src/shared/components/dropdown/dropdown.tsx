'use client';

import clsx from 'clsx';
import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react';

type TextAlign = 'left' | 'center' | 'right';

export interface DropdownOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface DropdownProps {
    label?: string;
    hint?: string;
    error?: string;
    options: DropdownOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    name?: string;
    leftIcon?: ReactNode;
    align?: TextAlign;
    disabled?: boolean;
    containerClassName?: string;
    className?: string;
    onChange?: (value: string) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
    {
        label,
        hint,
        error,
        options,
        value,
        defaultValue = '',
        placeholder = 'Chọn một giá trị',
        leftIcon,
        align = 'left',
        disabled = false,
        containerClassName,
        className,
        onChange,
    },
    ref,
) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((item) => item.value === selectedValue);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleSelect = (option: DropdownOption) => {
        if (option.disabled) {
            return;
        }

        setSelectedValue(option.value);
        setOpen(false);

        onChange?.(option.value);
    };

    return (
        <div
            ref={(node) => {
                wrapperRef.current = node;

                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            }}
            className={clsx('relative block', containerClassName)}
        >
            {label && <span className="text-sm font-medium text-slate-700">{label}</span>}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={clsx(
                    'flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border bg-white px-3 text-sm text-slate-900 transition-all outline-none',
                    error ? 'border-rose-400' : 'border-slate-300',
                    disabled && 'cursor-not-allowed bg-slate-100 text-slate-400',
                    className,
                )}
            >
                <div
                    className={clsx(
                        'flex items-center gap-2',
                        align === 'center' && 'mx-auto',
                        align === 'right' && 'ml-auto',
                    )}
                >
                    {leftIcon && <span className="text-slate-400">{leftIcon}</span>}

                    <span className={clsx(!selectedOption && 'text-slate-400')}>
                        {selectedOption?.label ?? placeholder}
                    </span>
                </div>

                <svg
                    className={clsx('h-5 w-5 text-slate-400 transition-transform', open && 'rotate-180')}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className={clsx(
                        'absolute z-50 flex max-h-60 w-full flex-col gap-1 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl',
                        'animate-in fade-in zoom-in-95 duration-150',
                    )}
                >
                    {options.map((option) => {
                        const active = option.value === selectedValue;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                disabled={option.disabled}
                                onClick={() => handleSelect(option)}
                                className={clsx(
                                    'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition',
                                    option.disabled && 'cursor-not-allowed opacity-40',
                                    !option.disabled && 'hover:bg-slate-100',
                                    active && 'bg-blue-50 text-blue-600',
                                )}
                            >
                                <span>{option.label}</span>

                                {active && (
                                    <svg className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.408 0l-3.5-3.5a1 1 0 011.408-1.42l2.796 2.797 6.796-6.797a1 1 0 011.408 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {error ? (
                <p className="text-xs text-rose-500">{error}</p>
            ) : hint ? (
                <p className="text-xs text-slate-500">{hint}</p>
            ) : null}
        </div>
    );
});

export default Dropdown;
