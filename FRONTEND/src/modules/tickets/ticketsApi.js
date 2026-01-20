import { baseApi } from "../../api/baseApi";

export const ticketsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: ({ page = 1, limit = 10, status, priority, search } = {}) => {
        let queryString = `/ticket?page=${page}&limit=${limit}`;

        if (status) queryString += `&status=${status}`;
        if (priority) queryString += `&priority=${priority}`;
        if (search) queryString += `&search=${search}`;

        return queryString;
      },
      providesTags: ["Tickets"],
    }),

    getTicketById: builder.query({
      query: (id) => `/ticket/${id}`,
      providesTags: (result, error, id) => [{ type: "Tickets", id }],
    }),

    createTicket: builder.mutation({
      query: (data) => ({
        url: "/ticket/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),

    updateTicket: builder.mutation({
      query: ({ id, data }) => ({
        url: `/ticket/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (r, e, { id }) => ["Tickets", { type: "Tickets", id }],
    }),

    addTicketAction: builder.mutation({
      query: ({ id, actionType, comment }) => ({
        url: `/ticket/${id}/action`,
        method: "POST",
        body: { actionType, comment },
      }),
      invalidatesTags: (r, e, { ticketId }) => [
        "Tickets",
        { type: "Tickets", ticketId },
      ],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useAddTicketActionMutation,
  useGetTicketByIdQuery,
} = ticketsApi;
