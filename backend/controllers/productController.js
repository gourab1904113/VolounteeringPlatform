import { sql } from "../config/db.js";

export const getEvents = async (req, res) => {
  try {
    const Events = await sql`
       SELECT ve.*, u.name AS created_by_name
       FROM VolunteerEvents ve
       JOIN users u ON ve.created_by = u.user_id
       ORDER BY ve.created_at DESC;
    `;

    console.log("Fetched Events ", Events);

    ///send response as products
    res.status(200).json({ success: true, data: Events });
  } catch (error) {
    console.log("Error in get Events", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  //app.use(express.json()) in server.js

  if (!req.user) {
    return res.status(400).send("User not authenticated");
  }
  const {
    title,
    description,
    event_date,
    event_time,
    location,
    category,
    created_by,
  } = req.body;

  if (!created_by) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (
    !title ||
    !description ||
    !event_date ||
    !event_time ||
    !location ||
    !category
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    //new event returns an array
    const newEvent = await sql`
       INSERT INTO VolunteerEvents (title, description, event_date, event_time, location, category, created_by)
       VALUES (
             ${title}, ${description}, ${event_date}, 
             ${event_time}, ${location}, ${category},${created_by}
             )
             RETURNING *
    `;

    console.log("New Event added", newEvent[0]); ///get the newly created event
    res.status(201).json({ success: true, data: newEvent[0] });
  } catch (error) {
    console.log("Error in create Event", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvent = async (req, res) => {
  //take id from url
  const { event_id } = req.params;
  try {
    const Event = await sql`
          SELECT * FROM VolunteerEvents WHERE event_id= ${event_id}
       `;
    res.status(200).json({ success: true, data: Event[0] });
  } catch (error) {
    console.log("Error in get Event", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { event_id } = req.params;
  const { title, description, event_date, event_time, location, category } =
    req.body;

  try {
    const updatedEvent = await sql`
          UPDATE VolunteerEvents 
          SET title=${title}, description=${description}, event_date=${event_date}, event_time=${event_time}, location=${location}, category=${category}
          WHERE event_id= ${event_id} RETURNING *
       `;

    if (updateEvent.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: updatedEvent[0] });
  } catch (error) {
    console.log("Error in Update Event", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteEvent = async (req, res) => {
  const { event_id } = req.params;

  try {
    const deleteEvent = await sql`
          DELETE FROM VolunteerEvents WHERE event_id=${event_id}
          RETURNING *
       `;
    if (deleteEvent.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: deleteEvent[0] });
  } catch (error) {
    console.log("Error in Delete Event", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
