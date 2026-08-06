'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { FiBold, FiCode, FiItalic, FiLink, FiList, FiMinus } from 'react-icons/fi';
import { MdFormatListNumbered, MdFormatQuote, MdTitle } from 'react-icons/md';
import TextArea from '@/shared/components/textarea/textarea';

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

interface Tool {
    label: string;
    icon: ReactNode;
    prefix: string;
    suffix?: string;
    placeholder?: string;
    linePrefix?: boolean;
}

const tools: Tool[] = [
    { label: 'Tiêu đề', icon: <MdTitle />, prefix: '## ', placeholder: 'Tiêu đề', linePrefix: true },
    { label: 'In đậm', icon: <FiBold />, prefix: '**', suffix: '**', placeholder: 'văn bản in đậm' },
    { label: 'In nghiêng', icon: <FiItalic />, prefix: '_', suffix: '_', placeholder: 'văn bản in nghiêng' },
    { label: 'Danh sách', icon: <FiList />, prefix: '- ', placeholder: 'mục danh sách', linePrefix: true },
    {
        label: 'Danh sách số',
        icon: <MdFormatListNumbered />,
        prefix: '1. ',
        placeholder: 'mục danh sách',
        linePrefix: true,
    },
    { label: 'Trích dẫn', icon: <MdFormatQuote />, prefix: '> ', placeholder: 'nội dung trích dẫn', linePrefix: true },
    { label: 'Liên kết', icon: <FiLink />, prefix: '[', suffix: '](https://)', placeholder: 'tên liên kết' },
    { label: 'Code', icon: <FiCode />, prefix: '`', suffix: '`', placeholder: 'code' },
    {
        label: 'Khối code',
        icon: <span className="font-mono text-xs">{'</>'}</span>,
        prefix: '```\n',
        suffix: '\n```',
        placeholder: 'code',
    },
    { label: 'Đường phân cách', icon: <FiMinus />, prefix: '\n---\n', placeholder: '' },
];

export default function MarkdownEditor({ value, onChange, error }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const applyTool = (tool: Tool) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = value.slice(start, end);
        const content = selected || tool.placeholder || '';
        const formatted =
            tool.linePrefix && selected
                ? selected
                      .split('\n')
                      .map((line) => `${tool.prefix}${line}`)
                      .join('\n')
                : `${tool.prefix}${content}${tool.suffix ?? ''}`;
        const nextValue = `${value.slice(0, start)}${formatted}${value.slice(end)}`;
        onChange(nextValue);

        requestAnimationFrame(() => {
            textarea.focus();
            const selectionStart = start + tool.prefix.length;
            textarea.setSelectionRange(selectionStart, selectionStart + content.length);
        });
    };

    return (
        <div className="space-y-2 lg:col-span-2">
            <span className="text-sm font-medium text-slate-700">Nội dung Markdown</span>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
                    {tools.map((tool) => (
                        <button
                            key={tool.label}
                            type="button"
                            title={tool.label}
                            aria-label={tool.label}
                            onClick={() => applyTool(tool)}
                            className="flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md px-2 text-slate-600 transition hover:bg-white hover:text-blue-600 hover:shadow-sm"
                        >
                            {tool.icon}
                        </button>
                    ))}
                </div>
                <TextArea
                    ref={textareaRef}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    error={error}
                    textareaClassName="min-h-96 font-mono text-sm"
                    className="rounded-none border-0 shadow-none focus-within:ring-0"
                    placeholder="Nhập nội dung Markdown..."
                />
            </div>
            <p className="text-xs text-slate-500">Chọn văn bản rồi dùng thanh công cụ để định dạng nhanh.</p>
        </div>
    );
}
