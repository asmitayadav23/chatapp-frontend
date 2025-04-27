import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import adminApi from "./api/adminApi"; // ✅ import new adminApi
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
    [adminApi.reducerPath]: adminApi.reducer, // ✅ add adminApi reducer
  },
  middleware: (mid) => [...mid(), api.middleware, adminApi.middleware], // ✅ add adminApi middleware
});

export default store;
