"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projects from "@/data/projects.json";

function Projects() {
  const PROJECTS_DATA = projects;
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = Object.values(PROJECTS_DATA).filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  // Limits mobile view to 3, but shows all on desktop automatically
  // We check window width to ensure desktop isn't truncated by default
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const visibleProjects =
    isMobile && !showAll ? filteredProjects.slice(0, 3) : filteredProjects;
  const hasMore = filteredProjects.length > 3;

  return (
    <main className="w-full h-full">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 w-full justify-center items-center">
        {["all", "professional", "tool", "for fun"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setFilter(cat);
              setShowAll(false);
            }}
            className={`text-[10px] md:text-xs uppercase tracking-[0.2em] backdrop-blur-xl bg-dark/20 rounded-md px-4 py-2 transition-all duration-300 border border-white/5 cursor-pointer ${
              filter === cat
                ? "bg-white text-black"
                : "text-white/60 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid: Changed to auto-rows for dynamic height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full items-start">
        {visibleProjects.map((project) => (
          <Link
            href={`/${project.slug ? project.slug : "#"}`}
            key={project.title}
            className="group relative block w-full h-auto overflow-hidden rounded-lg bg-zinc-900/50 transition-all duration-500"
          >
            <div className="relative w-full p-4 md:p-2 transition-transform duration-500 ease-out group-hover:scale-105">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-auto object-contain rounded-sm"
              />
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-md transition-all duration-300 ease-in-out group-hover:opacity-100">
              <div className="translate-y-3 transition-transform duration-300 ease-out group-hover:translate-y-0 text-center px-6">
                <p className="text-white text-sm md:text-base font-bold tracking-tight uppercase">
                  {project.title}
                </p>
                <div className="h-px w-8 group-hover:w-16 bg-blue-500 mx-auto mt-2 transition-all duration-500" />
                <p className="text-blue-400 text-[10px] mt-3 font-medium tracking-widest">
                  VIEW DETAILS
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button - Only shows if mobile and items > 3 */}
      {!showAll && hasMore && (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-4 rounded-lg bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.3em] text-white hover:bg-white/10 transition-all active:scale-95"
          >
            Show More Projects
          </button>
        </div>
      )}
    </main>
  );
}

export default Projects;
