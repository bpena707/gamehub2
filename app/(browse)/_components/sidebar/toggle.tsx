'use client'

import {useSidebar} from "@/store/use-sidebar";

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
          {!collapsed && (
              <div className='p-3 pl-6 mb-2 flex items-center w-full'>
                <p>
                    for you
                </p>
              </div>
          )}
      </>
  )
}