import React from 'react'
// import MonacoEditor from './components/MonacoEditor'
import ParticleTest from './components/ParticleTest'
import NewProjectSheet from './components/NewProjectSheet'
import { Button } from '@nextui-org/react'

export default function page() {
  return (
    <div>
      {/* <MonacoEditor /> */}
      <a href="/test-room-2">
      <div className=' m-5 w-20 h-20 border-solid border-black rounded-lg bg-slate-600'>
      </div>
      </a>
      <NewProjectSheet />
      {/* <ParticleTest /> */}
    </div>
  )
}
