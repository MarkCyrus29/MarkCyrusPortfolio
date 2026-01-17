import Link from "next/link";
import Aurora from "@/animations/Aurora";
import FadeContent from "@/animations/FadeContent";

export default function NotFound() {
  return (
    <>
      <Aurora
        colorStops={["#5d275d", "#5d2741", "#5d275d"]}
        blend={1}
        amplitude={0.5}
        speed={1.5} 
      />

      <main className="h-screen w-full flex items-center justify-center px-4">
        <FadeContent blur duration={800} easing="ease-out" initialOpacity={0}>
          <div className="max-w-lg text-center backdrop-blur-xl bg-black/30 rounded-xl p-8 shadow-2xl shadow-black/40">
            <p className="text-sm uppercase tracking-widest text-white/60 mb-2">
              404 error
            </p>

            <h2 className="mb-3">Page not found</h2>

            <p className="text-white/80 mb-6">
              {`The page you're looking for doesn't exist, was moved, or never
              should've existed in the first place.`}
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-white/90 hover:bg-white text-black px-6 py-3 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Go back home
            </Link>
          </div>
        </FadeContent>
      </main>
    </>
  );
}
