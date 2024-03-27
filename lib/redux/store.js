import { postApi } from '@/lib/redux/services/post'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from './userSlice'
import store from '@/lib/redux/store'
import { userApi } from './services/user'

export default configureStore({
  reducer: {
    userSlice,
    // [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware])
});

setupListeners(store.dispatch)