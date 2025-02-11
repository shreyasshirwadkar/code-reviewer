const app = require("./src/app");
require("dotenv").config();
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
