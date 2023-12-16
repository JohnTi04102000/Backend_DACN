import express from "express";
import roomController from "../controller/roomController";
let router = express.Router();


const initRoomRoute = (app) => {
  router.get("/rooms", roomController.getAllRoom);
  router.post("/create-room", roomController.createNewRoom);
  router.patch("/update-room", roomController.updateRoom);
  router.delete("/delete-room/:id", roomController.deleteRoom);
//   router.get("/get-company/:id", companyController.getCompanyById);
//   router.post("/create-company", companyController.createCompany);
//   router.put("/update-company", companyController.updateCompany);
//   router.delete("/delete-company/:id", companyController.deleteCompany);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initRoomRoute;
