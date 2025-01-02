const userModel = require("../../model/userModel");

const homePage = (req, res) => {
    res.render("user/home");
  // console.log("admin is ",req.session.adminisLoggedIn);
  // console.log("user is ",req.session.userisLoggedIn);

  
};

const profilePageDetails = async (req, res) => {
  try {
    const userId = req.session.userDataId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error in profilePageDetails:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = { homePage,profilePageDetails };
