export type UserSignUp = {
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
};

export type UserLogin = Omit<UserSignUp, "email" | "passwordRepeat">;

export type User = Pick<UserLogin, "username">;
