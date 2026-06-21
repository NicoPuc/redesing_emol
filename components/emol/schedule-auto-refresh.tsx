"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ScheduleAutoRefreshProps {
  delayMs?: number;
}

export function ScheduleAutoRefresh({ delayMs }: ScheduleAutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    if (!delayMs || delayMs <= 0) {
      return;
    }

    let shouldRefreshOnFocus = false;
    const timeout = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
        return;
      }

      shouldRefreshOnFocus = true;
    }, delayMs);

    const handleVisibilityChange = () => {
      if (shouldRefreshOnFocus && document.visibilityState === "visible") {
        shouldRefreshOnFocus = false;
        router.refresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [delayMs, router]);

  return null;
}
