'use client'

import {ReceivedChatMessage} from "@livekit/components-core";
import {ChatMessage} from "@/components/stream-player/chat-message";

interface ChatListProps {
    messages: ReceivedChatMessage[]
    isHidden: boolean
}

export const ChatList = ({
    messages,
    isHidden
}: ChatListProps) => {
    if (isHidden || !messages || messages.length === 0){
        return (
            <div className='flex flex-1 items-center justify-center'>
                <p className='text-sm text-muted-foreground'>
                    {isHidden ? 'Chat is disabled' : 'Welcome to the chat!'}
                </p>
            </div>
        )
    }

  return(
      <div className='flex flex-1 flex-col-reverse overflow-y-auto p-3'>
          {messages.map((message) => (
              <ChatMessage
                key={message.timestamp}
                data={message}
              />
          ))}
      </div>
  )
}