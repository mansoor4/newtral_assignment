const request = require("supertest");
const app = require("../../app");

const agent = request(app);

module.exports = {
  createPost: (conditions, token) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        const title = (() => {
          if (conditions.includes("titleEmpty")) return "";
          return "testTitle";
        })();

        const description = (() => {
          if (conditions.includes("descriptionEmpty")) return "";
          return "testDescription";
        })();

        const postBody = {
          title,
          description,
        };

        if (token === "notSet") {
          response = await agent.post("/api/posts").send(postBody);
        } else {
          response = await agent
            .post("/api/posts")
            .set("Authorization", token)
            .send(postBody);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  getPost: (token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.get(`/api/posts/${id}`);
        } else {
          response = await agent
            .get(`/api/posts/${id}`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  getAllPosts: (token) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.get(`/api/all_posts`);
        } else {
          response = await agent
            .get(`/api/all_posts`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  deletePost: (token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.delete(`/api/posts/${id}`);
        } else {
          response = await agent
            .delete(`/api/posts/${id}`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  likePost: (token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.post(`/api/like/${id}`);
        } else {
          response = await agent
            .post(`/api/like/${id}`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  unlikePost: (token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        if (token === "notSet") {
          response = await agent.post(`/api/unlike/${id}`);
        } else {
          response = await agent
            .post(`/api/unlike/${id}`)
            .set("Authorization", token);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),

  createComment: (conditions, token, id) =>
    new Promise(async (resolve, reject) => {
      let response;
      try {
        const comment = (() => {
          if (conditions.includes("commentEmpty")) return "";
          return "testComment";
        })();

        const commentBody = {
          comment,
        };

        if (token === "notSet") {
          response = await agent.post(`/api/comment/${id}`).send(commentBody);
        } else {
          response = await agent
            .post(`/api/comment/${id}`)
            .set("Authorization", token)
            .send(commentBody);
        }

        return resolve(response);
      } catch (err) {
        return reject(err);
      }
    }),
};
