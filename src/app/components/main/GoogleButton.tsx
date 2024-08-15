'use client'

import React, { ReactNode } from 'react'
import { cn } from "@/lib/utils";

export default function GoogleButton({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) {
    return (
      <button
        className={cn(
          "px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden",
          className
        )}
        onClick={() => {console.log("Signing In with Google")}}
      >
        {children}
      </button>
    );
  };