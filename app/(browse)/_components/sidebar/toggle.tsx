'use client'

import {useSidebar} from "@/store/use-sidebar";
import {Button} from "@/components/ui/button";
import {ArrowLeftFromLine, ArrowRightFromLine} from "lucide-react";

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse,
    } = useSidebar((state) => state)

    // user action to expand or collapse the sidebar
    const label = collapsed ? 'Expand' : 'Collapse'


  return (
      <>
          {collapsed && (
              <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
                  <Button
                      variant='ghost'
                      className='p-2 h-auto'
                      onClick={onExpand}>
                      <ArrowRightFromLine className='h-4 w-4 '/>
                  </Button>
              </div>
          )}
          {!collapsed && (
              <div className='p-3 pl-6 mb-2 flex items-center w-full'>
                <p className='font-semibold text-primary'>
                    for you
                </p>
                  <Button
                      variant='ghost'
                      className='ml-auto p-2 h-auto'
                      onClick={onCollapse}>
                      <ArrowLeftFromLine className='h-4 w-4 '/>
                  </Button>
              </div>
          )}
      </>
  )
}