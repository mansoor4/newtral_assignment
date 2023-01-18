const request = require("supertest");
const app = require("../../app");

const agent = request(app);

module.exports = {
  createUser: (conditions) =>
    new Promise(async (resolve, reject) => {
      try {
        const name = (() => {
          if (conditions.includes("nameEmpty")) return "";
          return "testName";
        })();

        const email = (() => {
          if (conditions.includes("emailEmpty")) return "";
          if (conditions.includes("emailWithNot@")) return "testgmail.com";
          if (conditions.includes("emailWithNot.")) return "test@gmailcom";
          if (conditions.includes("secondUser")) return "test2@gmail.com";
          return "test@gmail.com";
        })();

        const password = (() => {
          if (conditions.includes("passwordEmpty")) return "";
          if (conditions.includes("passwordLessThan6Characters"))
            return "12345";
          return "12345678";
        })();

        const userBody = {
          name,
          email,
          password,
        };

        const response = await agent.post("/api/register").send(userBody);
        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  getUser: (token) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.get("/api/user");
        } else {
          response = await agent.get("/api/user").set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  followUser: (token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.post(`/api/follow/${id}`);
        } else {
          response = await agent
            .post(`/api/follow/${id}`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  unFollowUser: (token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.post(`/api/unfollow/${id}`);
        } else {
          response = await agent
            .post(`/api/unfollow/${id}`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  signinUser: (conditions) =>
    new Promise(async (resolve, reject) => {
      try {
        const email = (() => {
          if (conditions.includes("emailEmpty")) return "";
          if (conditions.includes("emailWithNot@")) return "testgmail.com";
          if (conditions.includes("emailWithNot.")) return "test@gmailcom";
          return "test@gmail.com";
        })();

        const password = (() => {
          if (conditions.includes("passwordEmpty")) return "";
          if (conditions.includes("passwordLessThan6Characters"))
            return "12345";
          return "12345678";
        })();

        const userBody = {
          email,
          password,
        };

        const response = await agent.post("/api/authenticate").send(userBody);
        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),
};
