'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import { createClient } from '@/utils/supabase/client'

export default function LogoutButton() {

    async function signOut() {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        // console.log(error);
    }

  return (
    <Button onClick={signOut}>
        Sign Out
    </Button>
  )
}
