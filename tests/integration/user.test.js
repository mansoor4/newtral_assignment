const config = require("config");
const { connectDatabase, disconnectDatabase } = require("../../db");
const {
  followUser,
  createUser,
  unFollowUser,
  getUser,
} = require("../factories/user");
const createSession = require("../utils/createSession");
const randomToken = require("../utils/randomToken");

beforeEach(async () => {
  const { DB_URL } = config.get("DB");
  await connectDatabase(`${DB_URL}/test_${randomToken()}`);
});

afterEach(async () => {
  await disconnectDatabase();
});

describe("POST /follow/:id", () => {
  describe("user followed sucessfull check", () => {
    it("should answer with status code 200,with totalFollowings equal to 1 and with message 'User followed successfully'", async () => {
      const token = await createSession();
      const user = await createUser(["secondUser"]);
      const userId = user.body.userId;

      const response = await followUser(`Bearer ${token}`, userId);
      const userResponse = await getUser(`Bearer ${token}`);
      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body.message).toEqual("User followed successfully");
      expect(userResponse.body.totalFollowings).toEqual(1);
    });
  });

  describe("followed user not found", () => {
    it("should answer with status code 400 and with message 'User not found'", async () => {
      const token = await createSession();
      const userId = "63c6dd8384e6862980e4a601";

      const response = await followUser(`Bearer ${token}`, userId);
      const { status, body } = response;
      expect(status).toEqual(400);
      expect(body.message).toEqual("User not found");
    });
  });

  describe("user follow with token not provided", () => {
    it("should answer with status code 401", async () => {
      const response = await followUser(`notSet`);
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("POST /unfollow/:id", () => {
  describe("user unfollowed sucessfull check", () => {
    it("should answer with status code 200,with totalFollowings equal to 0 and with message 'User UnFollowed successfully'", async () => {
      const token = await createSession();
      const user = await createUser(["secondUser"]);
      const userId = user.body.userId;

      await followUser(`Bearer ${token}`, userId);
      const response = await unFollowUser(`Bearer ${token}`, userId);
      const userResponse = await getUser(`Bearer ${token}`);
      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body.message).toEqual("User UnFollowed successfully");
      expect(userResponse.body.totalFollowings).toEqual(0);
    });
  });

  describe("unfollowed user not found", () => {
    it("should answer with status code 400 and with message 'User not found'", async () => {
      const token = await createSession();
      const userId = "63c6dd8384e6862980e4a601";

      const response = await unFollowUser(`Bearer ${token}`, userId);
      const { status, body } = response;
      expect(status).toEqual(400);
      expect(body.message).toEqual("User not found");
    });
  });

  describe("user unfollow with token not provided", () => {
    it("should answer with status code 401", async () => {
      const response = await unFollowUser(`notSet`);
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("GET /api/user", () => {
  describe("get user sucessfull check", () => {
    it("should answer with status code 200 and with proper data", async () => {
      const bodyExpected = {
        name: expect.any(String),
        totalFollowers: expect.any(Number),
        totalFollowings: expect.any(Number),
      };

      const token = await createSession();

      const response = await getUser(`Bearer ${token}`);
      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body).toEqual(bodyExpected);
    });
  });

  describe("get user with token not provided", () => {
    it("should answer with status 401", async () => {
      const response = await getUser("notSet");
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});
