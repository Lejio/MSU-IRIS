import React from 'react'
import SignInHeader from './SignInHeader'
import GoogleButton from './GoogleButton'
import LogoutButton from './LogoutButton'
import Link from 'next/link'

export default function SignInModal() {
  return (
    <div className=' w-3/4 h-full'>
      <SignInHeader />
      <div>
        Sign In to IRIS Dashboard
        <GoogleButton className="bg-black dark:bg-white dark:text-black text-white flex min-w-[150px] justify-center group/google-btn">
            <div className='translate-x-40 group-hover/google-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20'>
              Sign In with Google
            </div>
            <span className='group-hover/google-btn:-translate-x-40 text-center transition duration-500'>
                Test
            </span>
        </GoogleButton>
        <LogoutButton />
        <Link href='/dashboard'>Dashboard</Link>
      </div>
    </div>
  )
}

