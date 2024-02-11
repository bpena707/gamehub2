import {getUserByUsername} from "@/lib/user-service";
import {notFound} from "next/navigation";
import {isFollowingUser} from "@/lib/follow-service";
import {Actions} from "@/app/(browse)/[username]/_components/actions";
import {isBlockedByUser} from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
}
const UserPage = async ({ params }: UserPageProps) => {
    const user = await getUserByUsername(params.username)

    if (!user) {
        return notFound()
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)


    return (
        <div>
        <p>User: {user.username}</p>
            <p>{user.id}</p>
            <p>is following: {`${isFollowing}`}</p>
            <p>is blocked by: {`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    );
}
export default UserPage;