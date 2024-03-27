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
import {startTransition, useState} from "react";
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

    const [name, setName] = useState(initialName)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({name:name})
                .then(() => toast.success('Stream updated'))
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
                            placeholder='Stream Name'
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <DialogClose>
                            <Button type='button' variant='ghost'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={false} type='submit' variant='primary'>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>

    )
}