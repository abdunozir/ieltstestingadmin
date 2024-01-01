const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

let initialState = {
  questions: [],
  status: "",
  message: "",
  loading: false,
};

export const getPartTwo = createAsyncThunk("fetch/getPartTwo", async () => {
  let { data } = await axios.get("/api/part_two");
  console.log(data);
  return data;
});

let PartTwoSLice = createSlice({
  name: "PartTwo",
  initialState,
  reducers: {
    removeOne(state, actions) {
      return {
        ...state,
        questions: [
          ...state.questions.filter((el) => {
            if (el._id !== actions.payload.id) {
              return el;
            }
          }),
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPartTwo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartTwo.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
      state.questions = action.payload.partTwo;
    });
    builder.addCase(getPartTwo.rejected, (state, action) => {
      state.status = "rejected";
      state.message = action.payload;
    });
  },
});

export const { removeOne } = PartTwoSLice.actions;

export default PartTwoSLice.reducer;
