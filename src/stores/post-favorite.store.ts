import { create } from 'zustand';
import { postFavoriteApi } from '@/api/post-favorite.api';

interface State {
    ids: string[];
    initialized: boolean;
    load: () => Promise<void>;
    toggle: (postId: string) => Promise<void>;
    reset: () => void;
}
export const usePostFavoriteStore = create<State>((set, get) => ({
    ids: [],
    initialized: false,
    load: async () => {
        if (get().initialized) return;
        set({ ids: await postFavoriteApi.getIds(), initialized: true });
    },
    toggle: async (postId) => {
        const ids = get().ids;
        const active = ids.includes(postId);
        if (active) await postFavoriteApi.remove(postId);
        else await postFavoriteApi.add(postId);
        set({ ids: active ? ids.filter((id) => id !== postId) : [...ids, postId] });
    },
    reset: () => set({ ids: [], initialized: false }),
}));
