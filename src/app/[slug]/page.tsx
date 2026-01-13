import Aurora from "@/animations/Aurora";
import projects from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
const PROJECTS_DATA = projects;

interface Project {
  slug: string;
  title: string;
  category: string;
  link: string | null;
}

export default async function ProjectDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = Object.values(PROJECTS_DATA).find((p) => p.slug === slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
      <Aurora
        colorStops={["#5d275d", "#5d2741", "#5d275d"]}
        blend={1}
        amplitude={0.5}
        speed={1.5}
      />
      <main className="max-w-4xl w-full h-screen flex flex-col justify-center items-center mx-auto">
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
            className="object-contain absolute p-1 "
          />
          <div className="absolute bottom-0 bg-linear-to-b from-0% to-95% from-transparent to-black/25 h-full w-full flex justify-center items-end p-4">
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
