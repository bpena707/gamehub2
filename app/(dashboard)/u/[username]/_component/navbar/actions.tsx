import {currentUser, SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogOut} from "lucide-react";


export const Actions = async () => {

  return (
    <div className='flex items-center gap-x-2'>
        <Button
            size='sm'
            variant='ghost'
            className='text-muted-foreground hover:text-primary'
        >
            <Link href='/'>
                <LogOut className='h-5 w-5 mr-2' />
                Exit
            </Link>
        </Button>
        <UserButton
            afterSignOutUrl='/'
        />
    </div>
  )
}