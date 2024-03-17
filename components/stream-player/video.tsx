'use client'
import {ConnectionState, Track} from "livekit-client"
import {useConnectionState, useRemoteParticipant, useTracks} from "@livekit/components-react"

interface VideoProps {
    hostName: string
    hostIdentity: string
}

export const Video = ({hostName, hostIdentity}: VideoProps) => {
    // displays connection status
    const connectionState = useConnectionState()
    // displays name of the participant
    const participant = useRemoteParticipant(hostIdentity)
    // uses the source track and filters to find the identity of the participant
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === hostIdentity)

    let content

    // different scenarios based on if the participant is connected or not
    if (!participant && connectionState === ConnectionState.Connected){
        content = <p>Host is offline</p>
    }else if (!participant || tracks.length === 0) {
        content = <p>Loading...</p>
    }else {
        content = <p>Live video</p>
    }


  return (
      <div className='aspect-video border-b group relative'>
          {content}
      </div>
  )
}