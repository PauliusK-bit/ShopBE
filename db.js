const mongoose = require("mongoose");
const process = require("process");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB disconnected");
    process.exit(0);
  });
});
