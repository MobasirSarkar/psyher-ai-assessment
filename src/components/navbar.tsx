"use client"
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link"

export default function Navbar() {
  const { userId } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Tier Events
          </Link>

          <div className="flex items-center space-x-4">
            {userId ? (
              <>
                <Link
                  href="/events"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Events
                </Link>
                <UserButton />
              </>
            ) : (
              <div className="space-x-2">
                <Link href="/sign-in">
                  sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
