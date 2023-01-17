import { Navigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

export default function ProtectAuth({ children }: { children: JSX.Element }) {
  const isLogin = useToken();

  if (isLogin) {
    return children;
  }

  return <Navigate replace to="/auth" />;
}
