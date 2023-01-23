import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import secureSlice from "./secureSlice";
import newsSlice from "./newsSlice";
import commentsSlice from "./commentsSlice";

export const store = configureStore({
  reducer: {
    secure: secureSlice,
    news: newsSlice,
    comments: commentsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})
