
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/AuthThunk";
import { useState } from "react";
import {useAlert} from "../context/AlertContext"

export const useAuth = () =>{
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
 
  const loading = useSelector((state)=> state.auth.loading);
  const handleLogin = async () => {
    
     if (!email || !password) {
      showAlert({
        type: "warning",
        title: "Champs requis",
        message: "Veuillez remplir tous les champs",
      });
      return;
    }
     // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert({
        type: "error",
        title: "Email invalide",
        message: "Veuillez entrer une adresse email valide",
      });
      return;
    }
    
    const resultAction = await dispatch(
      loginUser({ email, password })
    );

    if (loginUser.rejected.match(resultAction)) {
      
      showAlert({
        type: "error",
        title: "Connexion échouée",
        message: resultAction.payload || "Identifiants incorrects",
      });
      return;
    }

     showAlert({
      type: "success",
      title: "Connexion réussie",
      message: "Bienvenue !",
    });
      
    };
    return {email, setEmail, password, setPassword, loading, handleLogin};

  };
