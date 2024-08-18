import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import { Room } from './Room';
import { CollaborativeEditor } from './CollaborativeEditor';
export default async function page() {

    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
        redirect('/')
    }
    console.log(user.data.user.user_metadata)
  return (
    <div>
        Dashboard
        <Room>
            <CollaborativeEditor />
        </Room>
    </div>
  )
}
