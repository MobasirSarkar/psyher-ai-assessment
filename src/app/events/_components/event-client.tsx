"use client"

import { EventType, UserTier, tierConfig } from "@/types"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"
import TierUpgrade from "./tier-upgrade-card"
import EventsContent from "./event-content"

interface EventsPageClientProps {
  accessibleEvents: EventType[]
  restrictedEvents: EventType[]
  userTier: UserTier
}

export default function EventsPageClient({ accessibleEvents, restrictedEvents, userTier }: EventsPageClientProps) {

  const tierStyle = tierConfig[userTier]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Your Events</h1>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Current tier:</span>
              <Badge className={tierStyle.color}>
                <span className="mr-1">{tierStyle.icon}</span>
                {tierStyle.label}
              </Badge>
            </div>
          </div>
          <TierUpgrade currentTier={userTier} />
        </motion.div>

        {/* Events Content */}
        <EventsContent accessibleEvents={accessibleEvents} restrictedEvents={restrictedEvents} userTier={userTier} />
      </div>
    </motion.div>
  )
}

