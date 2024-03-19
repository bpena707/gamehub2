'use client'

//participant comes from the livekit client

import {Participant, Track} from "livekit-client";
import {useEffect, useRef, useState} from "react";
import {useTracks} from "@livekit/components-react";
import {FullscreenControl} from "@/components/stream-player/fullscreen-control";
import {useEventListener} from "usehooks-ts";
import {VolumeControl} from "@/components/stream-player/volume-control";

interface LiveVideoProps {
    participant: Participant
}

export const LiveVideo = ({participant}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [volume, setVolume] = useState(0)

    // changes state based on the control of the videoRef
    const onVolumeChange = (value: number) => {
        setVolume(+value)
        if (videoRef?.current) {
            videoRef.current.muted = value === 0
            videoRef.current.volume = +value * 0.01
        }
    }

    // toggles the mute button. defines muted as the volume of 0. when toggled changes to 50
    const toggleMute = () => {
        const isMuted = volume === 0

        setVolume(isMuted ? 50 : 0)

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted
            videoRef.current.volume = isMuted ? 0.5 : 0
        }
    }

    // not enough to fire 0 on the ref since volumeChange code fires. so this this manually sets it to 0 once
    useEffect(() => {
        onVolumeChange(0)
    }, []);

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
                  <VolumeControl
                      onToggle={toggleMute}
                      onChange={onVolumeChange}
                      value={volume}
                  />
              </div>
          </div>
      </div>
  )
}