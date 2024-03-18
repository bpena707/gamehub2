'use client'

//participant comes from the livekit client

import {Participant, Track} from "livekit-client";
import {useRef, useState} from "react";
import {useTracks} from "@livekit/components-react";
import {FullscreenControl} from "@/components/stream-player/fullscreen-control";
import {useEventListener} from "usehooks-ts";

interface LiveVideoProps {
    participant: Participant
}

export const LiveVideo = ({participant}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // toggle function that handles the wrapper
    const toggleFullscreen = () => {
        if (isFullscreen){
            document.exitFullscreen()
        }else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen()
        }

    }

    //this function handles the state
    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null
        setIsFullscreen(isCurrentlyFullscreen)
    }

    useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current)
            }
        })

  return(
      <div ref={wrapperRef} className='relative h-full flex'>
          <video ref={videoRef} width='100%' />
          <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
              <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
                  <FullscreenControl
                      isFullscreen={isFullscreen}
                      onToggle={toggleFullscreen}
                  />
              </div>
          </div>
      </div>
  )
}