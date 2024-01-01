"use client";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  message: null,
  student: [],
};

export const fetchStudents = createAsyncThunk(
  "content/fetchcontent",
  async () => {
    const { data } = await axios.get("/api/student");
    return data;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    editStudent(state, actions) {
      return {
        loading: fasle,
        message: null,
        student: [
          ...state.map((el) => {
            if (el._id == actions.payload._id) {
              return {
                ...actions.payload,
                name: actions.payload.name,
                reading: actions.payload.reading,
                speaking: actions.payload.speaking,
                listening: actions.payload.listening,
                writing: actions.payload.writing,
              };
            }
            return el;
          }),
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      (state.loading = false), (state.student = action.payload.student);
    });

    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.message = action.payload;
    });
  },
});

export const { editStudent } = studentSlice.actions;

export default studentSlice.reducer;
