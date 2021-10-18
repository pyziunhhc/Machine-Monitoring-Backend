/*DODAWANIE PAKIETOW*/
import dotenv from "dotenv";
const __dirname = path.resolve();
dotenv.config({
  path: `${__dirname}\\.env`,
});

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import fs from "fs";
import compression from "compression";
import http from "http";
import session from "express-session";
import helmet from "helmet";
import cors from "cors";
import passport from "./config/passport.mjs";
import removeLoggedUsers from "./tasks/background-scripts/removeLoggedUsers.mjs";
import { runReportMailer } from "./tasks/background-scripts/sendEmails.mjs";

/*TRASY */
import authRouter from "./components/auth/AuthRoutes.mjs";
import usersRouter from "./components/users/UsersRoutes.mjs";
import dashboardRouter from "./components/dashboard/DashboardRoutes.mjs";
import machinesRouter from "./components/machines/MachinesRoutes.mjs";
import settingsRouter from "./components/menu/MenuRoutes.mjs";
// import reportsRouter from './components/reports/ReportsRoutes.mjs';
import dataRouter from "./components/data/DataRoutes.mjs";
import statsRouter from "./components/statistics/UserStatisticsRoutes.mjs";
import tasksRouter from "./components/tasks/TasksRoutes.mjs";
import notificationRouter from "./components/notifications/NotificationsRoutes.mjs";
import permissionsRouter from "./components/permissions/PermissionsRoutes.mjs";
import settingRouter from "./components/settings/SettingsRoutes.mjs";
import senderRouter from "./components/sender/SenderRoutes.mjs";
const app = express();
const server = http.createServer(app);

/*LACZENIE Z BAZA*/
mongoose
  .connect("mongodb://localhost:27017/monitoring", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then()
  .catch((error) => console.log(error));
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

app.set("trust proxy", 1);
//config passport

// passport()

/*LADOWANIE ZALEZNOSCI */

const corsOption = {
  origin: (origin, callback) => {
    callback(null, origin);
  },
  credentials: true,
};

app.use(helmet());
app.use(compression());
app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(
      path.join(
        `${__dirname}/logs`,
        `access${new Date().toLocaleDateString()}.log`
      ),
      {
        flags: "a",
      }
    ),
  })
);
app.use(cookieParser());
app.use(
  express.json({
    //problem z payloadem był przez użycie bodyParser.json
    limit: 52428800,
    extended: true,
    parameterLimit: 52428800,
  })
);
app.use(
  express.urlencoded({
    limit: 52428800,
    extended: true,
    parameterLimit: 52428800,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
removeLoggedUsers();
const api = process.env.API_URI;
// app.use(`${api}/`, AuthController.check)
app.use(`${api}/auth`, authRouter);
app.use(`${api}/data`, dataRouter);
app.use(`${api}/dashboard`, dashboardRouter);
app.use(`${api}/settings`, settingsRouter);
// app.use(`${api}/reports`, reportsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/machines`, machinesRouter);
app.use(`${api}/stats`, statsRouter);
app.use(`${api}/tasks`, tasksRouter);
app.use(`${api}/notification`, notificationRouter);
app.use(`${api}/permissions`, permissionsRouter);
app.use(`${api}/settings`, settingRouter);
app.use(`${api}/sender`, senderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("--------------------ERROR--------------------");
  console.log(err.message, err.status, req.path, req.query, req.params);
  console.log("--------------------ERROR--------------------");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  if (err.message) {
    switch (err.message) {
      case "Password or username is incorrect":
        res.status(403).send({
          success: false,
          message: ["Niepoprawny login lub hasło"],
        });
    }
  }
});
passport();

runReportMailer();
export { app, server };
