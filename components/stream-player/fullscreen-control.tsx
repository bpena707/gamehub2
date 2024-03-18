import {Maximize, Minimize} from "lucide-react";
import {Hint} from "@/components/ui/hint";

interface FullscreenControlProps {
    isFullscreen: boolean
    onToggle: () => void
}

export const FullscreenControl = ({
    isFullscreen,
    onToggle
}: FullscreenControlProps) => {
    const Icon = isFullscreen ? Minimize : Maximize

    const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"

    return(
        <div>
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className='text-white p-1.5 hover:bg-white/10 rounded-lg'>
                    <Icon className='h-5 w-5'/>
                </button>
            </Hint>
        </div>
    )
}

