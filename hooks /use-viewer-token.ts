/*hook to create the identity of the user trying to look at the stream */

import { toast } from 'sonner'
import { JwtPayload, jwtDecode } from "jwt-decode";
import {useEffect, useState} from "react";
import {createViewerToken} from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [ token, setToken ] = useState("")
    const [ name, setName ] = useState("")
    const [ identity, setIdentity ] = useState("")

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken()
            } catch {
                toast.error('Error creating token')
            }
        }
    },[])
}