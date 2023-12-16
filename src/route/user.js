import express from "express";
import userController from "../controller/userController";
let router = express.Router();


const initUserRoute = (app) => {
  router.get("/users", userController.getAllUser);
  router.post("/create-user", userController.createNewUser);
  router.patch("/update-user", userController.updateUser);
  router.delete("/delete-user/:id", userController.deleteUser);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initUserRoute;
