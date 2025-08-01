import { RawEvent, validateEvents } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export async function createClient() {
  const { getToken } = await auth();

  const token = await getToken({ template: "supabase" });

  if (!token) {
    throw new Error("No supabase JWT from clerk-client not yet available.");
  }
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

/*
 * This function helps to filter out events based on the tiers
 * */
export async function getEventsByTiers(allowedTiers: string[]) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, tier, description, event_date, image_url, created_at")
      .in("tier", allowedTiers)
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to fetch events: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return validateEvents(data as RawEvent[]);
  } catch (error) {
    console.error("Error fetching events by tiers:", error);
    return [];
  }
}

// This function helps to get all the events
export async function getAllEvents() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, tier, description, event_date, image_url, created_at")
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to fetch all events: ${error.message}`);
    }

    if (!data) {
      return [];
    }
    return validateEvents(data as RawEvent[]);
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
}
