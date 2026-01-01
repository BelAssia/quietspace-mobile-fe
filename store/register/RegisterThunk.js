import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ email, password, username, role, ville, avatar }, { rejectWithValue }) => {
    try {
      const response = await authService.register({ email, password, username, role, ville, avatar });
      // return response.data.message || "Compte créé avec succès";
       return response.message;
    } catch (error) {
      console.log("Erreur backend:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la création du compte");
    }
  }
);
