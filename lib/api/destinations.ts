import { destinations, type Destination } from "@/lib/mock/destinations";

export type DestinationFetchMode = "ok" | "empty" | "error";

export async function fetchDestinations(
  mode: DestinationFetchMode = "ok"
): Promise<Destination[]> {
  await new Promise((resolve) => setTimeout(resolve, 550));

  if (mode === "error") {
    throw new Error("Could not load destinations.");
  }

  if (mode === "empty") {
    return [];
  }

  return destinations;
}
