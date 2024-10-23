import React from 'react'
// import MonacoEditor from './components/MonacoEditor'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('./components/MonacoEditor'), { ssr: false, loading: () => <p>Loading...</p> })

export default function page() {
  return (
    <div>
      <MonacoEditor />
    </div>
  )
}
