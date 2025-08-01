"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { UserTier, tierConfig } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface TierUpgradeProps {
  currentTier: UserTier
}

const tierProgression: Record<UserTier, UserTier> = {
  free: "silver",
  silver: "gold",
  gold: "platinum",
  platinum: "platinum",
}

export default function TierUpgrade({ currentTier }: TierUpgradeProps) {
  const { user } = useUser()
  const [isUpgrading, setIsUpgrading] = useState<boolean>(false)
  const router = useRouter()

  const nextTier = tierProgression[currentTier]
  const canUpgrade = currentTier !== "platinum"
  const currentTierConfig = tierConfig[currentTier]
  const nextTierConfig = tierConfig[nextTier]

  const handleUpgrade = async () => {
    if (!user || !canUpgrade) return

    setIsUpgrading(true)
    try {
      const response = await fetch("/api/tier/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier: nextTier }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to update tier" }))
        throw new Error(errorData.error || "Failed to update tier")
      }

      const data = await response.json()
      console.log("Tier updated successfully:", data)

      router.refresh()
    } catch (error) {
      console.error("Error upgrading tier:", error)
    } finally {
      setIsUpgrading(false)
    }
  }

  if (!canUpgrade) {
    return (
      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 text-sm">
        <span className="mr-2">{currentTierConfig.icon}</span>
        {currentTierConfig.label} Member
      </Badge>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleUpgrade}
        disabled={isUpgrading}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
      >
        {isUpgrading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mr-2"
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        ) : (
          <span className="mr-2">{nextTierConfig.icon}</span>
        )}
        {isUpgrading ? "Upgrading..." : `Upgrade to ${nextTierConfig.label}`}
      </Button>
    </motion.div>
  )
}

