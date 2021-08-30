import express from "express";
import {
  getAllMakes,
  getAllModels,
  getVehicleDetails,
} from "../controller/vehicles.js";

import cache from "../routeCache.js";
const router = express.Router();

//route to get all makes.
router.get("/GetAllMakes", cache(300), getAllMakes);

//route to get vehicle models based on make and year.
router.get(
  "/GetModelsForMakeYear/make/:make/modelyear/:year",
  cache(300),
  getAllModels
);

//route to get vehicle details based on VIN.
router.get("/DecodeVin/:vin", cache(300), getVehicleDetails);

export default router;
