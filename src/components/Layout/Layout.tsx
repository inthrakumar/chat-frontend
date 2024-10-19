import React from 'react'
import { Outlet, } from 'react-router-dom';


const Layout = () => {
    return (
        <div className='min-h-screen w-[100vw] flex flex-col items-start justify-around'>
            <div className='flex-grow'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout