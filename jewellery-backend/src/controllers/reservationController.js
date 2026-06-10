import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      reservation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};