import { db } from "@/lib/db";

import {getSelf} from "@/lib/auth-service";

export const getRecommended = async () => {
    let userId

    try {
        const self = await getSelf()
        userId = self.id
    } catch (error) {
        userId = null
    }

    let users = []

    if(userId) {
        // get all users except the current user
        users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

    } else {
        // get all users
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }
        return users;
}
