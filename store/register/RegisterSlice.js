import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./RegisterThunk"; // thunk à créer

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null, // message de succès du backend
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload; // message du backend
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload; // message d’erreur
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
