// https://jsonplaceholder.typicode.com/posts/1
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
    reducerPath: "postAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com/"
    }),
    endpoints: (builder) => ({
        getPostById: builder.query({
            query: ({ id }) => `posts/${id}`
        })
    })
});

export const { useGetPostByIdQuery } = postApi;