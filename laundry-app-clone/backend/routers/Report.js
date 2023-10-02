require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const winston = require("winston");

// Mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(dbUrl);
const Report = require("../models/Report");
const Account = require("../models/Account");

// Validation schema for the report data
const reportSchema = Joi.object({
  guestId: Joi.string().required(),
  storeOwnerId: Joi.string().required(),
  content: Joi.string(),
  status: Joi.string().default("Pending"),
});

const checkGuestIdAndStoreOwnerId = async (guestId, storeOwnerId, res) => {
  const guest = await Account.findOne({ _id: guestId });
  const storeOwner = await Account.findOne({ _id: storeOwnerId });

  if (!guest || !storeOwner) {
    res.status(404).json({
      error: "Guest or store owner not found",
    });
  }
};

const createReport = async (reportData, res) => {
  try {
    await reportSchema.validateAsync(reportData);
    await checkGuestIdAndStoreOwnerId(
      reportData.guestId,
      reportData.storeOwnerId,
      res
    );
    const createdReport = await Report.create(reportData);
    res.status(201).json(createdReport);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Create router
const reportRouter = express.Router();
reportRouter.use(bodyParser.json());

// Configure routes
reportRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .post(async (req, res, next) => {
    // SEND REPORT TO A STORE
    // input: report data, store id, customer id
    // output: report

    try {
      const report = req.body;

      const reportCreated = await createReport(report, res);
      res.status(201).json(reportCreated);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  })

  .get(async (req, res, next) => {
    // VIEW REPORT
    // input: report id
    // output: report

    const id = req.query.id;
    if (id != undefined) {
      Report.findById(id)
        .then((report) => {
          if (report) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(report);
          } else {
            res
              .status(404)
              .json({ error: "No report found with the given id" });
          }
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    } else {
      // VIEW LIST OF REPORTS
      // input:
      // output: list of reports

      const reports = await Report.find()
        .then((reports) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(reports);
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    }
  })

  .delete(async (req, res, next) => {
    // UPDATE REPORT STATUS: REJECTED
    // input: report id
    // output: report

    const id = req.query.id;
    if (id != undefined) {
        Report.findById(id)
        .then((report) => {
          if (report) {
            report.status = "Rejected";
            report.save();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(report);
          } else {
            res
              .status(404)
              .json({ error: "No report found with the given id" });
          }
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    } else {
      res.status(400).json({ error: "No report id provided" });
    }
  })

  .patch(async (req, res, next) => {
    // UPDATE REPORT STATUS: APPROVED OR RESOLVED
    // input: report id
    // output: report

    const id = req.query.id;
    if (id != undefined) {
        Report.findById(id)
        .then((report) => {
          if (report) {
            report.status = "Resolved";
            report.save();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(report);
          } else {
            res
              .status(404)
              .json({ error: "No report found with the given id" });
          }
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    } else {
      res.status(400).json({ error: "No report id provided" });
    }
  });

module.exports = reportRouter;
