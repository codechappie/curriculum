// https://jsonplaceholder.typicode.com/posts/1
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
    }),
    tagTypes: ["getUser"],
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: ({ id }) => `user/${id}`,
            providesTags: ["getUser"]
        }),
        updateUsername: builder.mutation({
            query: ({ id, body }) => ({
                url: `user/${id}/username`,
                method: "PUT",
                body
            }),
            transformResponse: (response, meta, arg) => response,
            transformErrorResponse: (
                response,
                meta,
                arg
            ) => response,
            invalidatesTags: ["getUser"]
        })
    })
});

export const { useGetUserByIdQuery, useUpdateUsernameMutation } = userApi;