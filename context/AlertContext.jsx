import React, { createContext, useContext, useState } from "react";
import CustomAlert from "../components/CustomAlert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    visible: false,
    type: "info",
    title: "",
    message: "",
    buttons: [],
  });

  const showAlert = ({ type = "info", title, message, buttons = [] }) => {
    setAlert({
      visible: true,
      type,
      title,
      message,
      buttons,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <CustomAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        buttons={alert.buttons}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert doit être utilisé dans un AlertProvider");
  }
  return context;
};
