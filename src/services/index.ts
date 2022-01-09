import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { JwtToken } from "src/models/Token";
import { User, UserLogin, UserSignUp } from "../models/User";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token?.token;
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation<{ user: User; token: JwtToken }, UserLogin>({
      query: ({ username, password }) => ({
        url: `login`,
        method: "POST",
        body: { username, password },
      }),
    }),
    signUp: build.mutation<string, UserSignUp>({
      query: ({ username, email, password }) => ({
        url: `signup`,
        method: "POST",
        body: { username, email, password },
      }),
    }),
  }),
});

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery,
  endpoints: (build) => ({
    getData: build.query<{ data: any[] }, void>({
      query: () => ({
        url: `data`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
export const { useGetDataQuery } = dataApi;
