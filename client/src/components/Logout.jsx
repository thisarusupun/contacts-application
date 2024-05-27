import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: `Do you want to logout?`,
    showCancelButton: true,
    confirmButtonColor: "#083F46",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      setUser(null);
      navigate("/");
    } else {
      navigate("/contacts");
    }
  });
};
export default Logout;
