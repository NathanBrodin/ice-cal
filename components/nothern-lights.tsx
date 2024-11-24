// Stole the CSS from Vercel's website, based on this tweet: https://x.com/JohnPhamous/status/1831380516509278561
export default function NothernLights() {
  return (
    <div
      className="pointer-events-none absolute overflow-clip top-0 -translate-y-10 left-1/2 -translate-x-1/2 w-[120%] bg-red-500 h-1/3 "
      style={{
        maskImage:
          "radial-gradient(ellipse at 50% 18%, black 27%, transparent 70%)",
      }}
    >
      <div className="overflow-hidden absolute inset-0">
        <div
          className="absolute -inset-[10px] blur-[20px] opacity-70 overflow-hidden text-black invert-0  transition-opacity duration-500 "
          style={{
            transform: "translate3d(0, 0, 0)",
            backgroundImage:
              "repeating-linear-gradient(110deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 19%), repeating-linear-gradient(110deg, oklch(43.35% 0.1055 180.97) 10%, oklch(57.61% 0.2321 258.23) 15%, oklch(55.5% 0.2186 306.12) 20%, oklch(63.52% 0.2346 1.01) 25%, oklch(81.87% 0.1969 76.46) 30%)",
            backgroundSize: "120%, 200%",
            backgroundPosition: "50% 50%, 50% 50%",
          }}
        >
          <div
            className="absolute h-full w-[300%] mix-blend-difference animate-nothern-lights"
            style={{
              backgroundImage:
                "repeating-linear-gradient(110deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 19%), repeating-linear-gradient(110deg, oklch(43.35% 0.1055 180.97) 10%, oklch(57.61% 0.2321 258.23) 15%, oklch(55.5% 0.2186 306.12) 20%, oklch(63.52% 0.2346 1.01) 25%, oklch(81.87% 0.1969 76.46) 30%)",
              backgroundSize: "100%, 100%",
              backgroundPosition: "50% 50%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
