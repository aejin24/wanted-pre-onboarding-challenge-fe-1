import "../css/auth.css";
import { useState } from "react";

type MODE = "REGISTER" | "LOGIN";

export default function Auth() {
  const [mode, setMode] = useState<MODE>("LOGIN");

  return (
    <div className="wrapper">
      <div className="mode-wrapper">
        <button
          className={`${mode === "LOGIN" && "active"}`}
          onClick={() => { setMode("LOGIN") }}
        >
          로그인
        </button>
        /
        <button
          className={`${mode === "REGISTER" && "active"}`}
          onClick={() => { setMode("REGISTER") }}
        >
          회원가입
        </button>
      </div>

      <div className="input-wrapper">
        <p>email</p>
        <input type="text" name="email" />
      </div>
      <div className="input-wrapper">
        <p>password</p>
        <input type="password" name="password" />
      </div>


      <button type="button">{mode === "LOGIN" ? "로그인" : "회원가입"}</button>
    </div>
  );
}