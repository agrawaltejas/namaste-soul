import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildAffiliateUrl(baseUrl: string): string {
  const affiliateId = import.meta.env.VITE_AFFILIATE_ID;
  if (!affiliateId || !baseUrl) return baseUrl;

  try {
    const url = new URL(baseUrl);
    url.searchParams.set('aid', affiliateId);
    return url.toString();
  } catch {
    // If URL parsing fails, append manually
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}aid=${affiliateId}`;
  }
}
