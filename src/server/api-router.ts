import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";

import { connectClient } from "./db";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/projects", async (req, res) => {
  const client = await connectClient();

  const projects = await client
    .collection("projects")
    .find()
    .project({
      _id: 1,
      name: 1,
      summary: 1,
      status: 1,
      tasks: 1,
    })
    .toArray();
  res.send(projects);
});

router.get("/projects/:projectId", async (req, res) => {
  const client = await connectClient();

  const project = await client
    .collection("projects")
    .findOne({ _id: new ObjectId(req.params.projectId) });
  res.send(project);
});

router.post("/projects/:projectId", async (req, res) => {
  const client = await connectClient();
  const { newTaskValue } = req.body;

  const doc = await client
    .collection("projects")
    .findOneAndUpdate(
      { _id: new ObjectId(req.params.projectId) },
      {
        $push: {
          // /\s/g, "-" --- replaces all space with "-"
          tasks: newTaskValue.toLowerCase().replace(/\s/g, "-"),
        },
      },
      { returnDocument: "after" },
    );

  // project = doc.value
  res.send(doc.value);
});
export default router;
