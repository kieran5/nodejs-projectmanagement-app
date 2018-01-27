// Server
var express = require('express');
var routes = require('./src/routes/projectRoutes');

const app = express();
const PORT = 3000;

routes(app);

app.get('/', (req, res) =>
  res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
