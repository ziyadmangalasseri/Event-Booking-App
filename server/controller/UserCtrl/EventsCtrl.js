const mongoose = require("mongoose");
const Event = require("../../model/EventSchema");
const User = require("../../model/userModel");

const showEvents = async (req, res) => {
  try {
    // Fetch all events
    const events = await Event.find();

    // Fetch the logged-in employee's details (assuming `req.user` contains the authenticated user)
    const employee = await User.findById(req.user.userId).populate("myEvents");

    // Get IDs of booked events
    const bookedEventIds = employee.myEvents.map((event) =>
      event._id.toString()
    );

    // Filter out events that are already booked by the employee
    const upcomingEvents = events.filter(
      (event) => !bookedEventIds.includes(event._id.toString())
    );

    // Format event dates
    const formattedEvents = upcomingEvents.map((event) => {
      const date = new Date(event.date);
      return {
        ...event._doc, // Spread the event properties (specific to Mongoose documents)
        formattedDate: date.toLocaleString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    });

    // Send events as JSON
    res.status(200).json({ success: true, event: formattedEvents });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const userEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event id" });
    }
    const event = await Event.findById(eventId);
    const bookedEvent = event.currentEmployers.includes(userId) ? true : false;
    // console.log(bookedEvent);

    if (event) {
      const date = new Date(event.date);
      event.formattedDate = date.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    if (event.expirationTime) {
      const expirationTime = new Date(event.expirationTime);
      event.formattedexpirationTime = expirationTime.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    res.status(200).json({ success: true, event, bookedEvent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userBookedEventDetails = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event id" });
    }
    const event = await Event.findById(eventId);

    if (event) {
      const date = new Date(event.date);
      event.formattedDate = date.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    if (event.expirationTime) {
      const expirationTime = new Date(event.expirationTime);
      event.formattedexpirationTime = expirationTime.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    res.render("user/bookedEventDetails", { event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const bookEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId;

    // console.log("User ID:", userId);
    // console.log("Event ID:", eventId);

    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ error: "Missing required data: Event ID or User ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ error: "Invalid Event ID format" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (event.currentEmployers.length >= event.employerLimit) {
      return res.status(404).json({ error: "Employers is full" });
    }

    await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { currentEmployers: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { myEvents: eventId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Event booked successfully",
    });
  } catch (error) {
    console.error("Error in bookEvent:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const bookedEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID not available" });
    }

    const user = await User.findById(userId).populate("myEvents");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const events = user.myEvents.map((event) => ({
      _id: event._id,
      place: event.place,
      date: event.date.toISOString(),
      normalDate:event.date.toLocaleDateString(),
      reportingTime: event.reportingTime,
      exitTime: event.exitTime,
      expirationTime: event.expirationTime,
    }));

    // Always send a valid array
    res.json({ success: true, events });
  } catch (err) {
    console.error("Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  showEvents,
  userEventDetails,
  bookEvent,
  bookedEvents,
  userBookedEventDetails,
};
