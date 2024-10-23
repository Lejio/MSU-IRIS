import React from 'react'
// import MonacoEditor from './components/MonacoEditor'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('./components/MonacoEditor'), { ssr: false, loading: () => <p>Loading...</p> })

export default function page() {
  return (
    <div>
      {/* <MonacoEditor /> */}
      <a href="/test-room-2">
      <div className=' m-5 w-20 h-20 border-solid border-black rounded-lg bg-slate-600'>
      </div>
      </a>
    </div>
  )
}
