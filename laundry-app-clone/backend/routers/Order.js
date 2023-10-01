require("dotenv").config();
const dbUrl = process.env.DB_CONNECTION_STRING;
const express = require("express");
const bodyParser = require("body-parser");

// Mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(dbUrl);
const Order = require("../models/Order");

// Create router
const orderRouter = express.Router();

orderRouter.use(bodyParser.json());

// Configure routes
orderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res, next) => {
    const status = req.query.status;
    const orderId = req.query.id;
    const soId = req.query.soId;
    console.log("GET Order");
    console.log(status);
    console.log(soId);

    if (status != undefined) {
      // FILTER ORDERS BY STATUS
      // input: status (condition: deleted: false)
      // output: orders list
      console.log("Filtering by Status: ");
      console.log(status);

      Order.find({ deleted: false, status: status })
        .then((orders) => {
          if (orders) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(orders);
          } else {
            res
              .status(404)
              .json({ error: "No orders found with the given status" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        });
    } else {
      if (orderId != undefined) {
        // GET ORDER DETAIL BY orderID
        // input: orderId (condition: deleted: false)
        // output: order detail json object

        Order.findOne({ _id: orderId, deleted: false })
          .then((order) => {
            if (order) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(order);
            } else {
              res.status(404).json({ error: "Order not found" });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          });
      } else {
        // GET LIST OF ORDERS IN THE SYSTEM
        // input: -- (condition: deleted: false)
        // output: orders list

        Order.find({ deleted: false }).then((order) => {
          if (order) {
            //order exist
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order);
          } else {
            res.status(404).json({ error: "Order not found" });
          }
        });
      }
    }
  })

  // EDIT ORDER DETAIL BY orderID
  // input: orderId, new order detail (condition: deleted: false)
  // output: order detail json object
  .put((req, res, next) => {
    const orderorderId = req.query.orderId;
    const newOrderDetail = req.body;
    console.log("PUT Order");
    console.log(orderorderId);

    Order.findOneAndUpdate(
      { _orderId: orderorderId, deleted: false },
      { $set: newOrderDetail },
      { new: true }
    )
      .then((order) => {
        if (order) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        } else {
          res.status(404).json({ error: "Order not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  })

  // CHANGE AN ORDER STATUS BY orderID
  // input: orderId, new status (condition: deleted: false)
  // output: order detail json object
  .patch((req, res, next) => {
    const orderorderId = req.query.orderId;
    const newStatus = req.body.status;

    Order.findOneAndUpdate(
      { _orderId: orderorderId, deleted: false },
      { $set: { status: newStatus } },
      { new: true }
    )
      .then((order) => {
        if (order) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        } else {
          res.status(404).json({ error: "Order not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  })

  // DELETE ORDER BY orderID
  // input: orderId
  // output: order detail json object
  .delete((req, res, next) => {
    const orderorderId = req.query.orderId;

    Order.findOneAndUpdate(
      { _orderId: orderorderId, deleted: false },
      { $set: { deleted: true } },
      { new: true }
    )
      .then((order) => {
        if (order) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        } else {
          res.status(404).json({ error: "Order not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });

module.exports = orderRouter;
