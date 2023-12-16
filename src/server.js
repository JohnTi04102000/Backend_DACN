import express from "express";
import configViewEngine from "./configs/viewEngine";
import initRoomRoute from "./route/room";
import initScheduleRoute from "./route/schedule";
import initUserRoute from "./route/user";
import cors from 'cors'

require("dotenv").config();

const app = express();

//Config local
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// const port = process.env.PORT;


//Config server
app.use(cors());
const port = process.env.PORT;
const publicIPAddress = '103.98.160.26';

//Config body-parse to send data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Config view engine
configViewEngine(app);

//init web route
initRoomRoute(app);
initScheduleRoute(app);
initUserRoute(app);

//Config local
// app.listen(port, () => {
//   console.log("listening on port: " + port);
// });

//Config server
app.listen(port, publicIPAddress, () => {
  console.log("listening on port: " + port);
});
