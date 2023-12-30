"use client";

import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/student/student";

export const store = configureStore({
  reducer: {
    students: studentSlice,
  },
});
