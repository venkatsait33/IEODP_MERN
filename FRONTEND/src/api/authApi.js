import { baseApi } from "./baseApi";

// export const authApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: (credentials) => ({
//                 url: "/auth/login",
//                 method: "POST",
//                 body: credentials,
//             }),
//         }),
// refreshToken: builder.mutation({
//     query: (refreshToken) => ({
//         url: "/auth/refresh",
//         method: "POST",
//         body: { refreshToken },
//     }),
// }),

// forgotPassword: builder.mutation({
//     query: (email) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         body: { email },
//     }),
// }),

//     verifyOtp: builder.mutation({
//         query: (data) => ({
//             url: "/auth/verify-otp",
//             method: "POST",
//             body: data,
//         }),
//     }),

//         resetPassword: builder.mutation({
//             query: (data) => ({
//                 url: "/auth/reset-password",
//                 method: "POST",
//                 body: data,
//             }),
//         }),



//         logout: builder.mutation({
//             query: () => ({
//                 url: "/auth/logout",
//                 method: "POST",
//             }),
//         }),
//     }),
// });

// export const { useLoginMutation,useRefreshTokenMutation , useLogoutMutation } = authApi;


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            queryFn: async (credentials, _queryApi, _extraOptions, fetchWithBQ) => {
                const result = await fetchWithBQ({
                    url: `/users?email=${credentials.email}&password=${credentials.password}`,
                    method: "GET",
                });

                if (result.data && result.data.length > 0) {
                    const user = result.data[0];

                    return {
                        data: {
                            token: "demo-token",
                            user,
                        },
                    };
                }

                return {
                    error: {
                        status: 401,
                        data: "Invalid credentials",
                    },
                };
            },
        }),


        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;


