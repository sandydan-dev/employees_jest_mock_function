const express = require("express");
const app = express();
const port = 3000;

const {
  fetchAllEmployees,
  fetchEmployeeById,
  addNewEmployees,
} = require("./controllers/employee.controller");

// middelware
app.use(express.json());

app.get("/employees", (req, res) => {
  let result = fetchAllEmployees();
  if (!result) {
    res.status(404).send({ message: "No employees found" });
  } else {
    res.status(200).json(result);
  }
});

app.get("/employees/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let response = fetchEmployeeById(id);
  if (!response) {
    res.status(404).send({ message: "Employee not found" });
  } else {
    res.status(200).json(response);
  }
});

// add new employee
app.post("/employees/new", (req, res) => {
  let employee = req.body;
  let response = addNewEmployees(employee);
  if (!response) {
    res.status(404).send({ message: "Employee not added" });
  } else {
    res.status(201).json(response);
  }
});

module.exports = { app, port };
