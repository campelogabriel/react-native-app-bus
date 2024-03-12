import { configureStore } from "@reduxjs/toolkit";
import lineReducer from "./sliceLines/sliceLines";
import positionReducer from "./slicePositions/slicePositions";
import darkModeReducer from "./sliceDarkMode/sliceDarkMode";
import settingsReducer from "./sliceSettings/sliceSettings";
// ...

export const store = configureStore({
  reducer: {
    lines: lineReducer,
    positions: positionReducer,
    settings: settingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export default store;
