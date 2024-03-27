'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ElementRef, startTransition, useRef, useState, useTransition} from "react";
import {updateStream} from "@/actions/stream";
import {toast} from "sonner";


interface InfoModalProps {
    initialName: string
    initialThumbnailUrl: string | null
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl
}: InfoModalProps) => {
    // close ref to close the dialog once the form is submitted
    const closeRef = useRef<ElementRef<"button">>(null)

    // useTransition to prevent the UI from blocking while the form is being submitted
    const [isPending, startTransition] = useTransition()

    const [name, setName] = useState(initialName)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({name:name})
                .then(() => {
                    toast.success('Stream updated')
                    closeRef?.current?.click()
                })
                .catch(() => toast.error('Error updating stream'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-14'>
                    <div className='space-y-2'>
                        <Label>
                            Name
                        </Label>
                        <Input
                            disabled={isPending}
                            placeholder='Stream Name'
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <DialogClose ref={closeRef}>
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