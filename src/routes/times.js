import express from "express";

import { checkIn, checkOut } from "../controllers/timesController.js";

const router = express.Router();

router.route("/check-in").post(checkIn);

router.route("/check-out").post(checkOut);

export default router;
