'use server'

import {followUser} from "@/lib/follow-service";

import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id)

        revalidatePath('/') // revalidate the home page
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`) // revalidate the profile page of the user we followed

        }

        return followedUser
    } catch (e) {
        throw new Error('Internal error')
    }
}