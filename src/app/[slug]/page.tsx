import Aurora from "@/animations/Aurora";
import projects from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const PROJECTS_DATA = projects;

export const metadata: Metadata = {
  title: "Project | Mark Cyrus Serrano",
  description:
    "A collection of web development projects by Mark Cyrus Serrano, a fullstack web developer specializing in React, Next.js, and modern web technologies.",
  openGraph: {
    title: "Project | Mark Cyrus Serrano",
    description:
      "Explore web development projects built by Mark Cyrus Serrano using React, Next.js, and the MERN stack.",
    siteName: "Mark Cyrus Serrano Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projects by Mark Cyrus Serrano",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project | Mark Cyrus Serrano",
    description:
      "Portfolio projects by Mark Cyrus Serrano — fullstack web developer.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = Object.values(PROJECTS_DATA).find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <Aurora
        colorStops={["#5d275d", "#5d2741", "#5d275d"]}
        blend={1}
        amplitude={0.5}
        speed={1.5}
      />
      <main className="max-w-4xl w-full h-screen flex flex-col justify-center items-center mx-auto px-6">
        <div className="flex w-full justify-between mb-2">
          <Link
            href={"/#projects"}
            className="self-start transition-all duration-300 text-white/80 hover:text-white"
          >{`< Back`}</Link>
        </div>
        <div className="relative h-3/5 w-full aspect-video">
          <Image
            src={project.img || "/tech-icons/css.svg"}
            alt={"Screenshot of " + project.title + "'s Landing Page"}
            fill
            className="object-cover absolute p-1 "
          />
          <div className="aspect-video absolute bg-linear-to-b from-0% via-75% to-95% from-transparent via-transparent to-black/55 h-full w-full flex justify-center items-end p-4 bottom-1 ">
            <p className="z-10 shadow-2xl text-white text-base bg-black/40 px-2 py-1 rounded-md">
              {project.tech.join(" • ")}
            </p>
          </div>
          <div className="absolute top-0 right-0 h-full w-full flex justify-center items-start p-4">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className="absolute top-4 right-6 z-20 border-b-white hover:text-white shadow-2xl text-white/95 text-base bg-black/55 hover:bg-black/60 px-4 py-2 rounded-md "
              >
                Visit Project
              </Link>
            )}
          </div>
        </div>
        <h1 className="mt-4">{project.title}</h1>
        <p className="text-justify">{project.description}</p>
      </main>
    </>
  );
}
