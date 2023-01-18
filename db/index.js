const config = require("config");
const mongoose = require("mongoose");

module.exports = {
  connectDatabase: (ARG_DB_URL) =>
    new Promise(async (resolve, reject) => {
      try {
        const { DB_URL } = config.get("DB");
        await mongoose.connect(ARG_DB_URL ? ARG_DB_URL : `${DB_URL}/reunion`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        return resolve(true);
      } catch (err) {
        return reject(err);
      }
    }),

  disconnectDatabase: () =>
    new Promise(async (resolve, reject) => {
      try {
        await mongoose.connection.close();
        return resolve(true);
      } catch (err) {
        return reject(err);
      }
    }),
};
