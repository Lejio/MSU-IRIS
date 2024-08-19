import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { user } from "@nextui-org/react";
/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || data.user === null) {
    return new NextResponse(null, {status: 500});
  }

  const userId: string = data.user.id
  console.log(userId);

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: {
      name: data.user.user_metadata!.full_name,
      email: data.user.email,
      color: "#4FC3F7",
      picture: data.user.user_metadata.picture,
      x: 0,
      y: 0,
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`test-room-2`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
