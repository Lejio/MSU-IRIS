// import { useEffect, useMemo, useState } from "react";
// import { useSelf } from "@liveblocks/react/suspense";
// import { AwarenessList, UserAwareness } from "../../../liveblocks.config";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";

// type CursorProps = {
//   color: string;
//   x: number;
//   y: number;
// };

// type yProviderProps = {
//     yProvider: LiveblocksYjsProvider;
//   };

  

// function Cursor({ color, x, y }: CursorProps) {
//     console.log(`Rendering Cursor at x: ${x}, y: ${y}`);
//   return (
//     <svg
//       style={{
//         position: "absolute",
//         left: 0,
//         top: 0,
//         transform: `translate(${x}px, ${y}px)`,
//         zIndex: 1000,
//       }}
//       width="24"
//       height="36"
//       viewBox="0 0 24 36"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
//         fill={color}
//       />
//     </svg>
//   );
// }

// export function Cursors({ yProvider }: yProviderProps) {
//   // Get user info from Liveblocks authentication endpoint
//   const userInfo = useSelf((me) => me.info);
//   const currentUserId = useSelf((me) => me.id);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

//   useEffect(() => {
//     // Function to update the cursor position
//     const updateCursorPosition = (event: MouseEvent) => {
//       setCursorPosition({ x: event.clientX, y: event.clientY });
//     };

//     // Add event listener for mouse movement
//     window.addEventListener("mousemove", updateCursorPosition);

//     // Clean up event listener on component unmount
//     return () => {
//       window.removeEventListener("mousemove", updateCursorPosition);
//     };
//   }, []);

//   useEffect(() => {
//     // Add user info to Yjs awareness
//     const localUser: UserAwareness["user"] = {
//         ...userInfo,
//         x: cursorPosition.x, // Set the current x position here
//         y: cursorPosition.y, // Set the current y position here
//       };
//       yProvider.awareness.setLocalStateField("user", localUser);
//     // On changes, update `awarenessUsers`
//     function setUsers() {
//       setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
//     }

//     yProvider.awareness.on("change", setUsers);
//     setUsers();

//     return () => {
//       yProvider.awareness.off("change", setUsers);
//     };
//   }, [yProvider, cursorPosition, userInfo]);

//   // Insert awareness info into cursors with styles
// //   const styleSheet = useMemo(() => {
// //     // let cursorStyles = "";

// //     for (const [clientId, client] of awarenessUsers) {
// //       if (client?.user) {
//         // cursorStyles += `
//         //   .yRemoteSelection-${clientId}, 
//         //   .yRemoteSelectionHead-${clientId}  {
//         //     --user-color: ${client.user.color || "orangered"};
//         //   }
          
//         //   .yRemoteSelectionHead-${clientId}::after {
//         //     content: "${client.user.name}";
//         //   }
//         // `;
// //       }
// //     }

// //     return { __html: cursorStyles };
// //   }, [awarenessUsers]);

// //   return <style dangerouslySetInnerHTML={styleSheet} />;
// return (
//     <>
//       {awarenessUsers.map(([clientId, client]) => {
//         if (client?.user && client.user.email !== userInfo.email) {
//           return (
//             <>
//             {/* <Cursor
//               key={clientId}
//               color={client.user.color || "orangered"}
//               x={client.user.x}
//               y={client.user.y}
//             /> */}
//             <Caret
//               key={clientId}
//               color={client.user.color || "orangered"}
//               x={client.user.x}
//               y={client.user.y}
//             />
//             <p>{clientId} + {currentUserId}</p>
//             </>
//           );
//         }
//         return null;
//       })}
//     </>
// )
// }



// 'use client'
// import { useEffect, useState } from "react";
// import { useSelf } from "@liveblocks/react/suspense";
// import { AwarenessList, UserAwareness } from "../../../liveblocks.config";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import { editor } from "monaco-editor";// import Caret from "./Caret";


// type CaretProps = {
//     color: string;
//     line: number;
//     col: number;
//     height: number;
//     };
    
// function Caret({ color, line, col, height }: CaretProps) {
//     return (
//         <div
//         style={{
//             position: "absolute",
//             left: `${line}px`,
//             top: `${col}px`,
//             width: "2px", // Width of the caret
//             height: `${height}`, // Height of the caret
//             backgroundColor: color,
//             zIndex: 1000,
//             pointerEvents: "none",
//             animation: "blink 1s step-end infinite", // Blinking animation
//         }}
//         />
// );
// }

// type yProviderProps = {
//   yProvider: LiveblocksYjsProvider;
//   editor: editor.IStandaloneCodeEditor; // Pass the Monaco editor instance
// };

// export function Cursors({ yProvider, editor }: yProviderProps) {
//   const userInfo = useSelf((me) => me.info);
//   const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

//   useEffect(() => {
//     const localUser: UserAwareness["user"] = {
//       ...userInfo,
//     };
//     yProvider.awareness.setLocalStateField("user", localUser);

//     function setUsers() {
//       setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
//     }

//     yProvider.awareness.on("change", setUsers);
//     setUsers();

//     return () => {
//       yProvider.awareness.off("change", setUsers);
//     };
//   }, [yProvider, userInfo]);

// //   useEffect(() => {
// //     if (!editor) return;

//     // const updateCursorPosition = () => {
//         // const position = editor.getPosition();
//         // console.log(position)
//     //   if (!position) return;

//     //   const { left, top, height } = 

//     // console.log(`Height: ${height}`)
//     //   yProvider.awareness.setLocalStateField("user", {
//     //     ...yProvider.awareness.getLocalState(),
//     //     x: left,
//     //     y: top + height!,
//     //   });
//     // };

//     // const handleMouseLeave = () => {
//     //     // Remove cursor when the mouse leaves the window
//     //     yProvider.awareness.setLocalStateField("user", {
//     //       ...yProvider.awareness.getLocalState(),
//     //       x: null, // Set x and y to null or remove them to hide the cursor
//     //       y: null,
//     //     });
//     //   };
  
//     //   // Listen for cursor movement and mouse leave events
//     //   const cursorPositionChangeDisposable = editor.onDidChangeCursorPosition(updateCursorPosition);
//     //   window.addEventListener("mouseleave", handleMouseLeave);
  
//     //   return () => {
//     //     cursorPositionChangeDisposable.dispose();
//     //     window.removeEventListener("mouseleave", handleMouseLeave);
//     //   };
// //   }, [editor, yProvider]);

//   editor.onDidChangeCursorSelection((e: editor.ICursorSelectionChangedEvent) => {
//     yProvider.awareness.setLocalStateField("user", {
//         ...yProvider.awareness.getLocalState(),
//         line: e.selection.getStartPosition().lineNumber,
//         col: e.selection.getStartPosition().column,
//     });
// });


//   return (
//     <>
//       {awarenessUsers.map(([clientId, client]) => {
//         if (client?.user && client.user.email !== userInfo.email) {
//             console.log(client.user.email, userInfo.email);
//           return (
//             <Caret
//               key={clientId}
//               color={client.user.color || "orangered"}
//               line={client.user.line}
//               col={client.user.col}
//               height={18}
//             />
//           );
//         }
//         return null;
//       })}
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useSelf } from "@liveblocks/react/suspense";
import { AwarenessList, UserAwareness } from "../../../liveblocks.config";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { editor } from "monaco-editor";// import Caret from "./Caret";
import * as monaco from 'monaco-editor';


type CaretProps = {
    color: string;
    line: number;
    col: number;
    };
    
function Caret({ color, line, col }: CaretProps) {
    return (
        <div
        style={{
            position: "absolute",
            left: `${line}px`,
            top: `${col}px`,
            width: "2px", // Width of the caret
            height: "18px", // Height of the caret
            backgroundColor: color,
            zIndex: 1000,
            pointerEvents: "none",
            animation: "blink 1s step-end infinite", // Blinking animation
        }}
        />
);
}

type yProviderProps = {
  yProvider: LiveblocksYjsProvider;
  editor: editor.IStandaloneCodeEditor; // Pass the Monaco editor instance
};

export function Cursors({ yProvider, editor }: yProviderProps) {
  const userInfo = useSelf((me) => me.info);
  const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);
  const editorLineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
  
//   console.log(`Line height: ${editorLineHeight}`)

  useEffect(() => {
    const localUser: UserAwareness["user"] = {
      ...userInfo,
    };
    yProvider.awareness.setLocalStateField("user", localUser);

    function setUsers() {
      setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
    }

    yProvider.awareness.on("change", setUsers);
    setUsers();

    return () => {
      yProvider.awareness.off("change", setUsers);
    };
  }, [yProvider, userInfo]);
  
      // Listen for cursor movement and mouse leave events
   editor.onDidChangeCursorPosition((e: editor.ICursorPositionChangedEvent) => {
        const position = editor.getPosition();
        if (!position) return;

        const editorPosition = editor.getScrolledVisiblePosition(position);
        if (editorPosition) {
            const { top, left } = editorPosition;
            console.log(top, left)
            yProvider.awareness.setLocalStateField("user", {
                ...yProvider.awareness.getLocalState(),
                line: left,
                col: top,
            });
        }
    })

  return (
    <>
      {awarenessUsers.map(([clientId, client]) => {
        if (client?.user && client.user.email !== userInfo.email) {
            console.log
          return (
            <Caret
              key={clientId}
              color={client.user.color || "orangered"}
              line={client.user.line}
              col={client.user.col}
            />
          );
        }
        return null;
      })}
    </>
  );
}