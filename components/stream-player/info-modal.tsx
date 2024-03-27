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
import {useState} from "react";


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
                <form className='space-y-14'>
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