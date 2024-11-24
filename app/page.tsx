import CopyButton from "@/components/copy-button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BookingType } from "@/lib/schedule";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const currSearchParams = await searchParams;

  const selectedTypes = currSearchParams.type
    ? (Array.isArray(currSearchParams.type)
        ? currSearchParams.type
        : [currSearchParams.type]
      ).filter((type): type is BookingType =>
        Object.values(BookingType).includes(type as BookingType),
      )
    : [];

  const getUpdatedSearchParams = (type: BookingType) => {
    const params = new URLSearchParams();
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    newTypes.forEach((t) => params.append("type", t));
    return params.toString();
  };

  function displaySearchParams() {
    const params = new URLSearchParams();
    selectedTypes.forEach((type) => params.append("type", type));
    return "https://ice-cal.brodin.dev/api/schedule?" + params.toString();
  }

  return (
    <div className="w-screen h-screen bg-black font-geist text-white flex items-center justify-center p-2">
      <div className="w-full md:w-2/3  rounded-[32px] border border-stone-700 bg-stone-800 p-[2px]">
        <div className="w-full h-full rounded-[30px] border border-stone-700 bg-black flex flex-col">
          <div className="w-full flex flex-col justify-center items-center mt-4">
            <h1 className="font-display text-4xl">Ice Rink Calendar</h1>
            <p className="text-stone-400">Brandcode Center</p>
          </div>
          <Separator className="bg-stone-700 mt-4" />
          <div className="w-full h-full relative p-4 flex flex-col gap-4">
            <div className="absolute pointer-events-none z-0 inset-0 h-full w-full  bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="z-10 bg-stone-900 rounded-xl border border-stone-700">
              <div className="z-10 p-4 bg-black overflow-clip rounded-t-xl">
                <h2 className="text-md font-semibold leading-none tracking-tight">
                  Add Brandcode Center&apos;s Schedule to Your Calendar
                </h2>
                <p className="text-sm text-stone-400">
                  Choose your favorite skating activity to stay updated!
                </p>
              </div>
              <Separator className="bg-stone-700 z-10" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 z-10 p-4">
                <Link
                  href={`?${getUpdatedSearchParams(BookingType.PUBLIC_SKATING)}`}
                  className={`rounded-xl border border-stone-700 bg-black flex flex-col items-center p-4 transition-colors hover:bg-stone-900
                        ${selectedTypes.includes(BookingType.PUBLIC_SKATING) ? "ring-1 ring-[#b3b1de] bg-stone-700" : ""}`}
                >
                  <h3 className="font-display text-xl mb-2">Public Skating</h3>
                  <p className="text-xs font-normal leading-snug text-stone-400">
                    Glide across the ice at Brandcode Center&apos;s indoor rink
                    and show off your best moves. Fun for everyone!
                  </p>
                </Link>
                <Link
                  href={`?${getUpdatedSearchParams(BookingType.OUTDOOR_SKATING)}`}
                  className={`rounded-xl border border-stone-700 bg-black flex flex-col items-center p-4 transition-colors hover:bg-stone-900
                        ${selectedTypes.includes(BookingType.OUTDOOR_SKATING) ? "ring-1 ring-[#b3b1de] bg-stone-700" : ""}`}
                >
                  <h3 className="font-display text-xl mb-2">Outdoor Skating</h3>
                  <p className="text-xs font-normal leading-snug text-stone-400">
                    Embrace the fresh air as you skate under the open sky. Bring
                    your hockey stick for extra fun!
                  </p>
                </Link>

                <Link
                  href={`?${getUpdatedSearchParams(BookingType.HOCKEY)}`}
                  className={`rounded-xl border border-stone-700 bg-black flex flex-col items-center p-4 transition-colors hover:bg-stone-900
                        ${selectedTypes.includes(BookingType.HOCKEY) ? "ring-1 ring-[#b3b1de] bg-stone-700" : ""}`}
                >
                  <h3 className="font-display text-xl mb-2">Hockey</h3>
                  <p className="text-xs font-normal leading-snug text-stone-400">
                    Ready for action? Join your friends for a thrilling game of
                    hockey.
                  </p>
                </Link>
              </div>
            </div>
            <Separator className="bg-stone-700 z-10" />
            <div className="z-10 w-full flex flex-col gap-2 ">
              <div className="flex w-full  items-end space-x-2">
                <Input
                  type="text"
                  value={displaySearchParams()}
                  readOnly
                  className="w-full flex-1 focus-visible:ring-none font-mono"
                />
                <CopyButton content={displaySearchParams()} />
              </div>
              <p className="text-sm text-stone-400 italic">
                Copy and paste the following address into your calendar app to
                subscribe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
