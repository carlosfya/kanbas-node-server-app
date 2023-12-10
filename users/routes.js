import * as dao from "./dao.js";

//let currentUser = null;

function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const { userId } = req.params;
    const user = await dao.findUserById(userId);
    res.json(user);
  };
  const findUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
  };
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };


  const signin = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    // res.json({ username, password });
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session["currentUser"] = currentUser;
    if (!currentUser) {
      res.status(403).send("Username or password incorrect");
      return;
    }
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    // currentUser = null;
    res.sendStatus(200);
  };
  const signup = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByUsername(username);
    if (user) {
      res.status(403).send("Username already taken");
      return;
    }
    const currentUser = await dao.createUser({ username, password });
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const account = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(403).send("Not logged in");
      return;
    }
    res.json(currentUser);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};


  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/signup", signup);
  app.post("/api/users/account", account);
  app.post("/api/users", createUser);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/username/:username", findUserByUsername);
  app.get("/api/users/:username/:password", findUserByCredentials);
  app.get("/api/users/:username/:password/:firstName/:lastName", createUser);
  app.post("/api/users", () => {});
  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);

}

export default UserRoutes;