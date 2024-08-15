// 'use client'
// import React, { ReactNode } from 'react'
// import { LiveblocksProvider, RoomProvider } from '@liveblocks/react/suspense'

// type ProvidersProps = {
//     children: ReactNode;
//   };

// const ClientProviders = ({ children }: { children: ReactNode}) => {
//   return (
//     <LiveblocksProvider
//     publicApiKey={"pk_dev_Z5SdjeBJdDMvfNqQFuGKZ9I7mKl02r7TmZ-P-Upvd4t1qFYILa4zslxma2Ls8aqB"}
//     lostConnectionTimeout={5000}
//     throttle={16}
//     // authEndpoint="/api/liveblocks-auth"
//     >
//         <RoomProvider id="test-room">
//             {children}
//         </RoomProvider>
//     </LiveblocksProvider>
//   )
// }

// export default ClientProviders
