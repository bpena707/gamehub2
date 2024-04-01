'use client'

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {ElementRef, useRef, useState, useTransition} from "react";
import {Textarea} from "@/components/ui/textarea";
import {updateUser} from "@/actions/user";
import {toast} from "sonner";

interface BioModalProps {
    initialValue: string | null
}

export const BioModal = ({
    initialValue
}: BioModalProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null)
    const [value, setValue] = useState(initialValue || "")
    const [isPending, startTransition] = useTransition()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    toast.success('Bio updated')
                    closeRef.current?.click()
            })
                .catch(() => toast.error('Failed to update bio'))
        })
    }

  return(
      <Dialog>
          <DialogTrigger>
              <Button variant='link' size='sm' className='ml-auto'>
                  Edit
              </Button>
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Edit user bio</DialogTitle>
              </DialogHeader>
              <form
                  className='space-y-4'
                  onSubmit={onSubmit}
              >
                  <Textarea
                    placeholder='Write a bio'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    disabled={isPending}
                    className='resize-none'
                  />

              <div className='flex justify-between'>
                  <DialogClose
                      asChild
                      ref={closeRef}
                  >
                        <Button type='button' variant='ghost'>
                            Cancel
                        </Button>
                  </DialogClose>
                  <Button disabled={isPending} type='submit' variant='primary'>
                        Save
                  </Button>
              </div>
              </form>
          </DialogContent>
      </Dialog>

  )
}