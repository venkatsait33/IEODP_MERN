import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         baseUrl: import.meta.env.VITE_API_URL,
//         prepareHeaders: (headers, { getState }) => {
//             const token = getState().auth.token;
//             if (token) {
//                 headers.set("authorization", `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     tagTypes: [
//         "Users",
//         "Workflows",
//         "Tasks",
//         "Approvals",
//         "Insights",
//         "Audits",
//     ],
//     endpoints: () => ({}),
// });

// this is fetching the data from mock-json server

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Users", "Tickets"],
  endpoints: () => ({}),
});

// After the backend API use this code

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logout } from "../auth/authSlice";
// import { getRefreshToken, clearRefreshToken } from "../utils/tokenService";

// const baseQuery = fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.accessToken;
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);

//     if (result?.error?.status === 401) {
//         const refreshToken = getRefreshToken();

//         if (!refreshToken) {
//             api.dispatch(logout());
//             return result;
//         }

//         const refreshResult = await baseQuery(
//             {
//                 url: "/auth/refresh",
//                 method: "POST",
//                 body: { refreshToken },
//             },
//             api,
//             extraOptions
//         );

//         if (refreshResult?.data) {
//             api.dispatch(
//                 setCredentials({
//                     user: refreshResult.data.user,
//                     accessToken: refreshResult.data.accessToken,
//                 })
//             );

//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             clearRefreshToken();
//             api.dispatch(logout());
//         }
//     }

//     return result;
// };

// export const baseApi = createApi({
//     reducerPath: "api",
//     baseQuery: baseQueryWithReauth,
//     tagTypes: ["Users", "Tickets", "Audits"],
//     endpoints: () => ({}),
// });
