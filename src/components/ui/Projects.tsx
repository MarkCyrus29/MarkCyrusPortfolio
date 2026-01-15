"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projects from "@/data/projects.json";

function Projects() {
  const PROJECTS_DATA = projects;
  const [filter, setFilter] = useState("all");

  const filteredProjects = Object.values(PROJECTS_DATA).filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  return (
    <main className="w-full h-full">
      <div className="flex gap-2 mb-8 w-full text-center justify-center items-center  ">
        {["all", "professional", "tool", "for fun"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`text-sm lowercase tracking-widest backdrop-blur-xl bg-dark/20 rounded-md px-4 py-2 shadow-md shadow-black/30   hover:bg-primary/90 transition-all ease-in-out cursor-pointer ${
              filter === cat ? " bg-primary/50! " : "text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className={
          "grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-2 w-full h-full"
        }
      >
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            className="py-4 border border-dark/40 bg-background/35 rounded-lg w-full h-full scale-97 hover:scale-100 transition-all"
          >
            <div className="relative w-full h-4/5 ">
              <Image
                fill
                src={project.img}
                alt={"Screenshot of " + project.title + "'s Landing Page"}
                className="object-contain absolute aspect-video p-1 "
              />
            </div>
            <div className="h-1/5 mt-1">
              <p>{project.title}</p>
              <Link
                href={`/${project.slug ? project.slug : "#"}`}
                className="text-blue-600! text-xs! hover:border-b hover:border-blue-600! transition-all "
              >
                {`View Details ->`}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Projects;
