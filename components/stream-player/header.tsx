import {UserAvatar} from "@/components/user-avatar";
import {VerifiedMark} from "@/components/verified-mark";
import {useParticipants, useRemoteParticipant} from "@livekit/components-react";
import {UserIcon} from "lucide-react";

interface HeaderProps {
    hostName: string
    hostIdentity: string
    viewerIdentity: string
    imageUrl: string
    isFollowing: boolean
    name: string
}

export const Header = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    imageUrl,
    isFollowing,
    name
}: HeaderProps) => {
    const participants = useParticipants()
    const participant = useRemoteParticipant(hostIdentity)

    const isLive = !!participant
    const participantCount = participants.length - 1 // one participant is the host so we subtract 1

    // host as viewer is the viewer who is also the host
    const hostAsViewer = `host-${hostIdentity}`
    const isHost = viewerIdentity === hostIdentity

  return(
      <div className='flex flex-col-1 lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
          <div className='flex items-center gap-x-3'>
              <UserAvatar
                  imageUrl={imageUrl}
                  username={hostName}
                  size='lg'
                  isLive={true}
                  showBadge
              />
              <div className='space-y-1'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-lg font-semibold'>
                            {hostName}
                        </h2>
                        <VerifiedMark />
                    </div>
                  <p className='text-sm font-semibold'>
                      {name}
                  </p>
                  {isLive && (
                      <p className='text-sm font-semibold text-primary'>
                          <UserIcon />
                      </p>
                  )}
              </div>
          </div>
      </div>
  )
}