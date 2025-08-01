"use client"

import { EventType, UserTier, tierConfig } from "@/types"
import EventCard from "./event-card"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"

interface EventsContentProps {
  accessibleEvents: EventType[]
  restrictedEvents: EventType[]
  userTier: UserTier
}

export default function EventsContent({ accessibleEvents, restrictedEvents, userTier }: EventsContentProps) {
  const tierStyle = tierConfig[userTier]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-8">
      {/* Accessible Events Section */}
      {accessibleEvents.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No events available</h3>
            <p className="text-muted-foreground">
              No events are currently available for your{" "}
              <Badge className={tierStyle.color}>
                {tierStyle.icon} {tierStyle.label}
              </Badge>{" "}
              tier.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessibleEvents.map((event, index) => (
            <EventCard key={event.id} event={event} accessible={true} index={index} />
          ))}
        </div>
      )}

      {/* Restricted Events Section */}
      {restrictedEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t pt-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Premium Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock exclusive events and premium content by upgrading your membership tier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restrictedEvents.map((event, index) => (
              <EventCard key={event.id} event={event} accessible={false} index={index + accessibleEvents.length} />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

