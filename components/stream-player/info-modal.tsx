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
import {UploadDropzone} from '@/lib/uploadthing'
import {useRouter} from "next/navigation";
import {Hint} from "@/components/ui/hint";
import {Trash, TrashIcon} from "lucide-react";
import Image from "next/image";


interface InfoModalProps {
    initialName: string
    initialThumbnailUrl: string | null
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl
}: InfoModalProps) => {
    const router = useRouter()
    // close ref to close the dialog once the form is submitted
    const closeRef = useRef<ElementRef<"button">>(null)

    // useTransition to prevent the UI from blocking while the form is being submitted
    const [isPending, startTransition] = useTransition()

    const [name, setName] = useState(initialName)
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

    const onRemove = () => {
        startTransition(() => {
            updateStream({thumbnailUrl: null})
                .then(() => {
                    toast.success('Thumbnail removed')
                    setThumbnailUrl("")
                    closeRef?.current?.click()
                })
                .catch(() => toast.error('Error removing thumbnail'))
        })
    }

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
                    <div className='space-y-2'>
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10  '>
                                <div className='absolute top-2 right-2 z-[10]'>
                                    <Hint
                                        label="Remove thumbnail"
                                        asChild
                                        side='left'
                                    >
                                        <Button
                                            type='button'
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className='h-auto w-auto p-1.5'
                                        >
                                            <Trash className='h-4 w-4' />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    src={thumbnailUrl}
                                    alt="Thumbnail"
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        ) :(
                            <div className='rounded-xl border outline-dashed outline-muted'>
                                <UploadDropzone
                                    endpoint='thumbnailUploader'
                                    appearance={{
                                        label: {
                                            color: "#FFFFFF"
                                        },
                                        allowedContent: {
                                            color: "#FFFFFF"
                                        }
                                    }}
                                    onClientUploadComplete={(res ) => {
                                        setThumbnailUrl(res?.[0]?.url)
                                        router.refresh()
                                        closeRef?.current?.click()
                                    }}
                                />
                            </div>
                        )}
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