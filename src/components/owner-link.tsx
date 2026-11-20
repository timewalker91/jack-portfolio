"use client";

import Link from "next/link";
import { useOwnerMode } from "@/lib/use-owner-mode";

export default function OwnerLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  const owner = useOwnerMode();
  if (owner !== true) return null;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
