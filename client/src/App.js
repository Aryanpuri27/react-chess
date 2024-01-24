import "./App.css";
import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import Authhandel from "./component/auth/authhandel";
import Login from "./component/auth/login";
import Signup from "./component/auth/signup";
import Forgotpassword from "./component/auth/forgotpassword";
import Pages from "./Page";
function App() {
  return (
    <div className="App flex-col ">
      {/* auth routes */}
      <Routes>
        <Route path="/*" element={<Pages />}></Route>
        {/* <Route path="/board" element={<Pages />} /> */}

        <Route path="/auth" exact element={<Authhandel />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
