'use server'

import {blockUser, unblockUser} from "@/lib/block-service";
import {revalidatePath} from "next/cache";
import {getSelf} from "@/lib/auth-service";
import {RoomServiceClient} from "livekit-server-sdk";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
    // room service to kick participant if not found


    const self = await getSelf()

    // dynamically get the user since the generated random username is not known
    let blockedUser
    try {
        blockedUser = await blockUser(id)
    } catch {
        //this means user is a guest and not in the database
    }

    // function grabs the self id given by roomName prop in the room and the id of the user to be blocked
    try {
        await roomService.removeParticipant(self.id, id)
    } catch {
        // this means user is not in the room
    }



    revalidatePath(`/u/${self.username}/community`)


    return blockedUser
}




export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id)

    revalidatePath('/')

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser
}