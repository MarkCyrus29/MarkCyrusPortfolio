"use client";
import { useEffect } from "react";
import gsap from "gsap";

const HeroImage = () => {
  useEffect(() => {
    const pixels = document.querySelectorAll(".pixel");

    gsap.to(pixels, {
      opacity: 0.2,
      backgroundColor: "#5d2741",
      duration: 0.7,
      stagger: {
        each: 0.3,
        from: "random",
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
      },
    });
  });

  return (
    <div className="max-w-full max-h-full xs:w-[80%] md:w-full grid grid-cols-16">
      {Array.from({ length: 14 }, (_, row) =>
        Array.from({ length: 16 }, (_, col) => {
          const x = col + 1;
          const y = row + 3;
          const coord = `${x}x${y}`;

          return (
            <span key={coord} className="pixel-container">
              <img
                loading="lazy"
                key={`pixel-${coord}`}
                className="pixel max-w-full max-h-full object-cover select-none "
                src={`/pixels/image${coord}.webp`}
                alt={`Pixel (${x},${y})`}
              />
            </span>
          );
        })
      )}
    </div>
  );
};

export default HeroImage;
