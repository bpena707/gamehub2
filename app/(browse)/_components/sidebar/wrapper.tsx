// determines if the sidebar is open or collapsed
'use client'

import {useSidebar} from "@/store/use-sidebar";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {ToggleSkeleton} from "./toggle";
import {RecommendedSkeleton} from "./recommended";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({children}: WrapperProps) => {
    const isClient = useIsClient()
    const { collapsed } = useSidebar((state) => state)


    // if the sidebar is collapsed, the width is 70px for server side rendering
    if (!isClient) return (
        <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    )

    return (
        <aside
            className={cn(
                'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
                collapsed && 'w-[70px]'
            )}
        >
            {children}
        </aside>
    )
}