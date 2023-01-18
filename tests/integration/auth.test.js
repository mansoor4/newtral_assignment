const config = require("config");
const { connectDatabase, disconnectDatabase } = require("../../db");
const { createUser, signinUser } = require("../factories/user");
const randomToken = require("../utils/randomToken");

beforeEach(async () => {
  const { DB_URL } = config.get("DB");
  await connectDatabase(`${DB_URL}/test_${randomToken()}`);
});

afterEach(async () => {
  await disconnectDatabase();
});

describe("POST /api/register", () => {
  describe("user register successfull check", () => {
    it("should answer with status code 200 and with message 'register successfully'", async () => {
      const response = await createUser([]);
      const { status, body } = response;
      expect(body.message).toEqual("register successfully");
      expect(status).toEqual(200);
    });
  });

  describe("user is already registered check", () => {
    it("should answer with status code 400", async () => {
      await createUser([]);
      const response = await createUser([]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user register with name field empty", () => {
    it("should answer with status code 400", async () => {
      const response = await createUser(["nameEmpty"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user register with email field empty", () => {
    it("should answer with status code 400", async () => {
      const response = await createUser(["emailEmpty"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user register with email field not contain @", () => {
    it("should answer with status code 400", async () => {
      const response = await createUser(["emailWithNot@"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user register with email field not contain .", () => {
    it("should answer with status code 400", async () => {
      const response = await createUser(["emailWithNot."]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user register with password field empty", () => {
    it("should answer with status code 400", async () => {
      const response = await createUser(["passwordEmpty"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user register with password field less than 6 character", () => {
    it("should answer with status code 400", async () => {
      const response = await createUser(["passwordLessThan6Characters"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });
});

describe("POST /api/authenticate", () => {
  describe("user authenticate successfull check", () => {
    it("should be answer with status code 200 and with valid token", async () => {
      await createUser([]);
      const response = await signinUser([]);
      const { status, body } = response;
      expect(body.token).toEqual(expect.any(String));
      expect(status).toEqual(200);
    });
  });

  describe("user not registered check", () => {
    it("should answer with status code 400", async () => {
      const response = await signinUser([]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user authenticate with email field empty", () => {
    it("should answer with status code 400", async () => {
      const response = await signinUser(["emailEmpty"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user authenticate with email field not contain @", () => {
    it("should answer with status code 400", async () => {
      const response = await signinUser(["emailWithNot@"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user authenticate with email field not contain .", () => {
    it("should answer with status code 400", async () => {
      const response = await signinUser(["emailWithNot."]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user authenticate with password field empty", () => {
    it("should answer with status code 400", async () => {
      const response = await signinUser(["passwordEmpty"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("user authenticate with password field less than 6 character", () => {
    it("should answer with status code 400", async () => {
      const response = await signinUser(["passwordLessThan6Characters"]);
      const { status } = response;
      expect(status).toEqual(400);
    });
  });
});
