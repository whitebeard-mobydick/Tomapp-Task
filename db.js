// db.js - simple in-memory database
const db = {
  turfs: [],      // store turf objects
  bookings: [],   // store booking objects
  users: [
    { id: "admin1", email: "admin@turf.com", role: "admin" },
    { id: "user1", email: "user@turf.com", role: "user" }
  ]
};

module.exports = db;
