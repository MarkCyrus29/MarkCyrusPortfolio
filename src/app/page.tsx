import HeroImage from "@/components/ui/HeroImage";
import TechStack from "@/components/ui/TechStack";
import Aurora from "@/animations/Aurora";
import FadeContent from "@/animations/FadeContent";
import Projects from "@/components/ui/Projects";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import SocialsList from "@/components/ui/SocialsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mark Cyrus Serrano | Fullstack Web Developer",
    template: "%s | Mark Cyrus Serrano",
  },
  description:
    "Mark Cyrus Serrano is a 19-year-old fullstack web developer based in the Philippines, specializing in modern websites using React, Next.js, and the MERN stack. View projects, tech stack, and contact details.",
  keywords: [
    "Mark Cyrus Serrano",
    "Fullstack Web Developer",
    "Web Developer Philippines",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "JavaScript Developer",
    "Portfolio Website",
  ],
  authors: [{ name: "Mark Cyrus Serrano" }],
  creator: "Mark Cyrus Serrano",
  metadataBase: new URL("https://markcyruss.com"),
  alternates: {
    canonical: "https://markcyruss.com",
  },

  openGraph: {
    title: "Mark Cyrus Serrano | Fullstack Web Developer",
    description:
      "Portfolio of Mark Cyrus Serrano, a fullstack web developer creating modern, high-performance websites using React, Next.js, and Node.js.",
    url: "https://markcyruss.com",
    siteName: "Mark Cyrus Serrano Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mark Cyrus Serrano – Fullstack Web Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mark Cyrus Serrano | Fullstack Web Developer",
    description:
      "Fullstack web developer specializing in React, Next.js, and modern web technologies. View projects and get in touch.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function Home() {
  return (
    <>
      <Aurora
        colorStops={["#5d275d", "#5d2741", "#5d275d"]}
        blend={1}
        amplitude={0.5}
        speed={1.5}
      />
      <main
        id="home"
        className="max-w-4xl w-full h-full flex flex-col mx-auto px-2 sm:px-6! md:px-0!"
      >
        <FadeContent
          className="mt-2 md:mt-10 fixed z-50 max-w-4xl mx-auto w-full flex justify-center md:justify-start items-center px-2 md:px-0"
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
          delay={500}
        >
          <header className="flex gap-3 text-sm lowercase tracking-widest backdrop-blur-xl bg-dark/20 rounded-md px-4 py-2 shadow-md shadow-black/30  ">
            {["home", "services", "projects", "contact"].map((item) => (
              <span className="opacity-80 hover:opacity-100" key={item}>
                <Link href={`/#${item}`}>{item}</Link>
              </span>
            ))}
          </header>
        </FadeContent>
        <HeroSection />
        <ServicesSection />
        <WhatSection />
        <ContactSection />
      </main>
    </>
  );
}

function HeroSection() {
  return (
    <FadeContent
      className="flex flex-col h-screen py-12 w-full items-center justify-center  "
      blur={true}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
      delay={500}
    >
      <div className="flex md:flex-row flex-col gap-12 items-center justify-center h-4/5 ">
        <div className="md:hidden w-1/2 ">
          <HeroImage />
        </div>
        <div className="w-1/2 ">
          <h1 className="mb-4">Hi! I'm Cyrus </h1>
          <h4 className="mb-3">19yo Fullstack Web Developer</h4>
          <p>Based in the Philippines</p>

          <p className="text-sm! md:text-base!">
            For QNA, chat with me{" "}
            <a
              className="text-blue-400 hover:text-blue-300"
              href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#104;&#105;&#64;&#109;&#97;&#114;&#107;&#99;&#121;&#114;&#117;&#115;&#115;&#46;&#99;&#111;&#109;"
            >
              here
            </a>
          </p>
          <SocialsList />
        </div>

        <div className="w-1/2 hidden md:block ">
          <HeroImage />
        </div>
      </div>
      <TechStack />
    </FadeContent>
  );
}

function WhatSection() {
  return (
    <FadeContent
      className="relative flex flex-col items-center justify-start min-h-screen  w-full "
      blur={true}
      duration={700}
      easing="ease-out"
      initialOpacity={0}
      delay={500}
    >
      <section id="projects" className="text-center h-full w-full py-12">
        <h1>What i do:</h1>
        <p>I make websites!</p>
        <div className="mt-6  w-full">
          <Projects />
        </div>
      </section>
    </FadeContent>
  );
}

function ContactSection() {
  return (
    <FadeContent
      className="flex flex-col items-center justify-center h-screen w-full "
      blur={true}
      duration={700}
      easing="ease-out"
      initialOpacity={0}
      delay={500}
    >
      <section
        id="contact"
        className="text-center h-full w-full flex flex-col items-center justify-center"
      >
        <h1>Chat with Me!</h1>
        <p>Send me a message using this form.</p>
        <p className="text-xs! color-white/80 ">{`(Or use my socials)`}</p>
        <ContactForm />
      </section>
      <footer className="w-full mb-2 flex justify-between items-center px-4">
        <p className="text-xs text-white/50 mt-4">
          2026{" "}
          <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#104;&#105;&#64;&#109;&#97;&#114;&#107;&#99;&#121;&#114;&#117;&#115;&#115;&#46;&#99;&#111;&#109;">
            Mark Cyrus Serrano
          </a>
        </p>
        <SocialsList />
      </footer>
    </FadeContent>
  );
}
function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive, modern websites using React, Next.js, and the MERN stack.",
    },
    {
      title: "CMS",
      description:
        "Custom content management solutions for easy blogs updates and content control.",
    },
    {
      title: "Hosting",
      description:
        "Reliable hosting setups to keep your website live and fast.",
    },
    {
      title: "Maintenance",
      description:
        "Ongoing support and updates to keep your website secure and up-to-date.",
    },
  ];

  return (
    <FadeContent
      className="flex flex-col items-center justify-center w-full h-screen px-4"
      blur={true}
      duration={700}
      easing="ease-out"
      initialOpacity={0}
      delay={500}
    >
      <section id="services" className="max-w-4xl w-full text-center py-24">
        <h1>Services I Offer:</h1>
        <p className="mb-12">
          I help businesses and individuals bring their online presence to life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-lg shadow-lg bg-dark/30 hover:bg-dark/40 transition-colors duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </FadeContent>
  );
}
