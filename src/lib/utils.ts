import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { hc } from "hono/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_URL = "http://localhost:8787"
export const client = hc(API_URL)
