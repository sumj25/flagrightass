import express from "express";
import { startCronJob, stopCronJob } from "../controllers/cronController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const cronRoutes = express.Router();

cronRoutes.post("/scheduler/start", authenticateToken, (req, res) => {
    startCronJob();
    res.json({ message: "CRON job started" });
});
  
cronRoutes.post("/scheduler/stop", authenticateToken, (req, res) => {
    stopCronJob();
    res.json({ message: "CRON job stopped" });
});

export default cronRoutes;
