import appAPI from "../api/appAPI";

const authService ={
    login: async(credentials) => {
        const response = await appAPI.post("/auth/login",credentials);
        console.log(response.data.access_token);
        return response.data;
    },

    register: async(credentials)=>{
        const  response = await appAPI.post("/auth/register",credentials);
        console.log(response.data.message);
        return response.data;
    }
};



export default authService;