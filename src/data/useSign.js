import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { defaultInstance } from "./useAuth";

const useSign = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(false);

    const onSingup = (email, pw) => {
        defaultInstance
            .post("/auth/signup", {
                email: email,
                password: pw,
            })
            .then((res) => {
                const token = res.data.access_token;
                if (token !== undefined) {
                    localStorage.setItem("access_token", token);
                    setUser(true);
                    alert("회원가입에 성공했습니다.");
                    navigate("/todo");
                }
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                    console.log(error);
                }
            });
    };

    const onLogin = (email, pw) => {
        defaultInstance
            .post("/auth/signin", {
                email: email,
                password: pw,
            })
            .then((res) => {
                const token = res.data.access_token;
                if (token !== undefined) {
                    localStorage.setItem("access_token", token);
                    alert(`${email}님 안녕하세요!`);
                    navigate("/todo");
                }
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    alert(error.response?.data.message);
                    console.log(error);
                }
            });
    };

    return {
        onSingup,
        onLogin,
    };
};

export default useSign;