import "../assets/css/auth.css";
import { useEffect, useRef, useState } from "react";
import { IAuth, MODE } from "../types/auth";
import { useMutation } from "react-query";
import { auth } from "../services/mutations";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../utils";
import { Modal, Loading } from "../components/common";

export default function Auth() {
  const submitHandler = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<MODE>("LOGIN");
  const [userInfo, setUserInfo] = useState<IAuth>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    if (
      /[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,}$/i.test(userInfo.email) &&
      userInfo.password.length > 6
    ) {
      submitHandler.current!.disabled = false;
    } else {
      submitHandler.current!.disabled = true;
    }
  };

  // mutation은 unique key가 필요 없음
  const { mutateAsync, error, isError, isLoading } = useMutation(auth);

  const onSubmitHandler = async () => {
    const res = await mutateAsync({ ...userInfo, mode });

    if (res.token) {
      localStorage.setItem("token", res.token);

      if (mode === "LOGIN") {
        navigate("/");
      } else {
        alert("회원가입 성공!\n로그인을 해주세요");

        setMode("LOGIN");
        setUserInfo({
          email: "",
          password: "",
        });
      }
    }
  };

  useEffect(() => {
    submitHandler.current!.disabled = true;
  }, []);

  return (
    <div className="wrapper">
      {isLoading && <Loading />}

      {isError && <Modal message={getErrorMessage(error)} />}

      <div className="toggle-wrapper">
        <button
          className={`${mode === "LOGIN" && "active"}`}
          onClick={() => {
            setMode("LOGIN");
          }}
        >
          로그인
        </button>
        /
        <button
          className={`${mode === "REGISTER" && "active"}`}
          onClick={() => {
            setMode("REGISTER");
          }}
        >
          회원가입
        </button>
      </div>

      <div className="input-wrapper">
        <input
          type="text"
          name="email"
          placeholder="user@example.com"
          onChange={onChangeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={onChangeHandler}
        />

        <button ref={submitHandler} onClick={onSubmitHandler} type="button">
          {mode === "LOGIN" ? "로그인" : "회원가입"}
        </button>
      </div>
    </div>
  );
}
