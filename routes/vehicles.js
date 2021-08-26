import express from "express";
import {
  getAllMakes,
  getAllModels,
  getVehicleDetails,
} from "../controller/vehicles.js";

const router = express.Router();

//route to get all makes.
router.get("/GetAllMakes", getAllMakes);

//route to get vehicle models based on make and year.
router.get("/GetModelsForMakeYear/make/:make/modelyear/:year", getAllModels);

//route to get vehicle details based on VIN.
router.get("/DecodeVin/:vin", getVehicleDetails);

export default router;
