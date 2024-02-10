'use client'



import {Follow} from "@prisma/client";
import {User} from ".prisma/client";
import {useSidebar} from "@/store/use-sidebar";

interface FollowingProps {
    data: (Follow & { following : User })[]
}

export const Following =({data} : FollowingProps) => {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) {
        return null
    }


    return (
        <div>
            {!collapsed && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Following
                    </p>
                </div>
            )}
        </div>
    )
}

