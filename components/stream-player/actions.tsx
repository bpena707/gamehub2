'use client'

import {Button} from "@/components/ui/button";
import {useAuth} from "@clerk/nextjs";
import {Heart} from "lucide-react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {onFollow, onUnfollow} from "@/actions/follow";
import {useTransition} from "react";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

interface ActionsProps {
    hostIdentity: string
    isFollowing: boolean
    isHost: boolean
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()
    const { userId } = useAuth()
    const router = useRouter()

    const handleFollow = () => {
      startTransition(() => {
          onFollow(hostIdentity)
              .then((data) => toast.success(`You are now following ${data.following.username}`))
              .catch(() => toast.error('Error following user'))
      })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You are no longer following ${data.following.username}`))
                .catch(() => toast.error('Error unfollowing user'))
        })
    }

    const toggleFollow = async () => {
        if (!userId) {
           return router.push('/sign-in')
        }

        if (isHost) return

        if (isFollowing){
            handleUnFollow()
        } else {
            handleFollow()
        }
    }

    return(
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant='primary'
            size='sm'
            className='w-full lg:w-auto'
        >
            <Heart className={cn(
                'w-4 h-4 mr-2',
                isFollowing ? 'fill-white' : 'fill-none'
            )} />
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    );
};