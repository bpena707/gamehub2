'use server'

import { v4 } from 'uuid'
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/user-service";
import {isBlockedByUser} from "@/lib/block-service";
import {identity} from "rxjs";

export const createViewerToken = async (hostIdentity: string) => {
    let self

    try {
        self = await getSelf()
    } catch {
        // if the user is not logged in, create a guest user
        const id = v4()
        const username = `guest#${Math.floor(Math.random() * 1000)}`
        self = {id, username}
    }

    const host = await getUserById(hostIdentity)

    if (!host) {
        throw new Error('Host not found')
    }

    const isBlocked = await isBlockedByUser(host.id)

    if (isBlocked) {
        throw new Error('User is blocked')
    }

    const isHost = self.id === host.id

    // if the user is the host, return the host token
    const token = new AccessToken(
       process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
    {
        identity: isHost ? `host-${self.id}` : self.id,
        name: self.username,
    }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    })

    return await Promise.resolve(token.toJwt())
}