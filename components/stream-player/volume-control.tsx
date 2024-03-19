/*this component has all of the component elements inside along with the icons to control the volume */

'use client'

import { Hint } from "@/components/ui/hint";
import {Volume1, Volume2, VolumeX} from "lucide-react";
import {Slider} from "@/components/ui/slider";

interface VolumeControlProps {
    onToggle: () => void
    onChange: (value: number) => void
    value: number
}


export const VolumeControl = ({
    onToggle,
    onChange,
    value
}: VolumeControlProps) => {
    const isMuted = value === 0
    const isAboveHalf = value > 50

    let Icon = Volume1

    // check at what level volume is and adjust icon based on level
    if (isMuted) {
        Icon = VolumeX
    } else if (isAboveHalf){
        Icon = Volume2
    }

    const label = isMuted ? "Unmute" : "Mute"

    // array of numbers is needed for the slider component
    const handleChange = (value: number []) => {
        onChange(value[0])
    }

    return(
        <div className='flex items-center gap-2'>
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className='text-white hover:bg-white/10 p-1.5 rounded-lg'
                >
                    <Icon className='h-6 w-6' />
                </button>
            </Hint>
            <Slider
                className='w-[8rem] cursor-pointer'
                onValueChange={handleChange}
                value={[value]}
                max={100}
                step={1}
            />
        </div>
    )
}