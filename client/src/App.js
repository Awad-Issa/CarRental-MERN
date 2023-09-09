import LoginPage from "./components/users/LoginPage";
import SignUpPage from "./components/users/SignUpPage";
import UserList from "./components/users/UersList";
import Home from "./components/users/Home";
import {Route, Routes} from "react-router-dom";
import CarPage from "./components/users/CarPage";
import AdminPage from "./components/users/AdminPage";
import Empty from "./components/users/Empty";
import AboutUs from "./components/users/AboutUs";
import ContactUs from "./components/users/ContactUs";


function App() {
  return (
      <Routes>
        {/* <CreateProject path="/new" /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/getallusers" element={<UserList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/car/:id" element={<CarPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* <Dashboard path="/" /> */}
      </Routes>
  );
}

export default App;
