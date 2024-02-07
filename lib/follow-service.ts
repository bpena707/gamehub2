/* following service file to check and see if */

import { db } from "@/lib/db";
import {getSelf} from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf()

        // get the other user from the database by id to check if they exist
        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        // if the other user is the same as the current user which is ourself, return true, we are always follower of ourself
        if (otherUser.id === self.id) {
            return true
        }

        // check if the current user is following the other user
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        // if the follow exists, return true, else return false
        return !!existingFollow
    } catch {
        return false
    }
}