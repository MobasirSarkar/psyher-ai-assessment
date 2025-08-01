import { z } from "zod";

const tier = ["free", "silver", "gold", "platinum"] as const;

const UserTierSchema = z.enum(tier);

export const EventSchema = z.object({
  id: z.string().default(""),
  title: z
    .string()
    .nullable()
    .default("Untitled Event")
    .transform((val) => val || "Untitled Event"),
  description: z
    .string()
    .nullable()
    .default("No description available")
    .transform((val) => val || "No description available"),
  event_date: z
    .union([z.string(), z.date()])
    .default(new Date().toISOString())
    .transform((val) => (typeof val === "string" ? val : val.toISOString())),
  image_url: z
    .string()
    .nullable()
    .default(null)
    .transform((val) => {
      return (
        val ??
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop"
      );
    }),
  tier: UserTierSchema.default("free"),
  created_at: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) =>
      typeof val === "string" || typeof val === "undefined"
        ? val
        : val.toISOString(),
    ),
});

export type EventType = z.infer<typeof EventSchema>;
export type UserTier = z.infer<typeof UserTierSchema>;

export type RawEvent = {
  id: string;
  title: string;
  description: string;
  event_date: string | Date;
  image_url: string | null;
  tier: string;
  created_at?: string | Date;
};

export const tierHierarchy = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const;

export const tierConfig = {
  free: {
    label: "Free",
    color: "bg-slate-100 text-slate-700 border-slate-200",
    gradient: "from-slate-50 to-slate-100",
    icon: "🆓",
  },
  silver: {
    label: "Silver",
    color: "bg-slate-100 text-slate-600 border-slate-300",
    gradient: "from-slate-100 to-slate-200",
    icon: "🥈",
  },
  gold: {
    label: "Gold",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    gradient: "from-amber-50 to-amber-100",
    icon: "🥇",
  },
  platinum: {
    label: "Platinum",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    gradient: "from-purple-50 to-purple-100",
    icon: "💎",
  },
} as const;

export function validateEvent(data: unknown): EventType {
  return EventSchema.parse(data);
}

export function validateEvents(data: unknown[]): EventType[] {
  const validEvents: EventType[] = [];
  data.forEach((item, index) => {
    try {
      const validEvent = EventSchema.parse(item);
      validEvents.push(validEvent);
    } catch (err) {
      console.warn(
        `Event at index ${index} failed validation:`,
        item,
        "error:",
        err,
      );
    }
  });
  return validEvents;
}

export function getAllowedTiers(userTier: UserTier): UserTier[] {
  const userTierLevel = tierHierarchy[userTier];
  return Object.keys(tierHierarchy).filter(
    (tier) => tierHierarchy[tier as UserTier] <= userTierLevel,
  ) as UserTier[];
}
