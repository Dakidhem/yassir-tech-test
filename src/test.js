import chai from "chai";
import chaiHttp from "chai-http";
import app from "./app.js";
import Employee from "./models/employee.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Employee Controllers", () => {
  before(function () {
    // Set a longer timeout for this hook
    this.timeout(5000); // Adjust the timeout as needed

    return new Promise(async (resolve, reject) => {
      try {
        // Check if an employee with the given ID exists and potentially delete it
        const existingEmployee = await Employee.findOne({
          id: "MehdiKadiri188",
        });

        if (existingEmployee) {
          // Employee with the ID exists, delete it
          await Employee.deleteOne({ id: "MehdiKadiri188" });
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
  it("should create an employee", (done) => {
    const newEmployee = {
      id: "MehdiKadiri188",
      lastName: "Mehdi",
      firstName: "Kadiri",
      department: "IT",
    };

    chai
      .request(app)
      .post("/api/employees")
      .send(newEmployee)
      .end((err, res) => {
        try {
          // Check for errors in the response
          if (err) throw err;

          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          done();
        } catch (error) {
          // Handle any errors and log them
          console.error(error);
          done(error); // Pass the error to Mocha to indicate test failure
        }
      });
  }).timeout(10000);

  it("should get all employees", (done) => {
    chai
      .request(app)
      .get("/api/employees")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should get employees by date", (done) => {
    const date = "2023-11-02"; // Replace with a valid date
    chai
      .request(app)
      .get(`/api/employees/${date}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("Time Controllers", () => {
  it("should check in", (done) => {
    const checkInPayload = {
      employeeId: "MehdiKadiri188",
      comment: "Checked in",
    };

    chai
      .request(app)
      .post("/api/times/check-in")
      .send(checkInPayload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("checkIn");
        done();
      });
  });
  it("should handle checking in an already checked-in employee", (done) => {
    const checkInData = {
      employeeId: "MehdiKadiri188",
      comment: "Another Checked in",
    };

    chai
      .request(app)
      .post("/api/times/check-in")
      .send(checkInData)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property(
          "message",
          "You have already checked in today"
        );
        done();
      });
  });

  it("should check out", (done) => {
    const checkOutPayload = {
      employeeId: "MehdiKadiri188",
      comment: "Check out",
    };

    chai
      .request(app)
      .post("/api/times/check-out")
      .send(checkOutPayload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("time");
        done();
      });
  });
  it("should handle checking out an employee that has not checked in", (done) => {
    const checkOutData = {
      employeeId: "nonexistent-id",
      comment: "Attempt to check out",
    };

    chai
      .request(app)
      .post("/api/times/check-out")
      .send(checkOutData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property(
          "message",
          "You have to check in first"
        );
        done();
      });
  });
});
