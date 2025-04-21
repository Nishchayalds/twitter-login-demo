// components/ui/AutoRefreshComponent.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AutoRefreshComponent({ search, intervalTime = 1000 }:any) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh only when params.search changes
      console.log("run")
      router.refresh();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [router, intervalTime, search]); 

  return null;
}
