import { Route, Routes } from "react-router-dom";
import { Auth, Input, List } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<List />} />
      <Route path="/write" element={<Input mode="CREATE" />} />
      <Route path="/update/:id" element={<Input mode="UPDATE" />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
