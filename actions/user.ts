/* this server action will only change the bio data since it is not a part of clerk webhook*/

'use server'

import {User} from ".prisma/client";
import {getSelf} from "@/lib/auth-service";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

export const updateUser = async (values: Partial<User>) => {
      const self = await getSelf()


      // bio does not exist on clerk so we can update it directly
      const validData = {
          bio: values.bio
      }

      const user = await db.user.update({
            where: {
                id: self.id
            },
            data: {...validData}
        })

      // the user of the stream will be able to update through both of the routes
      revalidatePath(`/${self.username}`)
      revalidatePath(`/u/${self.username}`)

      return user
}