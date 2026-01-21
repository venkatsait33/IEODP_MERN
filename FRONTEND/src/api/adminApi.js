import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/admin/users",
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/${id}/change-status`,
        method: "PATCH",
        body: data,
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/${id}/assign-role`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
} = adminApi;
