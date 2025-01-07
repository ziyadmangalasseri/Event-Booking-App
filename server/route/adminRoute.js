const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");
const router = express.Router();

const {
  AddEvent,
  ShowEventPage,
  AddEventPage,
  EventdetailsPage,
  EditEventPage,
  EditEvent,
  DeleteEvent,
} = require("../controller/AdminCtrl/EventCtrl");
const {
  renderEmployeeForm,
  addEmployee,
  renderallemployees,
  employeeDetails,
  editEmployeePage,
  editEmployee,
  deleteEmployee,
  removeEmployeeFromEvent,
  changePassword,
  updatePassword,
  employeeReported,
  unReportEmployee,
  makeAdmin,
  removeAdmin,
} = require("../controller/AdminCtrl/EmployeeCtrl");

const { dashboard } = require("../controller/AdminCtrl/adminCtrl");

// Employee Routes
router.get("/addEmployee", isAuthenticated("admin"), renderEmployeeForm);
router.post("/addEmployee", isAuthenticated("admin"), addEmployee);
router.get("/showemployeespage", isAuthenticated("admin"), renderallemployees);
router.get("/showEmployeeDetails/:id", isAuthenticated("admin"), employeeDetails);
router.get("/editEmployee/:id", isAuthenticated("admin"), editEmployeePage);
router.put("/editEmployee/:id", isAuthenticated("admin"), editEmployee);
router.delete("/deleteEmployee/:id", isAuthenticated("admin"), deleteEmployee);

// Dashboard Route
router.get("/dashboard", isAuthenticated("admin"), dashboard);

// Event Routes
router.get("/addEventPage", isAuthenticated("admin"), AddEventPage);
router.post("/addEvent", isAuthenticated("admin"), AddEvent);

router.get("/eventDetail/:id", isAuthenticated("admin"), EventdetailsPage);
router.get("/showEventPage", isAuthenticated("admin"), ShowEventPage);

router.get("/event/edit/:id", isAuthenticated("admin"), EditEventPage);
router.put("/event/edit/:id", isAuthenticated("admin"), EditEvent);
router.delete(
  "/event/:eventId/employee/:userId",
  isAuthenticated("admin"),
  removeEmployeeFromEvent
);
router.post("/employeeReported/:id", isAuthenticated("admin"), employeeReported);
router.delete("/employeeUnreported/:id", isAuthenticated("admin"), unReportEmployee);

// Password and Admin Management Routes
router.get("/changePassword/:id", isAuthenticated("admin"), changePassword);
router.put("/updatePassword/:id", isAuthenticated("admin"), updatePassword);
router.put("/makeadmin/:id", isAuthenticated("admin"), makeAdmin);
router.put("/removeadmin/:id", isAuthenticated("admin"), removeAdmin);

router.delete("/event/delete/:id", isAuthenticated("admin"), DeleteEvent);

module.exports = router;
