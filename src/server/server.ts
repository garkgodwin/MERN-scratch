import express from "express";
import os from "node:os";

import { PORT, HOST, SERVER_URL } from "./config";

import { connectClient } from "./db";

import apiRouter from "./api-router";
import serverRender from "./render";

const server = express();

server.use(express.static("dist"));

server.set("view engine", "ejs");

server.use("/api", apiRouter);

//For server to render on start of website depending on the current path
server.get(["/", "/projects/:projectId"], async (req, res) => {
  const { initialMarkup, initialData } = await serverRender(req);
  res.render("index.ejs", {
    initialMarkup,
    initialData,
  });
});

server.listen(PORT, HOST, () => {
  console.info(
    `Express server is listening at ${SERVER_URL}`,
    `\nFreemem is ${os.freemem() / 1024 / 1024}`,
  );
  connectClient();
});
