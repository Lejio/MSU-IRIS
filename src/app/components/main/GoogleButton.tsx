'use client'

import React, { ReactNode } from 'react'
import { cn } from "@/lib/utils";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function GoogleButton({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) {

    const supabase = createClient();
    const router = useRouter();
    const signInWithGoogle = async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: "http://localhost:3000/api/auth/callback?next=/dashboard"
        }
      });
    };
    return (
      <button
        className={cn(
          "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
          className
        )}
        onClick={() => {signInWithGoogle()}}>
        {children}
      </button>
    );
  };