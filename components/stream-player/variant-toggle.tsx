'use client'

import {ChatVariant, useChatSidebar} from "@/store/use-chat-sidebar";
import {MessageSquare, Users} from "lucide-react";
import {Hint} from "@/components/ui/hint";
import {Button} from "@/components/ui/button";

// variant toggles between chat and community on the top right chat window
export const VariantToggle = () => {
  const {
    variant,
      onChangeVariant
  } = useChatSidebar((state) => state)

    const isChat = variant === ChatVariant.CHAT

  //   icons are changed either to user or message
  const Icon = isChat ? Users : MessageSquare

  //   checks the variant and toggles using onChange
  const onToggle = () => {
    const newVariant  = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
      onChangeVariant(newVariant)
  }

  const label = isChat ? "Community" : "Go back to chat"

  return(
      <Hint label={label} side='left' asChild>
        <Button
          onClick={onToggle}
          variant='ghost'
          className='h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent'
        >
          <Icon className='h-4 w-4' />
        </Button>
      </Hint>
  )
}