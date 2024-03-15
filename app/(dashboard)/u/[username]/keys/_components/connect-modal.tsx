'use client'

import { IngressInput } from "livekit-server-sdk";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {Button} from "@/components/ui/button";
import {AlertTriangle} from "lucide-react";
import {ElementRef, useRef, useState, useTransition} from "react";
import { createIngress } from "@/actions/ingress";
import {toast} from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null)
    const [isPending, startTransition] = useTransition()
    const [ingressType, setIngressType] = useState<IngressType>(RTMP)

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success('Connection generated')
                    closeRef.current?.click()
                })
                .catch(() => toast.error('Failed to generate connection'))
        })
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='primary'>
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                {/*selects the type of connection in the form of a drop down menu*/}
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                {/*the alert pops up under the drop-down menu and warns the user about reseting connection */}
                <Alert>
                    <AlertTriangle className='h-4 w-4' />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the current connection.
                    </AlertDescription>
                </Alert>
                {/*this section is for the buttons that appear in the bottom part of the modal to generate or cancel*/}
                <div className='flex justify-between'>
                    <DialogClose ref={closeRef} asChild>
                        <Button variant='ghost'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={onSubmit}
                        variant='primary'
                        disabled={isPending}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}