import { getEventsByTiers, getAllEvents } from "@/lib/db/supabase"
import { EventType, UserTier, getAllowedTiers } from "@/types"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { RefreshCw } from "lucide-react"
import EventsPageClient from "./_components/event-client"

export default async function EventPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
  }

  const curUserTier = user?.publicMetadata?.tier
  const lowerCasedTier = typeof curUserTier === "string" ? curUserTier.toLowerCase() : "free"

  const validUserTier: UserTier = ["free", "silver", "gold", "platinum"].includes(lowerCasedTier)
    ? (lowerCasedTier as UserTier)
    : "free"

  const allowedTiers = getAllowedTiers(validUserTier)

  try {
    const [accessibleEvents, allEvents] = await Promise.all([getEventsByTiers(allowedTiers), getAllEvents()])

    if (!allEvents) {
      return <EventsErrorState />
    }

    const restrictedEvents = allEvents?.filter(
      (event: EventType) => !accessibleEvents?.some((accessible) => accessible.id === event.id),
    )

    return (
      <EventsPageClient
        accessibleEvents={accessibleEvents ?? []}
        restrictedEvents={restrictedEvents ?? []}
        userTier={validUserTier}
      />
    )
  } catch (error) {
    console.error("Error loading events page:", error)
    return <EventsErrorState />
  }
}

function EventsErrorState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-6">We couldn&#39t load your events. Please try again later.</p>
          <form action={() => window.location.reload()}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

