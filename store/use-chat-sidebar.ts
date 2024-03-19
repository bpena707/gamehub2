/* this store handles the state of the chat sidebar and allows us to expand or collapse it */

import { create } from "zustand";
import exp from "node:constants";

// all the people that currently in the stream and maybe ban or some other function of interaction
export enum ChatVariant {
    CHAT = 'CHAT',
    COMMUNITY = 'COMMUNITY'
}

interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVariant
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVariant) => void
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVariant.CHAT,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
    onChangeVariant: (variant: ChatVariant) => set(() => ({ variant }))
}))
