import React, { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'

const ServerProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
        {children}
    </NextUIProvider>
  )
}

export default ServerProviders
