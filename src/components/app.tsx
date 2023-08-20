import { useState, useEffect } from "react";
import ProjectsList from "./projects-list";
import Project from "./project";

const App = ({ initialData }) => {
  const [page, setPage] = useState<"projectlist" | "project">(
    initialData.currentProject ? "project" : "projectlist",
  );
  const [currentProject, setCurrentProject] = useState<
    object | undefined
  >(initialData.currentProject);

  useEffect(() => {
    // back and forward click handler
    window.onpopstate = (event) => {
      console.log(event);
      const newPage = event.state?.projectId
        ? "project"
        : "projectlist";

      setPage(newPage);
      setCurrentProject({ _id: event.state?.projectId });
    };
  }, []);

  const navigateToProject = (projectId) => {
    window.history.pushState(
      { projectId },
      "",
      `/projects/${projectId}`,
    );
    setPage("project");
    setCurrentProject({ _id: projectId });
  };

  const navigateToProjectList = () => {
    window.history.pushState({}, "", "/");
    setPage("projectlist");
    setCurrentProject(undefined);
  };
  const pageContent = () => {
    switch (page) {
      case "projectlist":
        return (
          <ProjectsList
            initialProjects={initialData.projects}
            onProjectClick={navigateToProject}
          />
        );
      case "project":
        return (
          <Project
            initialProject={currentProject}
            onProjectListClick={navigateToProjectList}
          />
        );
      default:
        break;
    }
  };

  return <div className="container">{pageContent()}</div>;
};

export default App;
