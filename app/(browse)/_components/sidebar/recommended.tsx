'use client'

import {User} from ".prisma/client";
import {useSidebar} from "@/store/use-sidebar";

interface RecommendedProps {
    data: User[]
}

export const Recommended = ({
                                data
}: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);

    console.log(data.length)

    const showLabel = !collapsed && data.length > 0

  return (
      <div>
          {showLabel && (
              <div className='pl-6 mb-4'>
                  <p className='text-sm text-muted-foreground'>
                      Recommended
                  </p>
              </div>
          )}
      </div>
  )
}