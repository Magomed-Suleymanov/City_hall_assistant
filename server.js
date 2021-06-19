const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = 8000;
const users = router.db.get("users");
const streets = router.db.get("streets");
const wishes = router.db.get("wishes");


const randomToken = () => {
  let randomString = ''
  const characters = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'
  for (let i = 0; i < characters.length; i++) {
    randomString += characters[getRandom(0, characters.length - 1)]
  }
}
const getRandom = (min, max) => {
  return Math.floor(Math.random() * max - min + 1) + min
}

//Авторизация
server.route("/auth").post((req, res) => {
  const { login, password } = req.body;
  const authUser = users.find(
    (user) => user.login === login && user.password === password
  );
  if (authUser.toJSON() === undefined) {
    res.status(404).json("Ошибка авторизации");
  }
  res.json(authUser);
});

server.route("checkIn").post((req, res) => {});


server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on ${PORT}`);
});
