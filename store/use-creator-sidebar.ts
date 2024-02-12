import { create } from "zustand";
import exp from "node:constants";

interface CreatorSidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}))
