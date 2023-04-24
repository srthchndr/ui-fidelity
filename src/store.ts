import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './views/MainView/employeeReducer';

export const store = configureStore({
  reducer: {
    details: employeeReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch