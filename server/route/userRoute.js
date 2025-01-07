const express = require("express");
const { isAuthenticated } = require("../middleware/authMiddleware");

const router = express.Router();
const {
  homePage,
  profilePageDetails,
} = require("../controller/UserCtrl/UserCtrl");
const {
  showEvents,
  userEventDetails,
  bookEvent,
  bookedEvents,
  userBookedEventDetails,
} = require("../controller/UserCtrl/EventsCtrl");

// User Routes
router.get("/home", isAuthenticated("user"), homePage);
router.get("/userProfile", isAuthenticated("user"), profilePageDetails);

router.get("/upcomingEvents", isAuthenticated("user"), showEvents);
router.get("/usereventDetails/:id", isAuthenticated("user"), userEventDetails);
router.post("/bookEvent/:id", isAuthenticated("user"), bookEvent);
router.get("/userbookedeventDetails/:id", isAuthenticated("user"), userBookedEventDetails);

router.get("/bookedEvents", isAuthenticated("user"), bookedEvents);

module.exports = router;
