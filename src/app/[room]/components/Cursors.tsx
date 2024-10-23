'use client';
// import { useEffect, useMemo, useState } from "react";
// import { useSelf } from "@liveblocks/react/suspense";
// import { AwarenessList, UserAwareness } from "@/../liveblocks.config";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";

// type Props = {
//   yProvider: LiveblocksYjsProvider;
// };

// export function Cursors({ yProvider }: Props) {
//   // Get user info from Liveblocks authentication endpoint
//   const userInfo = useSelf((me) => me.info);

//   const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

//   useEffect(() => {
//     // Add user info to Yjs awareness
//     const localUser: UserAwareness["user"] = userInfo;
//     yProvider.awareness.setLocalStateField("user", localUser);

//     // On changes, update `awarenessUsers`
//     function setUsers() {
//       setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
//     }

//     yProvider.awareness.on("change", setUsers);
//     setUsers();

//     return () => {
//       yProvider.awareness.off("change", setUsers);
//     };
//   }, [yProvider]);

  
//   // Insert awareness info into cursors with styles
//   const styleSheet = useMemo(() => {
//     let cursorStyles = "";

//     for (const [clientId, client] of awarenessUsers) {
//       if (client?.user) {
//         cursorStyles += `
//           .yRemoteSelection-${clientId}, 
//           .yRemoteSelectionHead-${clientId}  {
//             --user-color: ${client.user.color || "orangered"};
//           }
          
//           .yRemoteSelectionHead-${clientId}::after {
//             content: "${client.user.name}";
//           }
//         `;
//       }
//     }

//     return { __html: cursorStyles };
//   }, [awarenessUsers]);

//   return <style dangerouslySetInnerHTML={styleSheet} />;
// }

import { useEffect, useMemo, useState } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import { AwarenessList, UserAwareness } from "@/../liveblocks.config";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

type Props = {
  yProvider: LiveblocksYjsProvider;
};

export function Cursors({ yProvider }: Props) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

  useEffect(() => {
    // Add user info to Yjs awareness
    const localUser: UserAwareness["user"] = userInfo;
    yProvider.awareness.setLocalStateField("user", localUser);

    // On changes, update `awarenessUsers`
    function setUsers() {
      const updatedUsers = [...yProvider.awareness.getStates()] as AwarenessList;

      // Filter out users who have disconnected (i.e., users without a 'user' field)
      const activeUsers = updatedUsers.filter(
        ([, client]) => client?.user
      );
      console.log(activeUsers.length);

      setAwarenessUsers(activeUsers);
    }

    yProvider.awareness.on("change", setUsers);
    // Handle provider status changes
    // yProvider.on("status", (event: { status: string }) => {
    //   if (event.status === "disconnected") {
    //     yProvider.awareness.setLocalState(null);
    //   }
    // });
    setUsers();

    return () => {
      // Ensure cleanup on unmount and user leave
      yProvider.awareness.off("change", setUsers);
      yProvider.awareness.setLocalState(null); // Clear local awareness state
      // yProvider.disconnect(); // Disconnect the provider
      console.log('User disconnected');
    };
  }, [yProvider, userInfo]);

  // Insert awareness info into cursors with styles
  const styleSheet = useMemo(() => {
    let cursorStyles = "";

    for (const [clientId, client] of awarenessUsers) {
      if (client?.user) {
        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId}  {
            --user-color: ${client.user.color || "orangered"};
          }
          
          .yRemoteSelectionHead-${clientId}::after {
            content: "${client.user.name}";
          }
        `;
      } else {
        // Remove disconnected users from awareness
        cursorStyles += '';
        console.log('User disconnected');
      }
    }

    return { __html: cursorStyles };
  }, [awarenessUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}

