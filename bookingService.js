const db = require("./db");
const { v4: uuid } = require("uuid");

function isConflict(turfId, start, end) {
  return db.bookings.some(b =>
    b.turfId === turfId &&
    b.status === "CONFIRMED" &&
    new Date(b.start) < new Date(end) &&
    new Date(b.end) > new Date(start)
  );
}

function createBooking(userId, turfId, start, end) {
  if (isConflict(turfId, start, end)) {
    throw new Error("Slot already booked");
  }

  const booking = {
    id: uuid(),
    userId,
    turfId,
    start,
    end,
    status: "CONFIRMED"
  };

  db.bookings.push(booking);
  return booking;
}

module.exports = { createBooking };
