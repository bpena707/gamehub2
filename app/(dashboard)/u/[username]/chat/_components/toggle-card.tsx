'use client'

import {Switch} from "@/components/ui/switch";

import {updateStream} from "@/actions/stream";
import {toast} from "sonner";
import {useTransition} from "react";

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    label: string
    value: boolean
    field: FieldTypes
}

const ToggleCard = ({
    label,
    value = false,
    field
                    }: ToggleCardProps) => {

    // update the stream with the new value without blocking the UI
    const [isPending, startTransition] = useTransition()
    const onChange = async () => {
        startTransition(() => {
            updateStream({ [field]: false })
                .then(() => toast.success('Chat settings updated'))
                .catch(() => toast.error('Failed to update chat settings'))
        })
    }

  return (
      <div className='rounded-xl bg-muted p-6'>
          <div className='flex items-center justify-between'>
              <p className='font-semibold shrink-0'>
                  {label}
              </p>
              <div className='space-y-2'>
                  <Switch
                      disabled={isPending}
                      onCheckedChange={onChange}
                      checked={value}
                  >
                      {value ? 'On' : 'Off'}
                  </Switch>
              </div>
          </div>
      </div>
  )
}

export default ToggleCard