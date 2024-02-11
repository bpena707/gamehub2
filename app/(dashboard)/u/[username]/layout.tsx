import {getSelfByUsername} from "@/lib/auth-service";
import {redirect} from "next/navigation";
import {Navbar} from "./_component/navbar";

interface CreatorLayoutProps {
    params: {username: string}
    children: React.ReactNode
}

const CreateLayout = async ({
    params,
    children
}: CreatorLayoutProps) => {
    const self = await getSelfByUsername(params.username)

    // extra layer to make sure logged in user is the same as the creator
    if (!self) {
        redirect('/')
    }

    return (
        <>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Navbar />
            <div className='flex h-full pt-20'>
                {children}
            </div>
        </>
    );
}

export default CreateLayout