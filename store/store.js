import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import registrReducer from "./register/RegisterSlice";

const store = configureStore({//simplifie la creation de store dans reduc toolkit
  reducer: {
    auth: authReducer,
    register: registrReducer,
  },
});
export default store;

