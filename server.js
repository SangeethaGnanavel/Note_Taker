const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
//import router
const api = require("./routes/index.js");

//middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
