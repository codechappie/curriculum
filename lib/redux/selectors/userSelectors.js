import { createSelector } from '@reduxjs/toolkit';

export const selectUserById = (postId) =>
    createSelector(
        (state) => state.api.queries.getUserById[postId],
        (user) => user?.data
    );