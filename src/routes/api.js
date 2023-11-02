import express from "express";

import employeesRouter from "./employees.js";
import timesRouter from "./times.js";

const router = express.Router();

router.use("/employees", employeesRouter);
router.use("/times", timesRouter);

export default router;
