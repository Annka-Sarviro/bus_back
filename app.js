const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const cityRoute = require("./routes/cityRoute");
const busRoute = require("./routes/busRoute");
const routRoute = require("./routes/routRoute");
const journeyRoute = require("./routes/journeyRoute");
const ticketRoute = require("./routes/ticketRoute");
const userRoute = require("./routes/userRoute");
const variableRoute = require("./routes/variableRoute");
const staticPageRoute = require("./routes/staticPageRoute");
const contactRoute = require("./routes/contactRoute");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const FILE_LIMIT_SIZE = 9000000;

app.use(logger(formatsLogger));
app.use(cors());
app.use(
  cors({
    origin: "*", // Разрешить запросы с любых доменов
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Если вы работаете с cookies
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.use(
  bodyParser.json({
    limit: FILE_LIMIT_SIZE,
    parameterLimit: FILE_LIMIT_SIZE,
    type: "application/*+json",
  })
);
app.use(bodyParser.urlencoded({ limit: FILE_LIMIT_SIZE, extended: false }));

app.use("/city", cityRoute);
app.use("/bus", busRoute);
app.use("/rout", routRoute);
app.use("/journey", journeyRoute);
app.use("/ticket", ticketRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/variable", variableRoute);
app.use("/pages", staticPageRoute);
app.use("/contact", contactRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
