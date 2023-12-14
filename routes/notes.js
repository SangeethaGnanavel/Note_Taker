const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});
// POST Route for saving the notes
notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, "./db/notes.json");
    res.json(`Notes added successfully`);
  } else {
    res.error("Error in adding notes");
  }
});

//Delete route to delete a note
notes.delete("/:id", (req, res) => {
  const id = req.params.id;

  readFromFile("./db/notes.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((title) => title.id !== id);
      writeToFile("./db/notes.json", result);
      res.json(`Item ${id} has been deleted 🗑️`);
    });
});

module.exports = notes;
