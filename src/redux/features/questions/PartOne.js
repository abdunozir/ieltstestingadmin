const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

let initialState = {
  questions: [],
  status: "",
  message: "",
  loading: false,
};

export const getPartOne = createAsyncThunk("fetch/getPartOne", async () => {
  let { data } = await axios.get("/api/part_one");
  console.log(data);
  return data;
});

let PartOneSLice = createSlice({
  name: "PartOne",
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
    builder.addCase(getPartOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPartOne.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.loading = false;
      state.questions = action.payload.partOne;
    });
    builder.addCase(getPartOne.rejected, (state, action) => {
      state.status = "rejected";
      state.message = action.payload;
    });
  },
});

export const { removeOne } = PartOneSLice.actions;

export default PartOneSLice.reducer;
