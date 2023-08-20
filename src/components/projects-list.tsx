import React from "react";
import { useEffect, useState } from "react";
import ProjectPreview from "./project-preview";
import Header from "./header";
import { fetchProjects } from "../api-client";

const ProjectsList = ({ initialProjects, onProjectClick }) => {
  const [projects, setProjects] = useState(
    initialProjects ?? [],
  );
  // debugger;
  useEffect(() => {
    if (!initialProjects) {
      fetchProjects().then((data) => {
        setProjects(data);
      });
    }
  }, [initialProjects]);
  return (
    <>
      <Header title="Projects" />
      <div className="Projects">
        {projects.map((data) => {
          return (
            <ProjectPreview
              key={data._id}
              listing={data}
              onClick={onProjectClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProjectsList;
