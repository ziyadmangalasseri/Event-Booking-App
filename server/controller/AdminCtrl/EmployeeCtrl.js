const mongoose = require("mongoose");
const EmployeeModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const Event = require("../../model/EventSchema");

const renderEmployeeForm = (req, res) => {
  res.render("admin/addEmployee");
};

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      userId,
      password,
      number,
      place,
      JoiningDate,
      DateOfBirth,
      BloodGroup,
    } = req.body;

    if (
      !name ||
      !userId ||
      !password ||
      !number ||
      !place ||
      !JoiningDate ||
      !DateOfBirth ||
      !BloodGroup
    ) {
      return res.status(400).send("All fields are required.");
    }

    const existingEmployee = await EmployeeModel.findOne({
      $or: [{ userId }, { number }],
    });
    if (existingEmployee) {
      return res
        .status(409)
        .json({
          success: false,
          message: `Employee with ${
            existingEmployee.userId === userId ? "UserId" : "Phone Number"
          } already exists`,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new EmployeeModel({
      name,
      userId,
      password: hashedPassword,
      number,
      place,
      JoiningDate,
      DateOfBirth,
      BloodGroup,
    });

    await newEmployee.save();
    res
      .status(200)
      .json({ success: true, message: "Employee Added successfully" });
  } catch (err) {
    res.status(500).send(`Error Adding Employee: ${err.message}`);
  }
};

const renderallemployees = async (req, res) => {
  try {
    const allemployees = await EmployeeModel.find();
    // console.log(allemployees);

    res.status(200).json({ employees: allemployees });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};

const employeeDetails = async (req, res) => {
  const employeeId = req.params.id;
  try {
    if (!employeeId) {
      return res.status(400).send("Invalid Employee ID");
    }
    const employee = await EmployeeModel.findById(employeeId);
    // console.log(employee);

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    const formattedEmployee = {
      ...employee._doc,
      JoiningDate: new Date(employee.JoiningDate).toISOString().split("T")[0],
      DateOfBirth: new Date(employee.DateOfBirth).toISOString().split("T")[0],
    };

    // Send employee data as JSON
    res.status(200).json(formattedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load employee data");
  }
};

const editEmployeePage = async (req, res) => {
  try {
    const employeeId = req.params.id;
    if (employeeId) {
      const employee = await EmployeeModel.findById(employeeId);
      // console.log(employee);

      if (employee) {
        // Return the employee data
        res.status(200).json(employee);
      } else {
        return res.status(404).json({ message: "Employee not found" });
      }
    } else {
      return res.status(400).json({ message: "Employee ID is required" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate employee ID
    if (!id) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    const updatedData = {
      name: req.body.name,
      userId: req.body.userId,
      number: req.body.number,
      place: req.body.place,
      JoiningDate: req.body.JoiningDate,
      DateOfBirth: req.body.DateOfBirth,
      BloodGroup: req.body.BloodGroup,
    };

    // Validate input data
    if (!updatedData.name || !updatedData.userId || !updatedData.number) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update employee details" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    if (!employeeId) {
      return res.status(400).json({ error: "Invalid Employee ID" });
    }

    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

const removeEmployeeFromEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(eventId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid Event ID or User ID format" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Event.findByIdAndUpdate(
      eventId,
      { $pull: { currentEmployers: userId } },
      { new: true }
    );

    await EmployeeModel.findByIdAndUpdate(
      userId,
      { $pull: { myEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Employee removed from event successfully",
    });
  } catch (error) {
    console.error("Error in removeEmployeeFromEvent:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const employeeId = req.params.id; // Get the employee ID from the URL
    const employee = await EmployeeModel.findById(employeeId); // Fetch employee details from the database

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    // Render the changePassword page with employee details
    res.render("admin/changePassword", { employee });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    // Validate input
    if (!newPassword) {
      return res.status(400).json({ error: "Password is required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the employee's password in the database
    const employee = await EmployeeModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const employeeReported = async (req, res) => {
  try {
    const { id } = req.params; // employeeId
    const { eventId } = req.query;

    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { CompletedEvents: eventId } },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res
      .status(200)
      .json({ message: "Event marked as completed", employee });
  } catch (err) {
    console.error("Error marking event as completed:", err.message);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the event." });
  }
};

const unReportEmployee = async (req, res) => {
  try {
    const { id } = req.params; // employeeId
    const { eventId } = req.query; // eventId from query string

    if (!eventId) {
      return res.status(400).json({ error: "Event ID is required" });
    }

    // Logic to unreport the employee
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Remove eventId from CompletedEvents
    employee.CompletedEvents = employee.CompletedEvents.filter(
      (event) => event.toString() !== eventId
    );
    await employee.save();

    res.status(200).json({ message: "Employee unreported successfully" });
  } catch (error) {
    console.error("Error unreporting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { isAdmin: true },
      { new: true } // Return the updated document
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee successfully converted to admin",
      employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      { isAdmin: false },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res
      .status(200)
      .json({ message: "Admin privileges removed successfully", employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  renderEmployeeForm,
  addEmployee,
  renderallemployees,
  employeeDetails,
  editEmployee,
  editEmployeePage,
  deleteEmployee,
  removeEmployeeFromEvent,
  changePassword,
  updatePassword,
  employeeReported,
  unReportEmployee,
  makeAdmin,
  removeAdmin,
};
