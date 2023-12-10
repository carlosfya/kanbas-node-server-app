import * as dao from "./dao.js";

function LikesRoutes(app) {
  const createUserLikesPost = async (req, res) => {
    const { userId, postId, title } = req.params;
    if (userId === undefined) {
      const user = req.session.currentUser._id;
      const like = await dao.createUserLikesPost(user, postId, title);
      res.json(like);
      return;
    }
    const like = await dao.createUserLikesPost(userId, postId, title);
    res.json(like);
  };
  const deleteUserLikesPost= async (req, res) => {
    const { userId, postId } = req.params;
    if (userId === undefined) {
      const user = req.session.currentUser._id;
      const status = await dao.deleteUserLikesPost(userId, postId);
      res.json(status);
      return;
    }
    const status = await dao.deleteUserLikesPost(userId, postId);
    res.json(status);
  };
  const findUsersLikedPost = async (req, res) => {
    const { postId } = req.params;
    const users = await dao.findUsersLikedPost(postId);
    res.json(users);
  };
  const findPostsLikedByUser = async (req, res) => {
    const { userId } = req.params;
    const albums = await dao.findPostsLikedByUser(userId);
    res.json(albums);
  };

  app.post("/api/users/:userId/likes/:postId", createUserLikesPost);
  app.post("/api/users/likes/:postId/title/:title", createUserLikesPost);
  app.delete("/api/users/:userId/likes/:postId", deleteUserLikesPost);
  app.delete("/api/users/likes/:postId", deleteUserLikesPost);
  app.get("/api/posts/:userId/likes", findUsersLikedPost);
  app.get("/api/users/:userId/likes", findPostsLikedByUser);
}

export default LikesRoutes;