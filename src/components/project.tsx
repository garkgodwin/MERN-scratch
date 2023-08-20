import React, { useState, useEffect } from "react";
import Header from "./header";
import { addTaskToProject, fetchProject } from "../api-client";

const Project = ({ initialProject, onProjectListClick }) => {
  const [project, setProject] = useState(initialProject);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    console.log(project);
    // conditional fetch
    if (!project.name) {
      fetchProject(project._id).then((project) => {
        setProject(project);
      });
    }
  }, [project._id, project.name]);

  const handleClickProjectList = (e) => {
    e.preventDefault();
    onProjectListClick();
  };

  //ref?
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = project._id;
    const newTask = e.target.newTask.value;
    const resp = await addTaskToProject(id, newTask);
    setProject(resp);
  };
  return (
    <>
      <Header title={project.name} />
      <div className="Project">
        <div className="title">Summary</div>
        <div className="summary">{project.summary}</div>
        <div className="tasks">
          <div className="title">Project tasks</div>
          <div className="body">
            {project.tasks?.length > 0 ? (
              <div className="list">
                {project.tasks.map((task, index) => (
                  <div className="item" key={index}>
                    {task}
                  </div>
                ))}
              </div>
            ) : (
              <div>No tasks yet</div>
            )}
          </div>
        </div>
        <div className="task-form">
          <div className="title">Create a task</div>
          <div className="body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="newTask"
                placeholder="New name here..."
                value={newTask}
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <a
          href="/"
          className="link"
          onClick={handleClickProjectList}
        >
          Go back to project list
        </a>
      </div>
    </>
  );
};

export default Project;
