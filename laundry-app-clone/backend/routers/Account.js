require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const winston = require("winston");

// Mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(dbUrl);
const Account = require("../models/Account");

// Validation schema for the account data
const accountSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(30),
  email: Joi.string().min(3).max(30).required(),
  role: Joi.string().default("Guest"),
  pickAddress: Joi.string().min(3).max(30),
  backAddress: Joi.string().min(3).max(30),
});

const accountUPdateSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  password: Joi.string().min(3).max(30),
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(30),
  email: Joi.string().min(3).max(30),
  role: Joi.string(),
  pickAddress: Joi.string().min(3).max(30),
  backAddress: Joi.string().min(3).max(30),
});

// Create a function for account creation
async function createAccount(accountData) {
  try {
    await accountSchema.validateAsync(accountData);

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(accountData.password, saltRounds);

    // Create the account
    const createdAccount = await Account.create({
      username: accountData.username,
      email: accountData.email,
      password: hashedPassword,
      name: accountData.name,
      role: "Guest",
      phoneNumber: accountData.phoneNumber,
      pickAddress: accountData.pickAddress,
      backAddress: accountData.backAddress,
      deleted: false,
    });

    return createdAccount;
  } catch (error) {
    throw error;
  }
}

// Create router
const accountRouter = express.Router();
accountRouter.use(bodyParser.json());

// Configure routes
accountRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    // VIEW CUSTOMER ACCOUNT DETAIL
    // input: id
    // output: account

    const id = req.query.id;
    console.log("Getting Account: ");
    console.log(id);

    Account.findById(id)
      .then((account) => {
        if (account) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(account);
        } else {
          res.status(404).json({ error: "No account found with the given id" });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  })

  .post(async (req, res, next) => {
    // CREATE CUSTOMER ACCOUNT
    // input: account data
    // output: account

    try {
      const accountData = req.body;

      // Check if account data is missing
      if (!accountData) {
        return res.status(400).json({ error: "Account data is missing." });
      }

      // Create the account using the service function
      const createdAccount = await createAccount(accountData);

      res.status(201).json(createdAccount);
    } catch (error) {
      winston.error(`Error creating account: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  })

  .patch(async (req, res, next) => {
    try {
      const id = req.query.id;
      const updateOps = req.body;

      // Validate the request body
      const { error } = accountUPdateSchema.validate(updateOps);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Use the account service to update the account
      const filter = { _id: id };
      const updatedAccount = await Account.updateOne(filter, updateOps);

      if (!updatedAccount) {
        return res.status(404).json({ error: "Could not update account" });
      }

      res.status(200).json(updateOps);
    } catch (error) {
      winston.error(`Error updating account: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  })

  .delete(async (req, res, next) => {
    try {
      // Continue with the deletion
      const id = req.query.id;
      const deletedStatus = { deleted: true }
  
      const deletedAccount = await Account.findByIdAndUpdate(id, deletedStatus);
  
      if (!deletedAccount) {
        return res.status(404).json({ error: "Account not found" });
      }
  
      res.json({ message: "Account deleted successfully" });
    } catch (err) {
      winston.error(`Error deleting account: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  })

module.exports = accountRouter;
