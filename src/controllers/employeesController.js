import Employee from "../models/employee.js";

const createEmployee = async (req, res, next) => {
  try {
    const { body: payload } = req;
    payload.dateCreated = new Date();

    const employee = await new Employee(payload).save();
    return res.status(200).send(employee);
  } catch (err) {
    return next(err);
  }
};

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    return res.status(200).send(employees);
  } catch (err) {
    return next(err);
  }
};

const getEmployeeByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const employees = await Employee.find({
      dateCreated: {
        $gte: `${date}T00:00:00.000Z`,
        $lt: `${date}T23:59:59.999Z`,
      },
    });
    return res.status(200).send(employees);
  } catch (error) {
    return next(error);
  }
};

export { createEmployee, getAllEmployees, getEmployeeByDate };
