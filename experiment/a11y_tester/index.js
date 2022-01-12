const express = require("express");
const pa11y = require("pa11y");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.get("/api/a11y", async (req, res) => {
  const { url } = req.query;
  if (url) {
    const results = await pa11y(url);
    res.status(200).json(results);
    return
  }
  res.status(400).json({ error: "url is required." });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
