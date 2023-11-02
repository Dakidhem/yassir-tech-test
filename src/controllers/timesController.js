import dayjs from "dayjs";
import Time from "../models/time.js";

const checkIn = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const employeeId = payload.employeeId;
    const currentDate = dayjs(new Date()).format("YYYY-MM-DD");

    // Check if a time entry already exists for the current day
    const existingTime = await Time.findOne({
      employeeId: employeeId,
      checkIn: {
        $gte: `${currentDate}T00:00:00.000Z`,
        $lt: `${currentDate}T23:59:59.999Z`,
      },
    });

    if (!existingTime) {
      // If no entry exists, create a new time entry and save it
      payload.checkIn = new Date();
      const newTime = new Time(payload);
      await newTime.save();

      // Send the new time entry as a response
      return res.status(200).json(newTime);
    } else {
      return res.status(403).json({
        message: "You have already checked in today",
      });
    }
  } catch (error) {
    return next(error);
  }
};
const checkOut = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const { employeeId } = payload;
    const currentDate = dayjs(new Date()).format("YYYY-MM-DD");

    // Check if a check-in entry exists for the current day
    const existingTime = await Time.findOne({
      employeeId,
      checkIn: {
        $gte: `${currentDate}T00:00:00.000Z`,
        $lt: `${currentDate}T23:59:59.999Z`,
      },
    });

    if (!existingTime) {
      return res.status(404).json({
        message: "You have to check in first",
      });
    }

    // Update the existing time entry with check-out time and calculate the time difference
    existingTime.checkOut = new Date();
    existingTime.time = dayjs(new Date()).diff(
      new Date(existingTime.checkIn),
      "hour",
      true
    );

    // Save the updated time entry and return it as a response
    const result = await existingTime.save();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export { checkIn, checkOut };
