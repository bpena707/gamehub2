//uses the current user from clerk and grabs the users id from the database to match them

import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";

// get full user in combination with database user
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

// load creator dashboard by usering current username
export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            username,
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    // if the user is not the same as the current user, throw an error to prevent unauthorized access to other users dashboard
    if (self.username !== user.username) {
        throw new Error("Unauthorized");
    }

    return user;
}
