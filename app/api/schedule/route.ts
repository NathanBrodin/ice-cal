import { BookingType, formatSchedule, ScheduleItem } from "@/lib/schedule";
import * as cheerio from "cheerio";
import { type NextRequest } from "next/server";
import ical, { ICalCalendarMethod } from "ical-generator";

// 2 days
export const revalidate = 172800;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Get the booking types from query parameters
  const types = searchParams.getAll("type");

  // Validate booking types
  const validTypes = types.filter((type): type is BookingType =>
    Object.values(BookingType).includes(type as BookingType),
  );

  // Fetch the schedule data
  const response = await fetch(
    "https://exportservice.actorsmartbook.se/ExportGridStyle.aspx?com=58a26dde-d78e-4176-b4b3-5c236bbc9f1e&con=fe2bd241-0836-4aaf-82e1-27518f6d17cb",
  );

  const html = await response.text();
  const $ = cheerio.load(html);

  // Select all rows in the table body
  const rows = $("table.rgMasterTable tbody tr");

  const schedule: ScheduleItem[] = [];

  // Iterate through each row and extract data
  // eslint-disable-next-line
  rows.each((index: number, row: any) => {
    const cells = $(row).find("td");
    schedule.push({
      day: $(cells[0]).text().trim(), // Dag
      weekday: $(cells[1]).text().trim(), // Veckodag
      start: $(cells[2]).text().trim(), // Start
      final: $(cells[3]).text().trim(), // Slut
      local: $(cells[4]).text().trim(), // Lokal
      bookingType: $(cells[5]).text().trim(), // Bokningstyp
      information: $(cells[6]).text().trim(), // Information
    });
  });

  let cleanedSchedule = formatSchedule(schedule);

  // Filter schedule if booking types are specified
  if (validTypes.length > 0) {
    cleanedSchedule = cleanedSchedule.filter((item) =>
      validTypes.includes(item.summary),
    );
  }

  const calendar = ical({ name: "Ice Rink - Brandcode Center" });

  // A method is required for outlook to display event as an invitation
  calendar.method(ICalCalendarMethod.PUBLISH);

  // Iterate through each schedule item and create an event
  cleanedSchedule.forEach((item) => {
    calendar.createEvent(item);
  });

  return new Response(calendar.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calendar.ics"',
    },
  });
}
