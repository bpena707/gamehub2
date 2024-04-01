import {getUserByUsername} from "@/lib/user-service";
import {notFound} from "next/navigation";
import {isFollowingUser} from "@/lib/follow-service";
import {Actions} from "@/app/(browse)/[username]/_components/actions";
import {isBlockedByUser} from "@/lib/block-service";
import {StreamPlayer} from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    }
}
const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username)

    if(!user || !user.stream){
        return notFound()
    }

    // check if the user is following the user or blocked
    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    if (isBlocked) {
        return notFound()
    }

    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
    );
}
export default UserPage;