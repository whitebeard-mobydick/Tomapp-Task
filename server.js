const express = require("express");
const { authenticate } = require("./auth");

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/turfs", authenticate, require("./routes/turfRoutes"));
app.use("/bookings", authenticate, require("./routes/bookingRoutes"));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
