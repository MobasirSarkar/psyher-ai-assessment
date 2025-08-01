"use client"

import { EventType, tierConfig } from "@/types"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Lock } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"

interface EventCardProps {
  event: EventType
  accessible: boolean
  index: number
}

export default function EventCard({ event, accessible, index }: EventCardProps) {
  const tierStyle = tierConfig[event.tier]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${!accessible ? "opacity-60" : ""}`}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.image_url || "/placeholder.svg?height=200&width=400&query=event"}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=200&width=400"
            }}
          />

          <div className="absolute top-3 right-3">
            <Badge className={tierStyle.color}>
              <span className="mr-1">{tierStyle.icon}</span>
              {tierStyle.label}
            </Badge>
          </div>

          {!accessible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="text-white text-center p-4">
                <Lock className="h-8 w-8 mx-auto mb-2" />
                <p className="font-semibold mb-1">Upgrade Required</p>
                <p className="text-sm opacity-90">Upgrade to {tierStyle.label} to access</p>
              </div>
            </motion.div>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{event.description}</p>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(event.event_date)}
          </div>
        </CardContent>

        {accessible && (
          <CardFooter className="p-6 pt-0">
            <Button className="w-full" variant="default">
              View Details
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}

