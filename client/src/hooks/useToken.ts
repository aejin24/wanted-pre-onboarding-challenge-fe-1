import { useEffect, useState } from "react";

export default function useToken() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const { token } = localStorage;
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return isLogin;
}
