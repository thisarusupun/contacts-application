import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contacts from "./pages/Contacts";
import AddContacts from "./pages/AddContacts";
import Logout from "./components/Logout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/contacts"
              element={
                <ProtectedRoutes>
                  <Contacts />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/contacts/new"
              element={
                <ProtectedRoutes>
                  <AddContacts />
                </ProtectedRoutes>
              }
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
