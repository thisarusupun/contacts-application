import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import BackgroundOne from "../components/BackgroundOne";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginUser;
  const [loginError, setLoginError] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleInput = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  axios.defaults.withCredentials = true;
  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginUser)
      .then((response) => {
        if (response.data.success) {
          toast.success("Login Successful", {
            position: "top-center",
            autoClose: 1000,
          });
          navigate("/contacts");
          setUser(response.data.user);
          localStorage.setItem("token", response.data.accessToken);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.response.data.message);
      });
  };

  return (
    <BackgroundOne>
      {/* login forum */}
      <div className="items-center justify-center">
        <div className="w-[300px]">
          <h1 className="text-7xl">Hi there,</h1>

          <h2 className="mt-2 text-4xl">Welcome to our contacts portal</h2>
        </div>

        <form onSubmit={handleLogin} className="my-8 flex flex-col">
          <input
            className="m-2 w-[350px] rounded-xl p-2 text-black"
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleInput}
          />

          <div className="flex w-full items-center">
            <input
              className="m-2 w-[350px] rounded-xl p-2 text-black"
              type={passwordEye == false ? "password" : "text"}
              placeholder="password"
              name="password"
              value={password}
              onChange={handleInput}
            />
            <div>
              {passwordEye == false ? (
                <IoMdEyeOff onClick={() => setPasswordEye(!passwordEye)} />
              ) : (
                <IoMdEye onClick={() => setPasswordEye(!passwordEye)} />
              )}
            </div>
          </div>

          {/* display error messages while logging */}
          {loginError && <h1 className="py-2 text-red-800">{loginError}</h1>}

          <div className="my-2 flex justify-between gap-4">
            <button
              type="submit"
              className="rounded-2xl border px-4 py-1 duration-200 hover:scale-110"
            >
              Login
            </button>

            <button className="duration-200 hover:scale-110">
              <Link to="/register">Click here to register</Link>
            </button>
          </div>
        </form>
      </div>
    </BackgroundOne>
  );
};

export default Login;
