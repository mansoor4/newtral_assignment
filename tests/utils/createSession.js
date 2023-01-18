const { createUser, signinUser } = require("../factories/user");

const createSession = () =>
  new Promise(async (resolve, reject) => {
    try {
      await createUser([]);
      const response = await signinUser([]);
      return resolve(response.body.token);
    } catch (err) {
      return reject(err);
    }
  });

module.exports = createSession;
