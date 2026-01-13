import Marquee from "react-fast-marquee";
import Image from "next/image";
const techStack = [
  // Core Web Fundamentals
  {
    name: "HTML5",
    icon: "html5.svg",
  },
  {
    name: "CSS",
    icon: "css.svg",
  },
  {
    name: "JavaScript",
    icon: "javascript.svg",
  },

  // Modern Frontend Frameworks & Styling
  {
    name: "TypeScript",
    icon: "typescript.svg",
  },
  {
    name: "React",
    icon: "react.svg",
  },
  {
    name: "Next.js",
    icon: "nextdotjs.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwindcss.svg",
  },
  {
    name: "shadcn/ui",
    icon: "shadcnui.svg",
  },
  {
    name: "Material UI",
    icon: "mui.svg",
  },

  // Backend / Data
  {
    name: "Node.js",
    icon: "nodedotjs.svg",
  },
  {
    name: "MongoDB",
    icon: "mongodb.svg",
  },
  {
    name: "Firebase",
    icon: "firebase.svg",
  },

  // Tooling & Build
  {
    name: "Vite",
    icon: "vite.svg",
  },
  {
    name: "Git",
    icon: "git.svg",
  },
  {
    name: "GSAP",
    icon: "greensock.svg",
  },
  {
    name: "Vercel",
    icon: "vercel.svg",
  },
  {
    name: "Sanity",
    icon: "sanity.svg",
  },
  {
    name: "Resend",
    icon: "resend.svg",
  },
  {
    name: "Cloudinary",
    icon: "cloudinary.svg",
  },
];

const TechStack = () => {
  return (
    <div className="w-full flex justify-center items-start">
      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_100px,black_calc(100%-100px),transparent_100%)]">
        <Marquee
          speed={125}
          autoFill={true}
          pauseOnHover={true}
          className="flex flex-row w-full p-1 "
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="relative flex items-center min-h-24 min-w-24 h-full bg-dark/30 shadow-dark/80  p-2 mx-2 rounded-xl group scale-90 hover:scale-100 transition-all"
            >
              <span className="absolute top-0 left-0 h-full w-full bg-linear-to-t from-black/10 to-gray/10 rounded-xl transition-opacity opacity-0 hover:opacity-100 xs:active:opacity-100 hover:shadow-dark/20 shadow-md"></span>
              <Image
                src={`/tech-icons/${tech.icon}`}
                alt={tech.name}
                fill
                className="absolute inset-0 object-contain p-4 pointer-events-none"
              />
              <span className="opacity-0 group-hover:opacity-100 xs:group-active:opacity-100 transition-opacity absolute bottom-0 truncate left-[50%] translate-x-[-50%] pointer-events-none">
                {tech.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TechStack;
