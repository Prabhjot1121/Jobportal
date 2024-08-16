import express, { Router } from "express";
import isAuthenticated from "../middlewares/isauthenticated.js";
import { getAdminJobs, getAllJob, getJobsById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/getjob").get(isAuthenticated, getAllJob);
router.route("/getjob/:id").get(isAuthenticated, getJobsById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router;