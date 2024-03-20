'use client'

import {Skeleton} from "@/components/ui/skeleton";
import { ChatToggle } from "@/components/stream-player/chat-toggle";


export const ChatHeader = () => {
  return (
      <div className='relative p-3 border-b'>
          <ChatToggle />
        <p className='font-semibold text-primary text-center'>
          Stream Chat
        </p>
      </div>
  )
}

export const ChatHeaderSkeleton = () => {
  return (
      <div className='relative p-3 hidden md:block'>
          <Skeleton className='absolute h-6 w-6 left-3 top-3' />
          <Skeleton className='w-28 h-6 mx-auto' />
      </div>
  )
}