"use client";

import { useEffect, useState } from "react";

export const OWNER_PASSCODE = "santaclara2026";

const OWNER_KEY = "owner-mode";

export function setOwnerMode(on: boolean) {
  if (on) {
    window.localStorage.setItem(OWNER_KEY, "on");
  } else {
    window.localStorage.removeItem(OWNER_KEY);
  }
  window.dispatchEvent(new Event("owner-mode-change"));
}

export function useOwnerMode(): boolean | null {
  const [owner, setOwner] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const update = () => {
      if (!cancelled) {
        setOwner(window.localStorage.getItem(OWNER_KEY) === "on");
      }
    };
    const timer = window.setTimeout(update, 0);
    window.addEventListener("owner-mode-change", update);
    window.addEventListener("storage", update);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("owner-mode-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return owner;
}
