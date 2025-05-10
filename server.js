const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  console.log("New subscriber:", email);

  if (!email) {
    return res.status(400).send("Missing email");
  }

  // Airtable configuration
  const AIRTABLE_API_KEY =
    "patAWUiPAHTejf4yB.4ed0757016b68a80684944885afc2cb4540f5013006b7bbdd44ac73ad6e68901";
  const BASE_ID = "app6Ahc99UY2Kg7zQ";
  const TABLE_ID = "tblCk7AM32KvbNnT1";

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: email,
              },
            },
          ],
        }),
      }
    );

    const airtableResponse = await response.json();

    if (!response.ok) {
      console.error("Airtable error:", airtableResponse);
      return res.status(500).send("Airtable error");
    }

    console.log("✅ Email saved to Airtable");
    console.log("Airtable API response:", airtableResponse);

    console.log("✅ Email saved to Airtable");
    res.status(200).send("Subscription received!");
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
