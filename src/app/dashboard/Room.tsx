"use client";

import { ReactNode, useMemo } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";

export function Room({ children }: { children: ReactNode }) {

    const roomId = "test-room-2"
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: { line: 0, col: 0, x: 0, y: 0 },
      }}
    >
      <ClientSideSuspense fallback={<div>Loading</div>}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
}