import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {getSelf} from "@/lib/auth-service";
import {db} from "@/lib/db";
import {metadata} from "@/app/layout";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
// this is the upload end point
export const ourFileRouter = {
   thumbnailUploader: f({
       image: {
           maxFileSize: "4MB",
           maxFileCount: 1,
       }
   })
       .middleware(async () => {
           const self = await getSelf();

           return { user: self };
       })
       // when the upload is complete, use the file to update stream in the database using the currently logged in user
       // the user doesnt have to confirm the upload, it will automatically update the database
       .onUploadComplete(async ({ metadata, file }) => {
           await db.stream.update({
               where: {
                   userId: metadata.user.id
               },
               data:{
                   thumbnailUrl: file.url
               }
           })
           return {fileUrl: file.url};
       })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;