"use client";

import { useState } from "react";
import { OWNER_PASSCODE, setOwnerMode, useOwnerMode } from "@/lib/use-owner-mode";

const fieldClassName =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100";

export default function OwnerGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const owner = useOwnerMode();
  const [passcode, setPasscode] = useState("");
  const [wrong, setWrong] = useState(false);

  if (owner === null) {
    return <p className="mt-10 text-sm text-zinc-500">Loading…</p>;
  }

  if (owner) {
    return <>{children}</>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (passcode === OWNER_PASSCODE) {
          setWrong(false);
          setPasscode("");
          setOwnerMode(true);
        } else {
          setWrong(true);
        }
      }}
      className="mt-10 max-w-xl space-y-6"
      noValidate
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Owner access required. Visitors can only read.
      </p>
      <div>
        <label
          htmlFor="owner-passcode"
          className="mb-1.5 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          Owner passcode
        </label>
        <input
          id="owner-passcode"
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className={fieldClassName}
        />
        {wrong ? (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            Wrong passcode.
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Unlock
      </button>
    </form>
  );
}
