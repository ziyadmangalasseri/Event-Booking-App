const mongoose = require("mongoose");
const Event = require("../../model/EventSchema");

const AddEventPage = async (req, res) => {
  try {
    res.render("admin/addEvent");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const ShowEventPage = async (req, res) => {
  try {
    const events = await Event.find();
    // console.log(events);

    const formattedEvents = events.map((event) => {
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

    res.json({ success: true, event: formattedEvents });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const EventdetailsPage = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event id" });
    }

    const event = await Event.findById(eventId).populate(
      "currentEmployers",
      "name userId CompletedEvents"
    );

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

      if (event.expirationTime) {
        const expirationTime = new Date(event.expirationTime);
        event.formattedExpirationTime = expirationTime.toLocaleString("en-IN", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      }

      return res.status(200).json({ success: true, event });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const EditEventPage = async (req, res) => {
  // try {
  //   const eventId = req.params.id;
  //   const event = await Event.findById(eventId);
  //   if (!event) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "Event not found" });
  //   }
  //   // Format date and expiration time for input fields
  //   event.formattedDate = event.date.toISOString().split("T")[0]; // YYYY-MM-DD for <input type="date">
  //   // event.formattedExpirationTime = event.expirationTime.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM for <input type="datetime-local">
  //   res.render("admin/editEventPage", { event });
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).json({ success: false, message: "Internal server error" });
  // }
};

const AddEvent = async (req, res) => {
  const adminId = req.session.userDataId;
  try {
    const {
      place,
      date,
      reportingTime,
      exitTime,
      jobTitle,
      jobDescription,
      employerLimit,
    } = req.body;

    const newEvent = new Event({
      place,
      date,
      reportingTime,
      exitTime,
      jobTitle,
      jobDescription,
      employerLimit,
      // createdBy: adminId, // Optionally track who created the event
    });

    await newEvent.save();

    res.status(200).json({
      success: true,
      message: "New event successfully created",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const EditEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const {
      place,
      date,
      reportingTime,
      exitTime,
      jobTitle,
      jobDescription,
      employerLimit,
    } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        place,
        date,
        reportingTime,
        exitTime,
        jobTitle,
        jobDescription,
        employerLimit,
      },
      { new: true } // To return the updated document
    );

    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event successfully edited" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const DeleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  AddEvent,
  AddEventPage,
  ShowEventPage,
  EventdetailsPage,
  EditEventPage,
  EditEvent,
  DeleteEvent,
};
