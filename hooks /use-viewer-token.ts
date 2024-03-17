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
                const viewerToken = await createViewerToken(hostIdentity)
                setToken(viewerToken)

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {name?: string}

                const name = decodedToken?.name
                const identity = decodedToken.jti

                if(identity){
                    setIdentity(identity)
                }

                if(name){
                    setName(name)
                }

            } catch {
                toast.error('Error creating token')
            }
        }

        createToken()
    },[hostIdentity])

    return { token, name, identity }
}