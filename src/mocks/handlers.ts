import { rest } from "msw";
import { nanoid } from "@reduxjs/toolkit";
import { UserLogin, UserSignUp } from "src/models/User";
import { DataGenerator } from "src/utils/dataGenerator";

const dataGenerator = new DataGenerator();

const inMemoryStorage = {
  users: [
    { username: "admin", password: "admin", email: "admin@site.com" },
    { username: "test", password: "test", email: "test@example.com" },
  ],
  data: dataGenerator.generate(20),
};

const [token, refreshToken] = [nanoid(), nanoid()];

const login = rest.post("/login", (req, res, ctx) => {
  const { username, password } = req.body as UserLogin;
  const user = inMemoryStorage.users.find((user) => user.username === username);
  if (user && user.password === password) {
    return res(
      ctx.delay(400),
      ctx.status(200),
      ctx.json({
        user: {
          username,
        },
        token: {
          token,
          refreshToken,
        },
      })
    );
  }
  return res(
    ctx.status(404),
    ctx.json({
      errorMessage: `User '${username}' not found`,
    })
  );
});

const signup = rest.post("/signup", (req, res, ctx) => {
  const { username, email, password } = req.body as UserSignUp;
  let errorMessage;
  // TODO: Optimize two 'if' statements below
  if (inMemoryStorage.users.find((user) => user.email === email)) {
    errorMessage = `Email ${email} is already in use`;
  }
  if (inMemoryStorage.users.find((user) => user.username === username)) {
    errorMessage = `Username '${username}' is already in use`;
  }

  if (errorMessage) {
    return res(
      ctx.delay(300),
      ctx.status(422),
      ctx.json({
        errorMessage,
      })
    );
  }

  inMemoryStorage.users.push({ username, email, password });

  return res(
    ctx.delay(400),
    ctx.status(200),
    ctx.text("User created successfully")
  );
});

const getData = rest.get("/data", (req, res, ctx) => {
  const headers = req.headers._headers;
  if (headers.authentication !== `Bearer ${token}`) {
    return res(
      ctx.json({ message: "You must be authorized for this request" }),
      ctx.status(401)
    );
  }
  return res(
    ctx.delay(1000),
    ctx.status(200),
    ctx.json({
      data: inMemoryStorage.data,
    })
  );
});

export const handlers = [login, signup, getData];
