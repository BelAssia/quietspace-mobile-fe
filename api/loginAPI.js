import axios from "axios";
const loginAPI= axios.create(
    {
        baseURL: "https://473f679c-4f96-4d0a-ba2d-88101252004b.mock.pstmn.io",
        timeout:5000,
        headers:
        {
            "Content-Type": "application/json",
        },
    }
);
export default loginAPI;