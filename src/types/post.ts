export enum PostContentType {
    PlainText = 'plain_text',
    Markdown = 'markdown',
}

export enum PostStatus {
    Draft = 'draft',
    PendingReview = 'pending_review',
    Published = 'published',
    Hidden = 'hidden',
    Expired = 'expired',
}

export interface Post {
    id: string;
    propertyId: string;
    authorId: string;
    title: string;
    contentType: PostContentType;
    content: string;
    status: PostStatus;
    publishedAt: string | null;
    expiresAt: string | null;
    propertyTitle: string;
    propertyPrice: number;
    propertyArea: number;
    propertyAddress: string;
    thumbnailUrl: string;
    createdAt: string;
}

export interface PostSocial {
    liked: boolean;
    likeCount: number;
}

export interface PostComment {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    parentCommentId: string | null;
    content: string;
    createdAt: string;
    children: PostComment[];
}

export interface PostPayload {
    property_id: string;
    title: string;
    content_type: PostContentType;
    content: string;
    status: PostStatus;
}
