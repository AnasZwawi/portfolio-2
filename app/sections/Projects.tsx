"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleCheck, Dot, MoveUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Project {
  name: string;
  id: number;
  title: string;
  creation_year: number;
  features: string[];
  image_url: string;
  project_url: string;
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Fetch the data from the external JSON file
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data.projects))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
  return (
    <div
      id="projects"
      className="w-[93%] mx-auto md:max-w-[950px] my-[2rem] py-[6rem]"
    >
      <div className="max-w-[400px] mx-auto mb-[4rem]">
        <div className="rounded-lg bg-black uppercase text-white text-sm w-fit mx-auto px-3 py-1">
          real-world projects
        </div>
        <h1 className="text-[28px] md:text-[35px] uppercase font-black text-center mt-2 mb-1">
          Featured Projects
        </h1>
        <p className="font-medium text-center">
          See how I transformed concepts into engaging digital experiences.
        </p>
      </div>
      <div className="flex flex-col gap-[4rem]">
        {projects.map((project, projectIndex) => (
          <div
            key={project.id}
            className="border border-black/20 ring-2 ring-black/80 rounded-lg sticky bg-white"
            style={{
              top: `calc(74px + ${projectIndex * 20}px`,
            }}
          >
            <div className="relative flex flex-col md:flex-row overflow-hidden">
              <div className="p-6 md:p-10 pb-0 md:pb-10">
                <h2 className="uppercase font-semibold flex items-center">
                  {project.name}
                  <Dot />
                  {project.creation_year}
                </h2>
                <h2 className="text-2xl font-bold mb-2 uppercase">
                  {project.title}
                </h2>
                <Separator className="mt-3 mb-4 bg-black" />
                <ul className="font-medium md:pl-5">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CircleCheck className="w-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={project.project_url} target="_">
                  <Button className="mt-5 text-[15px] px-5 py-[22px] rounded-lg">
                    View Live Site <MoveUpRight />
                  </Button>
                </Link>
              </div>
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-auto md:w-[350px] object-cover max-h-[300px] relative -bottom-8 md:absolute md:right-0 md:bottom-0 rounded-t-3xl md:rounded-tr-none ring-2 ring-black/70 shadow-2xl"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
