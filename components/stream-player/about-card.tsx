'use client'

import {VerifiedMark} from "@/components/verified-mark";
import {BioModal} from "@/components/stream-player/bio-modal";

interface AboutCardProps {
    hostName: string
    hostIdentity: string
    viewerIdentity: string
    bio: string | null
    followedByCount: number
}

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount
}: AboutCardProps) => {
    // check to see if we are the host or not
    const hostAsViewer = `host-${hostIdentity}`
    const isHost = viewerIdentity === hostAsViewer
    
    const followedByLabel = followedByCount === 1 ? 'follower' : 'followers'



  return(
    <div className='px-4'>
      <div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
          <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
                  About {hostName}
                  <VerifiedMark />
              </div>
              {!isHost && (
                  <BioModal
                    initialValue={bio}
                  />
              )}
          </div>
          <div className='text-sm text-muted-foreground '>
              <span className='font-semibold text-primary'>{followedByCount}</span> {followedByLabel}
          </div>
          <p>
              {bio || "No bio available"}
          </p>
      </div>
    </div>
  )
}