require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// create a model
const Note = require("./models/note");

// set the endpoints or routes
app.get("/", (request, response) => {
  response.send("<h1>Notes App</h1>");
});

// fetches all the resources in the notes collection
app.get("/api/notes", (request, response) => {
  Note.find({}, {}).then((notes) => {
    response.json(notes);
  });
});

// creates a new resource based on the request data
app.post("/api/notes", (request, response) => {
  // prepare an object to store it in the database
  const note = new Note(request.body);

  // storing the new object to the database
  note.save().then((result) => {
    response.status(201).json({ message: "Note created successfully" });
  });
});

// fetching a single resource
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  Note.findById(id)
    .then((note) => {
      if (!note) {
        return response.status(404).json({ error: "Note not found" });
      }

      response.json(note);
    })
    .catch((error) => {
      response.status(500).json({ error: "Internal server error" });
    });
});

// deleting a single resource
app.delete("/api/notes/:id", (request, response) => {
  // get the id of the resource from params
  const id = request.params.id;

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      if (!deletedNote) {
        return response.status(404).json({ error: "Note not found" });
      }
      response.status(204).json({ message: "Note deleted successfully" });
    })
    .catch((error) => {
      response.status(500).json({ error: "Internal server error" });
    });
});

app.put("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const noteToPut = request.body;

  Note.findByIdAndUpdate(id, noteToPut)
    .then((updatedNote) => {
      if (!updatedNote) {
        return response.status(404).json({ error: "Note not found" });
      }
      response.json(updatedNote);
    })
    .catch((error) => {
      response.status(500).json({ error: "Internal server error" });
    });
});

// write an endpoint to patch a single resource
app.patch("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const noteToPatch = request.body;

  Note.findByIdAndUpdate(id, noteToPatch)
    .then((updatedNote) => {
      if (!updatedNote) {
        return response.status(404).json({ error: "Note not found" });
      }
      response.json(updatedNote);
    })
    .catch((error) => {
      response.status(500).json({ error: "Internal server error" });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});