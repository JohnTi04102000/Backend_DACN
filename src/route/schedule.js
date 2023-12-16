import express from "express";
import scheduleController from "../controller/scheduleController";
let router = express.Router();


const initScheduleRoute = (app) => {
  router.get("/schedules", scheduleController.getAllSchedule);
  router.post("/create-schedule", scheduleController.createNewSchedule);
//   router.get("/get-company/:id", companyController.getCompanyById);
//   router.post("/create-company", companyController.createCompany);
  router.patch("/update-schedule", scheduleController.updateSchedule);
  router.delete("/delete-schedule/:id", scheduleController.deleteSchedule);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initScheduleRoute;
