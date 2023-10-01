require("dotenv").config();
const mongoose = require("mongoose");

// Import the models
const Account = require("./models/Account");
const Services = require("./models/Services");
const Report = require("./models/Report");
const Order = require("./models/Order");
const Request = require("./models/Request");

const url = process.env.DB_CONNECTION_STRING;
// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.error("Connection error", err));

// Function to create an Account
const createAccount = async function (accountData) {
  try {
    const account = await Account.create(accountData);
    console.log("Account created:", account);
    return account;
  } catch (error) {
    console.error("Error creating account:", error);
  }
};

// Function to create a Services
const createServices = async function (servicesData) {
  try {
    const services = await Services.create(servicesData);
    console.log("Services created:", services);
    return services;
  } catch (error) {
    console.error("Error creating services:", error);
  }
};

// Function to create a Report
const createReport = async function (reportData) {
  try {
    const report = await Report.create(reportData);
    console.log("Report created:", report);
    return report;
  } catch (error) {
    console.error("Error creating report:", error);
  }
};

// Function to create an Order
const createOrder = async function (orderData) {
  try {
    const order = await Order.create(orderData);
    console.log("Order created:", order);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

// Function to create a Request
const createRequest = async function (requestData) {
  try {
    const request = await Request.create(requestData);
    console.log("Request created:", request);
    return request;
  } catch (error) {
    console.error("Error creating request:", error);
  }
};

// Add services to Account
const addServicesToAccount = (accountId, servicesId) => {
  return Account.findByIdAndUpdate(
    accountId,
    {
      $push: { "store.services": servicesId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};

// Add Report to Account
const addReportToAccount = (accountId, reportId) => {
  return Account.findByIdAndUpdate(
    accountId,
    {
      $push: { "store.reports": reportId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};

// Add Order to Account
const addOrderToAccount = (accountId, orderId) => {
  return Account.findByIdAndUpdate(
    accountId,
    {
      $push: { "store.orders": orderId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};

// Add Request to Account
const addRequestToAccount = (accountId, requestId) => {
  return Account.findByIdAndUpdate(
    accountId,
    {
      $push: { "store.requests": requestId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};

// --------------------------------------------
// Run the population process
const run = async function () {
  try {
    // CREATE COLLECTIONS
    let account = await createAccount({
      username: "SampleUser",
      password: "password123",
      name: "John Doe",
      phoneNumber: "1234567890",
      email: "john@example.com",
      role: "user",
      pickAddress: "123 Main St",
      backAddress: "456 Second St",
      requestId: null,
      store: null,
      deleted: false,
    });

    let services = await createServices({
      name: "Sample Service",
      price: 50.0,
      description: "This is a sample service.",
      ownerId: null,
      deleted: false,
    });

    let report = await createReport({
      content: "This is a sample report.",
      status: "pending",
      guestId: null,
      storeOwnerId: null,
    });

    let order = await createOrder({
      customerInfo: account._id,
      status: "processing",
      services: [services._id],
      totalWeight: 5.0,
      totalPrice: 250.0,
      note: "Special instructions here",
      timeLog: "2023-09-26 12:00 PM",
      deleted: false,
    });

    let request = await createRequest({
      content: "This is a sample request.",
      status: "open",
      guestId: null,
      storeOwnerId: null,
    });

    // ADD COLLECTIONS RELATIONSHIPS
    await addServicesToAccount(account._id, services._id);
    await addReportToAccount(account._id, report._id);
    await addOrderToAccount(account._id, order._id);
    await addRequestToAccount(account._id, request._id);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Run the population process
run();
