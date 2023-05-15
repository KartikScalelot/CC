import { toast } from "react-toastify";
import { baseurl } from "../../../api/baseurl";
import axios from "axios";
import { store } from "../../../redux/store";
import { setLoading } from "./events";
import { history } from "../../_utils";

export const handleSubmit = async (data) => {
    const { userData } = store.getState().authState

    data.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post(`${baseurl}/api/user/login-admin`, { email: userData.email, password: userData.password });
        if (response.data?.IsSuccess) {
            toast.success("Login successfully.");
            setTimeout(() => {
                localStorage.clear();
                localStorage.setItem("Token", response.data?.Data.token);

               history.navigate("../dashboard");
            }, 1000);
            setLoading(false);
        } else {
            toast.error(response.data.Message);
            setLoading(false);
        }
    } catch (error) {
        toast.error("Something went wrong!!");
        setLoading(false);
    }
}