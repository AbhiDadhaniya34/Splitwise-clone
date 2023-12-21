import Login from "./Componets/Login";
import Addgroup from "./page/Addgroup";
import Home from "./page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Login />} />
          <Route path="home/:id" element={<Home/>}/>
          <Route path="addgroup/:id" element={<Addgroup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
