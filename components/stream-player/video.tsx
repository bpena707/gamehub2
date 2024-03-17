'use client'
import {ConnectionState, Track} from "livekit-client"
import {
    useConnectionState,
    useRemoteParticipant
} from "@livekit/components-react"

interface VideoProps {
    hostName: string
    hostIdentity: string
}

export const Video = ({hostName, hostIdentity}: VideoProps) => {
  return (
      <div className='aspect-video border-b group relative'>
          Video
      </div>
  )
}