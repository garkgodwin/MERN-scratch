import ReactDOMServer from "react-dom/server";

import { fetchProject, fetchProjects } from "../api-client";

import App from "../components/app";

const serverRender = async (req) => {
  const { projectId } = req.params;

  const initialData = projectId
    ? {
        currentProject: await fetchProject(projectId),
      }
    : {
        projects: await fetchProjects(),
      };

  const initialMarkup = ReactDOMServer.renderToString(
    <App initialData={initialData} />,
  );

  return { initialMarkup, initialData };
};
export default serverRender;
