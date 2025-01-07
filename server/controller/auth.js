const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const asyncHandler = require("async-handler");
const {generateToken} = require("../utils/jwt")




const signup = (req, res) => {
  res.render("signup");
};
const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
const createAccount = async (req, res) => {
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

    const existingEmployee = await User.findOne({
      $or: [{ userId }, { number }],
    });
    if (existingEmployee) {
      return res
        .status(409)
        .send(
          `Employee with ${
            existingEmployee.userId === userId ? "UserId" : "Phone Number"
          } already exists`
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new User({
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
    res.status(200).json({ redirectURL: "/dashboard" });
  } catch (err) {
    res.status(500).send(`Error Adding Employee: ${err.message}`);
  }
};

const login = (req, res) => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.API_PRODUCTION_URL
      : process.env.API_DEVELOPMENT_URL;

  res.render("login", { apiUrl });
};

const userLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const findUser = await User.findOne({ userId: userId });

    if (!findUser) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT Token with role
    const role = findUser.isAdmin ? "admin" : "user";
    const token = generateToken(findUser._id, role);

    const response = {
      success: true,
      message: role === "admin" ? "Admin login successfully" : "User login successfully",
      redirectUrl: role === "admin" ? "/dashboard" : "/home",
    };

    res.status(200).json({ token, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = { login, userLogin, signup, createAccount, logout };
