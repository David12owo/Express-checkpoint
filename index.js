import express from "express";
const app = express();
const port = 3000;
import fs from "fs";
app.use(express.static("public"));

// Route example to make sure the server is running
app.get("/", (req, res) => {
  res.send("<h1>Hello There</h1>");
});

// Middleware function
function timeAndDayMiddleware(req, res, next) {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();

  // Time and Day instructions given
  const workingDays = [1, 2, 3, 4, 5]; // Monday to Friday
  const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM to 5 PM

  // Opening time
  const startTime = new Date();
  // Closing time
  const endTime = new Date();

  if (
    workingDays.includes(currentDay) &&
    workingHours.includes(currentTime.getHours())
  ) {
    // next();
  } else {
    res.status(403).json({ error: "Not available during non-working hours" });
  }
  console.log("Time verification middleware is running");
}
timeAndDayMiddleware();

// Home page route
app.get("/home", (req, res) => {
  fs.readFile("public/home.html", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      return res
        .status(555)
        .send("<h1>Available only during working hours</h1> <p>Try again</p>");
    }
    return res.status(200).send(data);
  });
});

// Services page route
app.get("/services", (req, res) => {
  fs.readFile("public/our_services.html", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      return res
        .status(555)
        .send("<h1>Available only during working hours</h1> <p>Try again</p>");
    }
    return res.status(200).send(data);
  });
});

// Contact page route
app.get("/contact", (req, res) => {
  fs.readFile("public/contact_us.html", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      return res
        .status(555)
        .send("<h1>Available only during working hours</h1> <p>Try again</p>");
    }
    return res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log("server is running on port:3000");
});
