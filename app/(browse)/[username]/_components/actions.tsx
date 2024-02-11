'use client'

import {Button} from "@/components/ui/button";
import {onFollow, onUnfollow} from "@/actions/follow";
import {useTransition} from "react";
import {toast} from "sonner";
import {onBlock} from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}!`))
                .catch(() => toast.error('Failed to follow'))
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You are now unfollowing ${data.following.username}!`))
                .catch(() => toast.error('Failed to follow'))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You have blocked ${data.blocked.username}!`))
                .catch(() => toast.error('Failed to block'))
        })
    }

  return (
      <>
          <Button
              disabled={ isPending }
              onClick={onClick}
              variant='primary'
          >
              {isFollowing ? 'UnFollowing' : 'Follow'}
          </Button>
          <Button
                onClick={handleBlock}
              disabled={isPending}
          >
              Block
          </Button>
      </>


  )
}