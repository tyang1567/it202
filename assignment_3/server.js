const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/count", (req, res) => {
  const text = req.body.text || "";

  let totalLetters = 0;
  let vowels = 0;
  let consonants = 0;
  const vowelSet = "aeiouAEIOU";

  for (let ch of text) {
    if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
      totalLetters++;
      if (vowelSet.includes(ch)) {
        vowels++;
      } else {
        consonants++;
      }
    }
  }
  res.json({ totalLetters, vowels, consonants });
});

app.listen(3000, () => console.log("Server running on port 3000"));
