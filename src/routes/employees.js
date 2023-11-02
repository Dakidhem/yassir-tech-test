import express from "express";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeByDate,
} from "../controllers/employeesController.js";

const router = express.Router();

router.route("/").post(createEmployee).get(getAllEmployees);

router.route("/:date").get(getEmployeeByDate);

export default router;
