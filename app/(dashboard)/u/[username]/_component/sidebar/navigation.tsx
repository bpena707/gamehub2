'use client'

import {usePathname} from "next/navigation";
import {useUser} from "@clerk/nextjs";
import {Fullscreen, KeyRound, MessageSquare, Users} from "lucide-react";

export const Navigation = () => {
    const pathname = usePathname()
    const { user } = useUser()

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users
        }
    ]

    return (
        <ul>
            {routes.map((route, index) => (
                <div key={route.href}>
                    {route.label}
                </div>
            ))}
        </ul>
    )
}