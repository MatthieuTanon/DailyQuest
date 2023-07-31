import { configureStore } from '@reduxjs/toolkit';

import questReducer from './features/quest';

export const store = configureStore({
  reducer: {
    quest: questReducer,
  }
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself for useSelector and useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;