import { Route, Routes } from "react-router-dom";
import { ProtectAuth } from "./components/common";
import { Auth, Input, List } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <ProtectAuth>
            <List />
          </ProtectAuth>
        }
      />
      <Route
        path="/write"
        element={
          <ProtectAuth>
            <Input mode="CREATE" />
          </ProtectAuth>
        }
      />
      <Route
        path="/update/:id"
        element={
          <ProtectAuth>
            <Input mode="UPDATE" />
          </ProtectAuth>
        }
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
