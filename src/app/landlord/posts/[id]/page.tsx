import PostDetailPage from '../_components/PostDetailPage';
interface Props {
    params: Promise<{ id: string }>;
}
export default async function UpdatePostPage({ params }: Props) {
    const { id } = await params;
    return <PostDetailPage postId={id} />;
}
