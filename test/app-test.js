import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.should();

chai.use(chaiHttp);

describe("Vehicles API", () => {
  // test for /GetAllMakes route
  describe("Get /GetAllMakes", () => {
    it("Should return all makes", (done) => {
      chai
        .request(app)
        .get("/vehicles/GetAllMakes")
        .end((err, response) => {
          response.should.have.status(200); //check response OK
          response.body.should.be.a("object"); //check if result is an object
          response.body.Results.length.should.be.eql(9778); //check length of results
          done();
        });
    });
  });

  // test for /GetAllMakes route - response is not 404
  describe("Get /GetAllMakes", () => {
    it("Should not have status : not found", (done) => {
      chai
        .request(app)
        .get("/vehicles/GetAllMakes")
        .end((err, response) => {
          response.should.not.have.status(404); //check response OK
          done();
        });
    });
  });

  //test for /GetModelsForMakeYear to check if it returns the correct list.
  describe("Get /GetModelsForMakeYear/make/:make/modelyear/:year", () => {
    it("Should return vehicle models for given make and year", (done) => {
      chai
        .request(app)
        .get("/vehicles/GetModelsForMakeYear/make/Mercedes/modelyear/2015")
        .end((err, response) => {
          response.should.have.status(200); //check response OK
          response.body.should.be.a("object");
          response.body.Models.length.should.be.eql(28);
          done();
        });
    });
  });

  //test if VIN return correct details
  describe("Get /DecodeVin", () => {
    it("Should return vehicle details for given VIN", (done) => {
      chai
        .request(app)
        .get("/vehicles/DecodeVin/1C6RR7LTXES360701")
        .end((err, response) => {
          response.should.have.status(200); //check response OK
          response.body.should.be.a("object");
          response.body.vehicleInfo.should.be.eql(
            "1C6RR7LTXES360701 | 2014 | RAM | 1500" //check response data
          );
          done();
        });
    });
  });

  //test if VIN return correct response for invalid VIN
  describe("Get /DecodeVin", () => {
    it("Should return error message for invalid VIN", (done) => {
      chai
        .request(app)
        .get("/vehicles/DecodeVin/hello")
        .end((err, response) => {
          response.should.have.status(400); //check response OK
          response.body.should.be.eql(
            "hello is an Invalid VIN !..Please serach again with a valid VIN"
          );
          done();
        });
    });
  });
});
