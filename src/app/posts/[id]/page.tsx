'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiCornerUpLeft, FiHeart, FiMessageCircle, FiThumbsUp } from 'react-icons/fi';

import { postApi } from '@/api/post.api';
import Button from '@/shared/components/buttons/button';
import Pagination from '@/shared/components/pagination/pagination';
import PostContentPreview from '@/shared/components/post-content-preview/post-content-preview';
import RentalRequestDialog from '@/shared/components/rental-request/rental-request-dialog';
import TextArea from '@/shared/components/textarea/textarea';
import TenantLayout from '@/shared/layouts/tenant-layout';
import { usePostFavoriteStore } from '@/stores/post-favorite.store';
import { Post, PostComment, PostSocial } from '@/types/post';

const COMMENT_LIMIT = 10;

function flattenCommentTree(comments: PostComment[], depth = 0): Array<{ comment: PostComment; depth: number }> {
    return comments.flatMap((comment) => [
        { comment, depth },
        ...flattenCommentTree(comment.children ?? [], depth + 1),
    ]);
}

export default function PostDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [social, setSocial] = useState<PostSocial>({ liked: false, likeCount: 0 });
    const [comments, setComments] = useState<PostComment[]>([]);
    const [commentTotal, setCommentTotal] = useState(0);
    const [commentPage, setCommentPage] = useState(1);
    const [content, setContent] = useState('');
    const [replyingTo, setReplyingTo] = useState<PostComment | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [renting, setRenting] = useState(false);
    const [loading, setLoading] = useState(true);
    const favoriteIds = usePostFavoriteStore((state) => state.ids);
    const loadFavorites = usePostFavoriteStore((state) => state.load);
    const toggleFavorite = usePostFavoriteStore((state) => state.toggle);

    const loadComments = useCallback(async (page: number) => {
        const result = await postApi.getComments(id, page, COMMENT_LIMIT);
        setComments(result.items);
        setCommentTotal(result.total);
    }, [id]);

    useEffect(() => { void loadFavorites(); }, [loadFavorites]);
    useEffect(() => {
        let active = true;
        Promise.all([postApi.getById(id), postApi.getSocial(id), postApi.getComments(id, 1, COMMENT_LIMIT)])
            .then(([postData, socialData, commentData]) => {
                if (active) { setPost(postData); setSocial(socialData); setComments(commentData.items); setCommentTotal(commentData.total); }
            })
            .catch((error) => toast.error((error as Error).message))
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [id]);

    const toggleLike = async () => {
        try {
            if (social.liked) await postApi.unlike(id); else await postApi.like(id);
            setSocial((current) => ({ liked: !current.liked, likeCount: Math.max(0, current.likeCount + (current.liked ? -1 : 1)) }));
        } catch (error) { toast.error((error as Error).message); }
    };

    const submitComment = async (event: FormEvent) => {
        event.preventDefault();
        const value = content.trim();
        if (!value) return;
        setSubmitting(true);
        try {
            await postApi.comment(id, value);
            setContent(''); setCommentPage(1); await loadComments(1);
            toast.success('Đã đăng bình luận.');
        } catch (error) { toast.error((error as Error).message); }
        finally { setSubmitting(false); }
    };

    const submitReply = async (event: FormEvent) => {
        event.preventDefault();
        const value = replyContent.trim();
        if (!value || !replyingTo) return;
        setSubmitting(true);
        try {
            await postApi.comment(id, value, replyingTo.id);
            setReplyContent('');
            setReplyingTo(null);
            setCommentPage(1);
            await loadComments(1);
            toast.success('Đã trả lời bình luận.');
        } catch (error) { toast.error((error as Error).message); }
        finally { setSubmitting(false); }
    };

    const changePage = (page: number) => {
        setCommentPage(page);
        void loadComments(page).catch((error) => toast.error((error as Error).message));
    };

    if (loading) return <TenantLayout><div className="mx-auto h-96 max-w-4xl animate-pulse rounded-2xl bg-white" /></TenantLayout>;
    if (!post) return <TenantLayout><div className="py-20 text-center text-slate-500">Không tìm thấy bài đăng.</div></TenantLayout>;
    const favorite = favoriteIds.includes(id);
    const commentTree = flattenCommentTree(comments);

    return (
        <TenantLayout>
            <div className="grid w-full items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)] xl:grid-cols-[minmax(0,7fr)_minmax(380px,3fr)]">
                <article className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    {post.thumbnailUrl && <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-slate-100"><Image src={post.thumbnailUrl} alt={post.title} fill unoptimized className="object-cover" /></div>}
                    <div>
                        <Link href={`/properties/${post.propertyId}`} className="text-sm font-semibold text-blue-700 hover:underline">{post.propertyTitle}</Link>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{post.title}</h1>
                        <p className="mt-2 text-sm text-slate-500">{post.propertyAddress}</p>
                    </div>
                    <PostContentPreview content={post.content} contentType={post.contentType} />
                </article>

                <aside className="space-y-5 lg:sticky lg:top-24">
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-base font-semibold text-slate-900">Tương tác bài đăng</h2>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <Button fullWidth variant={social.liked ? 'blue' : 'secondary'} icon={<FiThumbsUp />} onClick={() => void toggleLike()}>{social.likeCount} Thích</Button>
                            <Button fullWidth variant={favorite ? 'danger' : 'secondary'} icon={<FiHeart className={favorite ? 'fill-current' : ''} />} onClick={() => void toggleFavorite(id).catch((error) => toast.error((error as Error).message))}>{favorite ? 'Đã lưu' : 'Yêu thích'}</Button>
                            <Button className="col-span-2" fullWidth variant="blue" onClick={() => setRenting(true)}>Thuê ngay</Button>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><FiMessageCircle /> Bình luận ({commentTotal})</h2>
                        <form onSubmit={submitComment} className="mt-4 space-y-3">
                            <TextArea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Chia sẻ câu hỏi hoặc ý kiến của bạn..." maxLength={2000} required />
                            <Button fullWidth type="submit" variant="blue" disabled={submitting || !content.trim()}>{submitting ? 'Đang đăng...' : 'Đăng bình luận'}</Button>
                        </form>
                        <div className="mt-5 max-h-[52vh] divide-y divide-slate-100 overflow-y-auto pr-1">
                            {commentTree.map(({ comment, depth }) => (
                                <div
                                    key={comment.id}
                                    className={`py-4 ${depth > 0 ? 'border-l-2 border-slate-100 pl-3' : ''}`}
                                    style={depth > 0 ? { marginLeft: Math.min(depth, 2) * 20 } : undefined}
                                >
                                    <div className="flex gap-3">
                                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200">{comment.userAvatarUrl && <Image src={comment.userAvatarUrl} alt={comment.userName} fill unoptimized className="object-cover" />}</div>
                                    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline gap-2"><strong className="text-sm text-slate-900">{comment.userName || 'Người thuê'}</strong><time className="text-xs text-slate-400">{new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(comment.createdAt))}</time></div><p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">{comment.content}</p><button type="button" onClick={() => { setReplyingTo(comment); setReplyContent(''); }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"><FiCornerUpLeft /> Trả lời</button></div>
                                    </div>
                                    {replyingTo?.id === comment.id && (
                                        <form onSubmit={submitReply} className="mt-3 space-y-2 pl-12">
                                            <p className="text-xs text-slate-500">Trả lời <strong>{comment.userName || 'Người thuê'}</strong></p>
                                            <TextArea value={replyContent} onChange={(event) => setReplyContent(event.target.value)} placeholder="Nhập nội dung trả lời..." maxLength={2000} required textareaClassName="min-h-16" />
                                            <div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => { setReplyingTo(null); setReplyContent(''); }}>Hủy</Button><Button size="sm" type="submit" variant="blue" disabled={submitting || !replyContent.trim()}>{submitting ? 'Đang gửi...' : 'Trả lời'}</Button></div>
                                        </form>
                                    )}
                                </div>
                            ))}
                            {!commentTree.length && <p className="py-8 text-center text-sm text-slate-500">Chưa có bình luận. Hãy là người đầu tiên trao đổi.</p>}
                        </div>
                        {commentTotal > COMMENT_LIMIT && <Pagination totalRecords={commentTotal} pageSize={COMMENT_LIMIT} currentPage={commentPage} onPageChange={changePage} />}
                    </section>
                </aside>
                <RentalRequestDialog open={renting} propertyId={post.propertyId} propertyTitle={post.propertyTitle} onClose={() => setRenting(false)} />
            </div>
        </TenantLayout>
    );
}
