'use client'

import {Stream, User} from "@prisma/client";
import {useViewerToken} from "@/hooks /use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import {Video} from "@/components/stream-player/video";

interface StreamPlayerProps {
    user: User & {stream: Stream | null}
    stream: Stream
    isFollowing: boolean
}

export const Index = ({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) => {
const {token, name, identity} = useViewerToken(user.id)

    console.log({token, name, identity})

    if (!token || !name) {
        return <div>Cannot watch the stream ...</div>
    }

    return (
        <>
           <LiveKitRoom
               serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
               token={token}
               className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'
           >
               <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10'>
                   <Video
                    hostName={user.username}
                    hostIdentity={user.id}
                   />
               </div>
               <div>
                   another grid
               </div>
           </LiveKitRoom>
        </>
    )
}