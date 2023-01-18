const config = require("config");
const { connectDatabase, disconnectDatabase } = require("../../db");
const {
  createPost,
  deletePost,
  getPost,
  likePost,
  unlikePost,
  createComment,
  getAllPosts,
} = require("../factories/post");
const createSession = require("../utils/createSession");
const randomToken = require("../utils/randomToken");

beforeAll(async () => {
  const { DB_URL } = config.get("DB");
  await connectDatabase(`${DB_URL}/test_${randomToken()}`);
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /api/posts", () => {
  describe("Post successful creation check", () => {
    it("should answer with status code 200 and with proper data and database having this post", async () => {
      const bodyExpected = {
        title: expect.any(String),
        description: expect.any(String),
        postId: expect.any(String),
        createdTime: expect.any(String),
      };

      const token = await createSession();
      const response = await createPost([], `Bearer ${token}`);
      const createdPost = await getPost(
        `Bearer ${token}`,
        response.body.postId
      );
      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body).toEqual(bodyExpected);
      expect(createdPost.status).toEqual(200);
    });
  });

  describe("post creation with no token provided", () => {
    it("should answer with status code 401", async () => {
      const response = await createPost([], `notSet`);
      const { status, body } = response;
      expect(status).toEqual(401);
    });
  });

  describe("post creation with title field empty", () => {
    it("should answer with status code 400", async () => {
      const token = await createSession();
      const response = await createPost(["titleEmpty"], `Bearer ${token}`);
      const { status, body } = response;
      expect(status).toEqual(400);
    });
  });

  describe("post creation with description field empty", () => {
    it("should answer with status code 400", async () => {
      const token = await createSession();
      const response = await createPost(
        ["descriptionEmpty"],
        `Bearer ${token}`
      );
      const { status, body } = response;
      expect(status).toEqual(400);
    });
  });
});

describe("DELETE /api/posts/:id", () => {
  describe("post deletion successfull check", () => {
    it("should anwer with status code 200 and database not having this post", async () => {
      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await deletePost(`Bearer ${token}`, post.body.postId);
      const deletedPost = await getPost(`Bearer ${token}`, post.body.postId);
      const { status } = response;
      expect(status).toEqual(200);
      expect(deletedPost.status).toEqual(400);
    });
  });

  describe("post deletion with token not provided", () => {
    it("should answer with status code 401", async () => {
      const response = await deletePost(`notSet`, "randomToken");
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("POST /api/like/:id", () => {
  describe("post liked successfull check", () => {
    it("should answer with status code 200 and post likes should be equal to 1", async () => {
      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await likePost(`Bearer ${token}`, post.body.postId);
      const likedPost = await getPost(`Bearer ${token}`, post.body.postId);

      const { status } = response;
      expect(status).toEqual(200);
      expect(likedPost.body.likes).toEqual(1);
    });
  });

  describe("post liked when post not found", () => {
    it("should answer with status code 400 and with message 'Post not found'", async () => {
      const token = await createSession();
      const response = await likePost(
        `Bearer ${token}`,
        "63c6dd8384e6862980e4a602"
      );

      const { status, body } = response;
      expect(status).toEqual(400);
      expect(body.message).toEqual("Post not found");
    });
  });

  describe("post liked with no token provided", () => {
    it("should answer with status code 401", async () => {
      const response = await likePost(`notSet`, "randomToken");
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("POST /api/unlike/:id", () => {
  describe("post unliked successfull check", () => {
    it("should answer with status code 200 and post likes should be equal to 0", async () => {
      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await unlikePost(`Bearer ${token}`, post.body.postId);
      const unlikedPost = await getPost(`Bearer ${token}`, post.body.postId);

      const { status } = response;
      expect(status).toEqual(200);
      expect(unlikedPost.body.likes).toEqual(0);
    });
  });

  describe("post unliked when post not found", () => {
    it("should answer with status code 400 and with message 'Post not found'", async () => {
      const token = await createSession();
      const response = await unlikePost(
        `Bearer ${token}`,
        "63c6dd8384e6862980e4a602"
      );

      const { status, body } = response;
      expect(status).toEqual(400);
      expect(body.message).toEqual("Post not found");
    });
  });

  describe("post unliked with no token provided", () => {
    it("should answer with status code 401", async () => {
      const response = await unlikePost(`notSet`, "randomToken");
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("POST /api/comment/:id", () => {
  describe("comment creation successfull check", () => {
    it("should answer with status 200 and ,valid comment id and post should contain 1 comment", async () => {
      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await createComment(
        [],
        `Bearer ${token}`,
        post.body.postId
      );
      const commentedPost = await getPost(`Bearer ${token}`, post.body.postId);
      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body.commentId).toEqual(expect.any(String));
      expect(commentedPost.body.comments.length).toEqual(1);
    });
  });

  describe("comment creation when post not found", () => {
    it("should answer with status 400 and with message 'Post not found' ", async () => {
      const token = await createSession();
      const response = await createComment(
        [],
        `Bearer ${token}`,
        "63c6dd8384e6862980e4a602"
      );
      const { status, body } = response;
      expect(status).toEqual(400);
      expect(body.message).toEqual("Post not found");
    });
  });

  describe("comment creation with comment field empty", () => {
    it("should answer with status 400", async () => {
      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await createComment(
        ["commentEmpty"],
        `Bearer ${token}`,
        post.body.postId
      );
      const { status } = response;
      expect(status).toEqual(400);
    });
  });

  describe("comment creation with not token provided", () => {
    it("should answer with status 401", async () => {
      const response = await createComment([], `notSet`, "randomToken");
      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("GET /api/posts/:id", () => {
  describe("post get successfully check", () => {
    it("should answer with status code 200 and with proper data", async () => {
      const bodyExpected = {
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        created_at: expect.any(String),
        comments: expect.arrayContaining([]),
        likes: expect.any(Number),
      };

      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await getPost(`Bearer ${token}`, post.body.postId);

      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body).toEqual(bodyExpected);
    });
  });

  describe("post get when post is not found", () => {
    it("should answer with status code 400 and with message 'Post not found'", async () => {
      const token = await createSession();
      const response = await getPost(
        `Bearer ${token}`,
        "63c6dd8384e6862980e4a602"
      );

      const { status, body } = response;
      expect(status).toEqual(400);
      expect(body.message).toEqual("Post not found");
    });
  });

  describe("post get with no token provided", () => {
    it("should answer with status code 401", async () => {
      const response = await getPost(`notSet`, "randomToken");

      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});

describe("GET /api/all_posts", () => {
  describe("all post get successfully check", () => {
    it("should answer with status code 200 and with proper data", async () => {
      const bodyExpected = {
        posts: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            created_at: expect.any(String),
            comments: expect.arrayContaining([]),
            likes: expect.any(Number),
          }),
        ]),
      };

      const token = await createSession();
      const post = await createPost([], `Bearer ${token}`);
      const response = await getAllPosts(`Bearer ${token}`);

      const { status, body } = response;
      expect(status).toEqual(200);
      expect(body).toEqual(bodyExpected);
    });
  });

  describe(" all post get with no token provided", () => {
    it("should answer with status code 401", async () => {
      const response = await getAllPosts(`notSet`);

      const { status } = response;
      expect(status).toEqual(401);
    });
  });
});
