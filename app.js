//Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");
const { json } = require("express/lib/response");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Crate
app.get('/db', (req, res) => {
  res.sendFile(__dirname + "/db.json");
});

app.post("/db", function (req, res) {
  let db = readJSONFile();
  let cv = req.body;
  cv["id"] = db.length + 1
  db.push(cv);
  writeJSONFile(db);
  res.send(JSON.stringify(db))
}
)

app.delete("/db", function (req, res) {
  let db = readJSONFile();
  let cv = parseInt(req.body["id"]) - 1;
  let arrNew = []
  for (let i = 0; i < cv; i++)
    arrNew.push(db[i]);
  for (let i = cv + 1; i < db.length; i++) {
    db[i]["id"] = parseInt(db[i]["id"]) - 1
    arrNew.push(db[i]);
  }
  writeJSONFile(arrNew);
  res.send(JSON.stringify(arrNew));
}
)

app.put("/db", function (req, res) {
  let db = readJSONFile();
  let cv = parseInt(req.body["id"]);
  let imgToEdit = req.body["img"];
  for (let i = 0; i < db.length; i++) {
    if (db[i]["id"] == cv) {
      db[i]["img"] = imgToEdit;
      break;
    }
  }
  writeJSONFile(db);
  res.send(JSON.stringify(db))
}
)

//Functia care imi returneaza un obiect json din fisierul json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["photos"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ photos: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.use(express.static('public'));
app.listen(3000, (ok) => console.log("Site started! ^_^"));