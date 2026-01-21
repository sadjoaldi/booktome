// point d’entrée Express
import express from "express";

const app = express();

const port = 3000;

const initApp = (req, res) => {
  res.send("Hello world from express");
};

app.get("/", initApp);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
