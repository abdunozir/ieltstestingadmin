"use client";

import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./features/student/student";
import PartOneSLice from "./features/questions/PartOne";
import PartTwoSLice from "./features/questions/PartTwo";

export const store = configureStore({
  reducer: {
    students: studentSlice,
    PartOne: PartOneSLice,
    PartTwo: PartTwoSLice,
  },
});
