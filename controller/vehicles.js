import axios from "axios";

// function to retrieve all makes.
export const getAllMakes = (req, res, next) => {
  axios
    .get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
    .then((response) => {
      let allMakes = response.data.Results;
      let count = response.data.Count;
      let Make_Names = [];

      allMakes.forEach((item) => {
        Make_Names.push(item.Make_Name);
      });

      res.status(200).json({
        Count: count,
        Results: Make_Names,
      });
    })
    .catch((err) => {
      let status = err.response.status;
      let statusText = err.response.statusText;

      res.status(status).json({
        status: status,
        statusText: statusText,
      });
    });
};

//function to get all models based on make and year.
export const getAllModels = (req, res) => {
  const { make, year } = req.params;

  if (!isNaN(make) && isNaN(year)) {
    res.status(400).send("Invalid URL. Please ensure Make and Year are valid.");
  } else {
    axios
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${make}/modelyear/${year}?format=json`
      )
      .then((response) => {
        const { Count, SearchCriteria, Results } = response.data;

        //if no Models are returned
        if (Count === 0) {
          res.status(404).send({
            status: 404,
            Message: "Make or year is invalid",
          });
        } else {
          let allModels = [];

          Results.forEach((item) => {
            allModels.push(item.Model_Name);
          });

          res.status(200).json({
            Count: Count,
            Search_Criteria: SearchCriteria,
            Models: allModels,
          });
        }
      })
      .catch((err) => {
        //console.log(err);
        let status = err.response.status;
        let statusText = err.response.statusText;

        res.status(status).json({
          status: status,
          statusText: statusText,
        });
      });
  }
};

//function to get vehicle make,model and year based on VIN.
export const getVehicleDetails = (req, res) => {
  const { vin } = req.params;
  axios
    .get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
    )
    .then((response) => {
      const { Results } = response.data;

      let VIN = Results[0].VIN;
      let Year = Results[0].ModelYear;
      let Make = Results[0].Make;
      let Model = Results[0].Model;

      let vehicleInfo = VIN + " | " + Year + " | " + Make + " | " + Model;

      if (Year.length === 0) {
        res
          .status(400)
          .json(
            `${VIN} is an Invalid VIN !..Please serach again with a valid VIN`
          );
      } else {
        res.status(200).json({
          vehicleInfo,
        });
      }
    })
    .catch((err) => {
      //console.log(err);
      let status = err.response.status;
      let statusText = err.response.statusText;

      res.status(status).json({
        status: status,
        statusText: statusText,
      });
    });
};
