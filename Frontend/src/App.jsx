import "./App.css";
import Login from "./Login";
import Register from "./Register";
import UserList from "./UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <UserList></UserList> */}
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/Home" element={<UserList></UserList>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
