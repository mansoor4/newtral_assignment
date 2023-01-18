const config = require("config");
const app = require("./app");
const { connectDatabase } = require("./db");

const { SERVER_PORT } = config.get("SERVER");

connectDatabase()
  .then(() => {
    console.log("Database Connected");
    app.listen(SERVER_PORT, () => {
      console.log(`Server connected at PORT ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));
