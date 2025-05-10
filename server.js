const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  console.log("New subscriber:", email);
  res.status(200).send("Subscription received!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
