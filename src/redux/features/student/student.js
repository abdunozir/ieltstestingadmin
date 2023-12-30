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
    loadingStudent() {
      return {
        ...state,
        loading: true,
        message: null,
      };
    },
    loadingStudentSuccess() {
      return {
        ...state,
        loading: fasle,
        message: null,
      };
    },
    loadingStudentError() {
      return {
        ...state,
        loading: fasle,
        message: actions.payload.message,
      };
    },
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
    getStudent(state, payload) {
      return {
        message: null,
        loading: false,
        student: [...actions.payload.student],
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

export const {
  editStudent,
  loadingStudent,
  loadingStudentError,
  loadingStudentSuccess,
  getStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
