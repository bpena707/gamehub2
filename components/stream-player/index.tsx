'use client'

import {Stream, User} from "@prisma/client";
import {useViewerToken} from "@/hooks /use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import {Video} from "@/components/stream-player/video";
import {useChatSidebar} from "@/store/use-chat-sidebar";
import {cn} from "@/lib/utils"
import {Chat} from "@/components/stream-player/chat";
import {ChatToggle} from "@/components/stream-player/chat-toggle";
import {Header} from "@/components/stream-player/header";
import {InfoCard} from "@/components/stream-player/info-card";
import {AboutCard} from "@/components/stream-player/about-card";

interface StreamPlayerProps {
    user: User & {
        stream: Stream | null,
        _count: {followedBy: number}
    }
    stream: Stream
    isFollowing: boolean
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) => {
const {token, name, identity} = useViewerToken(user.id)

    // gets the whole state
    const { collapsed } = useChatSidebar((state) => state)

    console.log({token, name, identity})

    if (!token || !name) {
        return <div>Cannot watch the stream ...</div>
    }

    return (
        <>
            {collapsed && (
                <div className='hidden lg:block fixed top-[100] right-2 z-50'>
                    <ChatToggle />
                </div>
            )}
           <LiveKitRoom
               serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
               token={token}
               className={cn(
                   'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
                   collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 "

                   )}
           >
               <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10'>
                   <Video
                    hostName={user.username}
                    hostIdentity={user.id}
                   />
                   <Header
                       hostName={user.username}
                       hostIdentity={user.id}
                       viewerIdentity={identity}
                       imageUrl={user.imageUrl}
                       isFollowing={isFollowing}
                       name={stream.name}
                   />
                   <InfoCard
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    name={stream.name}
                    thumbnailUrl={stream.thumbnailUrl}
                   />
                   <AboutCard
                    hostName={user.username}
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    bio={user.bio}
                    followedByCount={user._count.followedBy}
                   />
               </div>
               <div className={cn(
                   'col-span-1',
                   collapsed && 'hidden'
               )} >
                   <Chat
                       viewerName={name}
                       hostName={user.username}
                       hostIdentity={user.id}
                       isFollowing={isFollowing}
                       isChatEnabled={stream.isChatEnabled}
                       isChatDelayed={stream.isChatDelayed}
                       isChatFollowersOnly={stream.isChatFollowersOnly}
                   />
               </div>
           </LiveKitRoom>
        </>
    )
}