import {useAlert} from "../context/AlertContext"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/register/RegisterThunk";
import { resetRegisterState } from "../store/register/RegisterSlice";

export const useRegister = (navigation) =>{  
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const { loading, success, error, message } = useSelector((state) => state.register);  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ville, setVille] = useState("");
  const [showVilles, setShowVilles] = useState(false);
  const handleSignUp = async () => {
    if (!username || !email || !password) {
     
        showAlert({
        type: "error",
        title: "Champs requis",
        message: "Veuillez remplir tous les champs",
      });
      return;
    }
     dispatch(registerUser({
      email,
      password,
      username,
      role: "user",
      ville,
      avatar: "default_pfp.jpg"
    }));
  };

  
  // Effet pour gérer alertes et navigation
  useEffect(() => {
    if (success) {
     

  showAlert({
        type: "success",
        title: "Compte crée",
        message: message,
      });

      setTimeout(() => {
        dispatch(resetRegisterState()); // reset état pour réutilisation
        navigation.navigate("SignIn"); // navigation après succès
      }, 1000);
    }

    if (error) {
   
        showAlert({
        type: "error",
        title: "Création de compte a échoué",
        message: erreur,
      });
    }
  }, [success, error]);

   return {email, setEmail, password, setPassword,username,setUsername,ville,setVille,showVilles,setShowVilles, loading, handleSignUp};
}