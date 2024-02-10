/* following service file to check and see if */

import { db } from "@/lib/db";
import {getSelf} from "@/lib/auth-service";
import exp from "node:constants";

// get the followers of the current user that will display on the sidebar
export const getFollowedUsers = async () => {
    try {
        const self = await getSelf()

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id
            },
            include: {
                following: true
            }
        })

        return followedUsers
    } catch {
        return []
    }
}

export const isFollowingUser = async (id: string) => {
    // try is necessary so that even logged in users can see the profile of other users
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

export const followUser = async (id: string) => {
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
        throw new Error("You cannot follow yourself")
    }

    // check if the current user is already following the other user
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    // if the follow exists, return true, else create a new follow
    if (existingFollow) {
        throw new  Error("You are already following this user")
    }

    // create a new follow
    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true
        }
    })

    return follow
}

export const unfollowUser = async (id: string) => {
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
        throw new Error("You cannot unfollow yourself")
    }

    // check if the current user is already following the other user
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    // if the follow exists, return true, else create a new follow
    if (!existingFollow) {
        throw new  Error("You are not following this user")
    }

    // delete the follow
    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true,
        }
    })

    return follow
}