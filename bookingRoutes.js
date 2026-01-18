const db = require("./db");
const { v4: uuid } = require("uuid");

function isConflict(turfId, start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return db.bookings.some(b => {
    if (b.turfId !== turfId) return false;
    if (b.status !== "CONFIRMED") return false;

    const bStart = new Date(b.start);
    const bEnd = new Date(b.end);

    // Check if times overlap
    return startDate < bEnd && endDate > bStart;
  });
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
    status: "CONFIRMED"  // Must set status!
  };

  db.bookings.push(booking);
  return booking;
}

module.exports = { createBooking };
