'use client'

import {useMediaQuery} from "usehooks-ts";
import {ChatVariant, useChatSidebar} from "@/store/use-chat-sidebar";
import {useChat, useConnectionState, useRemoteParticipant} from "@livekit/components-react";
import {ConnectionState} from "livekit-client";
import {useEffect, useMemo, useState} from "react";
import {ChatHeader} from "@/components/stream-player/chat-header";
import {ChatForm} from "@/components/stream-player/chat-form";

interface ChatProps {
    hostName: string
    hostIdentity: string
    viewerName: string
    isFollowing: boolean
    isChatEnabled: boolean
    isChatDelayed: boolean
    isChatFollowersOnly: boolean
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}: ChatProps) => {
    const matches = useMediaQuery('(max-width)')

    const {onExpand, variant} = useChatSidebar((state) => state)
    // connection state and participant is from livekit and checks connection for chat and the identity of the participant
    const connectionState = useConnectionState()
    const participant = useRemoteParticipant(hostIdentity)

    // is online if the participant and the connection are on
    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden = !isChatEnabled || !isOnline

    // chatMessages are remapped to messages
    const [value, setValue] = useState("")
    const {chatMessages: messages, send} = useChat()

    // reset collapse state based on match queries
    useEffect(() => {
        if (matches) onExpand()

    }, [matches, onExpand]);

  //reverse messages in order to render them newest messages are shown at the bottom
    const reversedMessages = useMemo(() => {
        return messages.sort((a,b) => b.timestamp - a.timestamp)
    }, [messages]);

    const onSubmit = () => {
        if (!send) return

        send(value)
        setValue("")
    }

    const onChange = (value: string) => {
        setValue(value)
    }

  return(
      <div className='flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]'>
          <ChatHeader/>
          {variant === ChatVariant.CHAT && (
              <>
                  <ChatForm
                    onSubmit={onSubmit}
                    value={value}
                    onChange={onChange}
                    isHidden={isHidden}
                    isFollowersOnly={isChatFollowersOnly}
                    isDelayed={isChatDelayed}
                    isFollowing={isFollowing}

                  />
              </>
          )}
          {variant === ChatVariant.COMMUNITY && (
              <>
                  <p>Community</p>
              </>
          )}
      </div>
  )
}