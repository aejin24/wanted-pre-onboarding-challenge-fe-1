import { Route, Routes } from "react-router-dom";
import { Auth, List } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<List />}/>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
