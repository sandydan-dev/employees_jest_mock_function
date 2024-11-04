const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

function fetchAllEmployees() {
  return employees;
}

function fetchEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

function addNewEmployees(emp) {
  let newEmployee = { id: employees.length + 1, ...emp };
  employees.push(newEmployee);
  return newEmployee;
}

module.exports = { fetchAllEmployees, fetchEmployeeById, addNewEmployees };
