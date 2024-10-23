import React from 'react'
// import { createClient } from '@/utils/supabase/server'
// import { redirect } from 'next/navigation';
import { Room } from './Room';
import { CollaborativeEditor } from './components/CollaborativeEditor';
export default async function page() {

    // const supabase = createClient();
    // const user = await supabase.auth.getUser();
    // if (!user.data.user) {
    //     redirect('/')
    // }
    // console.log(user.data.user.user_metadata.full_name)
  return (
    <div className=' h-[80vh] w-[90vw]'>
        <Room>
            <CollaborativeEditor />
        </Room>
    </div>
  )
}
