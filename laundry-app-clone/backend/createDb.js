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

// Add Account to Report
const addGuestAccountToReport = (accountId, reportId) => {
  return Report.findByIdAndUpdate(
    reportId,
    {
      $push: { "guestId": accountId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};
// Add Account to Report
const addSOAccountToReport = (accountId, reportId) => {
  return Report.findByIdAndUpdate(
    reportId,
    {
      $push: { "storeOwnerId": accountId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};

// Add Account to Order
const addCustAccountToOrder = (orderId, accountId) => {
  return Order.findByIdAndUpdate(
    orderId,
    {
      $push: { "customerInfo": accountId }, // Modify this to match your model structure
    },
    { new: true, useFindAndModify: false }
  );
};

const addSOAccountToOrder = (orderId, accountId) => {
  return Order.findByIdAndUpdate(
    orderId,
    {
      $push: { "storeOwnerId": accountId }, // Modify this to match your model structure
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

// Add Service to Order
const addServiceToOrder = (orderId, serviceId) => {
  return Order.findByIdAndUpdate(
    orderId,
    {
      $push: { services: serviceId },
    },
    { new: true, useFindAndModify: false }
  );
};
// Add Account to Services
const addAccountToServices = (accountId, serviceId) => {
  return Services.updateMany(
    { _id:  serviceId },
    {
      $push: { ownerId: accountId },
    },
    { new: true }
  );
};

// Add Account to Request
const addAccountToRequest = (accountId, requestId) => {
  return Request.findByIdAndUpdate(
    requestId,
    {
      $push: { guestId: accountId },
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
      store: {
        name: "Washing Store Number1",
        status: "Active",
        address: "123 Main Street, Cityville",
        avatarLink: "https://example.com/avatar/johndoe.jpg",
        dailyQuantity: 10,
        services: null,
      },
      deleted: false,
    });

    
    let account2 = await createAccount({
      username: "ThongNT",
      password: "password123",
      name: "Thong",
      phoneNumber: "1234567890",
      email: "thongnt@example.com",
      role: "user",
      pickAddress: "123 Main St",
      backAddress: "456 Second St",
      requestId: null,
      store: {
        name: "THOM Washing",
        status: "Active",
        address: "12 Main Street, Cityville",
        avatarLink: "https://example.com/avatar/johndoe.jpg",
        dailyQuantity: 10,
        services: null,
      },
      deleted: false,
    });

    let services = await createServices({
      name: "Sample Service",
      price: 50.0,
      description: "This is a sample service.",
      ownerId: account2._id,
      deleted: false,
    });

    let report = await createReport({
      content: "This is a sample report.",
      status: "pending",
      guestId: account._id,
      storeOwnerId: account._id,
    });

    let order = await createOrder({
      customerInfo: account._id,
      storeOwnerId: account._id,
      status: "processing",
      services: [services._id],
      totalWeight: 5.0,
      totalPrice: 250.0,
      note: "Special instructions here",
      timeLog: "2023-09-26 12:00 PM",
      deleted: false,
    });

    

    let services2 = await createServices({
      name: "2th Service",
      price: 50.0,
      description: "This is a sample service.",
      ownerId: account._id,
      deleted: false,
    });

    let request = await createRequest({
      content: "This is a sample request.",
      status: "open",
      guestId: account2._id,
    });

    // ADD COLLECTIONS RELATIONSHIPS
    await addGuestAccountToReport(account._id, report._id);
    await addSOAccountToReport(account._id, report._id);
    await addCustAccountToOrder(order._id, account._id);
    await addSOAccountToOrder(order._id, account._id);
    await addServiceToOrder(order._id, services._id);
    await addAccountToServices(account2._id, services._id);
    await addAccountToServices(account._id, services2._id);
    await addRequestToAccount(account2._id, request._id);
    await addAccountToRequest(account2._id, request._id);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Run the population process
run();
