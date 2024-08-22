import React from 'react'
import Link from 'next/link'

const links = [
    {
        title: 'Dashboard',
        link: '/dashboard'
    },
    {
        title: 'Devices',
        link: '/dashboard/devices'
    },
    {
        title: 'Ubidots',
        link: '/dashboard/ubidots'
    },
    
]

export default function DashboardNavBar() {
  return (
    <div>
        <div className=' mt-10 flex flex-row justify-evenly items-center content-center w-[30vw] h-10 rounded-full bg-black'>
        {links.map((link, index) => {
            return (
                <Link className=' text-white' key={index} href={link.link}>
                    {link.title}
                </Link>
            )
            })}
        </div>
        
    </div>
  )
}
