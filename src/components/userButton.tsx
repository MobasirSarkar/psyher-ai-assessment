"use client"

import { UserButton } from "@clerk/nextjs"

export default function UserDropdown() {
  return (
    <div className="flex items-center justify-end">
      <UserButton />
    </div>
  )
}
