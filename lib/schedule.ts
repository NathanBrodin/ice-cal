import { z } from "zod";

export type ScheduleItem = {
  day: string; // Dag
  weekday: string; // Veckodag
  start: string; // Start
  final: string; //Slut
  local: string; // Lokal
  bookingType: string; // Bokningstyp
  information: string; // Information
};

// Enums for booking types
export enum BookingType {
  PUBLIC_SKATING = "Public Skating",
  OUTDOOR_SKATING = "Outdoor Skating",
  HOCKEY = "Hockey",
}

// Enums for locations
export enum Location {
  PUBLIC_RINK = "Brandcode Center",
  OUTDOOR_RINK = "Bandyplan",
  HOCKEY_RINK = "Ungdomshallen",
}

// Mapping from Swedish to English
const bookingTypeMapping: Record<string, BookingType> = {
  "Allmänhetens åkning utan puck och klubba": BookingType.PUBLIC_SKATING,
  "Allmänhetens åkning": BookingType.OUTDOOR_SKATING,
  "Allmänhetens åkning med puck och klubba": BookingType.HOCKEY,
};

const locationMapping: Record<string, Location> = {
  "Gärdehov Arena: Brandcode Center": Location.PUBLIC_RINK,
  "Gärdehov Arena: Bandyplan": Location.OUTDOOR_RINK,
  "Gärdehov Arena: Ungdomshallen": Location.HOCKEY_RINK,
};

export const scheduleItemSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  summary: z.enum([
    BookingType.PUBLIC_SKATING,
    BookingType.OUTDOOR_SKATING,
    BookingType.HOCKEY,
  ]),
  description: z.string(),
  location: z.enum([
    Location.PUBLIC_RINK,
    Location.OUTDOOR_RINK,
    Location.HOCKEY_RINK,
  ]),
});

export function formatSchedule(items: ScheduleItem[]) {
  const cleanedSchedule = items.filter((item) =>
    Object.values(item).some((value) => value !== ""),
  );

  const schedule: z.infer<typeof scheduleItemSchema>[] = [];

  cleanedSchedule.forEach((item: ScheduleItem) => {
    // Map booking type and location to English
    const bookingType = bookingTypeMapping[item.bookingType];
    const location = locationMapping[item.local];

    // Parse the date (format: "2024-11-22")
    const [year, month, day] = item.day.split("-").map(Number);

    // Parse the time (format: "17:15")
    const [startHour, startMinute] = item.start.split(":").map(Number);
    const [endHour, endMinute] = item.final.split(":").map(Number);

    // Create Date objects for start and end times
    const startTime = new Date(year, month - 1, day, startHour, startMinute);
    const endTime = new Date(year, month - 1, day, endHour, endMinute);

    schedule.push({
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      summary: bookingType,
      description: item.information,
      location: location,
    });
  });

  return schedule;
}
