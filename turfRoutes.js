const express = require("express");
const { createBooking } = require("../bookingService");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const booking = createBooking(
      req.user.id,
      req.body.turfId,
      req.body.start,
      req.body.end
    );
    res.json(booking);
  } catch (e) {
    res.status(409).json({ error: e.message });
  }
});

router.delete("/:id", (req, res) => {
  const booking = db.bookings.find(b => b.id === req.params.id);
  booking.status = "CANCELLED";
  res.json({ message: "Booking cancelled" });
});

module.exports = router;
