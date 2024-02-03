//uses the current user from clerk and grabs the users id from the database to match them

import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";


export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}
