const {
  fetchAllEmployees,
  fetchEmployeeById,
  addNewEmployees,
} = require("../controllers/employee.controller");

const { app } = require("../index");

// define mock function
jest.mock("../controllers/employee.controller.js", () => ({
  ...jest.requireActual("../controllers/employee.controller.js"),
  fetchAllEmployees: jest.fn(),
  fetchEmployeeById: jest.fn(),
  addNewEmployees: jest.fn(),
}));

const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("employees mock functions", () => {
  // reset all mock function
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // check all data is properly working in mock function
  test("should return all employees data", () => {
    let mockEmployees = [
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
    ];

    // return mock return value
    fetchAllEmployees.mockReturnValue(mockEmployees);
    let result = fetchAllEmployees();
    expect(result).toEqual(mockEmployees);
    // check length of employee of mock function
    expect(result.length).toEqual(3);
    expect(fetchAllEmployees).toHaveBeenCalled();
  });

  // fetch  employee by id

  test("should return employee id", () => {
    let mockEmp = { id: 1, name: "John Doe", position: "Software Engineer" };
    fetchEmployeeById.mockReturnValue(mockEmp);
    let result = fetchEmployeeById(mockEmp);
    expect(result).toEqual(mockEmp);
    expect(fetchEmployeeById).toHaveBeenCalledWith(mockEmp);
  });

  //  fetch employee id not found

  test("should return undefined  when employee id not found", () => {
    fetchEmployeeById.mockReturnValue(undefined);
    let result = fetchEmployeeById(123);
    expect(result).toBeUndefined;
    expect(fetchEmployeeById).toHaveBeenCalledWith(123);
  });

  // add new employees, mock function

  test("should return new Employee data", () => {
    let mockEmp = {
      authorId: 4,
      name: "J.K. Rowling",
      book: "Harry Potter",
    };

    addNewEmployees.mockReturnValue(mockEmp);
    let result = addNewEmployees(mockEmp);
    expect(result).toEqual(mockEmp);
    expect(addNewEmployees).toHaveBeenCalledWith(mockEmp);
  });
});
