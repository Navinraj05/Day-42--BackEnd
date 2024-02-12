const mongoose = require("mongoose");

const url = process.env.ATLAS_URI;

mongoose.set("strictQuery", false);

// connect to the database
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB Database");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

// create a schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);