import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PostContentType } from '@/types/post';

interface Props {
    content: string;
    contentType: PostContentType;
}

const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="mt-6 mb-4 text-3xl font-bold text-slate-900">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-5 mb-3 text-2xl font-semibold text-slate-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-4 mb-2 text-xl font-semibold text-slate-900">{children}</h3>,
    p: ({ children }) => <p className="my-3 leading-7 text-slate-700">{children}</p>,
    ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-6 text-slate-700">{children}</ul>,
    ol: ({ children }) => <ol className="my-3 list-decimal space-y-1 pl-6 text-slate-700">{children}</ol>,
    blockquote: ({ children }) => (
        <blockquote className="my-4 border-l-4 border-blue-400 bg-blue-50 px-4 py-2 text-slate-700 italic">
            {children}
        </blockquote>
    ),
    a: ({ children, href }) => (
        <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-700">
            {children}
        </a>
    ),
    code: ({ children, className }) =>
        className ? (
            <code className={`${className} block overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100`}>
                {children}
            </code>
        ) : (
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-rose-600">{children}</code>
        ),
    hr: () => <hr className="my-6 border-slate-200" />,
    table: ({ children }) => (
        <div className="my-4 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">{children}</table>
        </div>
    ),
    th: ({ children }) => <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left">{children}</th>,
    td: ({ children }) => <td className="border border-slate-300 px-3 py-2">{children}</td>,
};

export default function PostContentPreview({ content, contentType }: Props) {
    if (!content.trim()) {
        return <p className="text-sm text-slate-400">Nội dung xem trước sẽ hiển thị tại đây.</p>;
    }

    if (contentType === PostContentType.PlainText) {
        return <div className="leading-7 break-words whitespace-pre-wrap text-slate-700">{content}</div>;
    }

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
        </ReactMarkdown>
    );
}
