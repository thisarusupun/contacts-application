import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BackgroundOne from "../components/BackgroundOne";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Register = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = newUser;

  const [userError, setUserError] = useState("");

  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      .then((response) => {
        if (response.data.success) {
          toast.success("Account Created", {
            position: "top-center",
            autoClose: 1000,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        setUserError(error.response.data.message);
      });
  };

  return (
    <BackgroundOne>
      {/* register form */}
      <div className="items-center justify-center">
        <h1 className="text-7xl">Register now</h1>

        <form onSubmit={handleRegister} className="my-8 flex flex-col">
          <input
            type="text"
            placeholder="e-mail"
            name="email"
            value={email}
            className="m-2 w-[350px] rounded-xl p-2 text-black"
            onChange={handleInput}
          />

          <div className="flex w-full items-center">
            <input
              type={passwordEye == false ? "password" : "text"}
              placeholder="create password"
              name="password"
              value={password}
              className="m-2 w-[350px] rounded-xl p-2 text-black"
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

          <div className="flex w-full items-center">
            <input
              type={confirmPasswordEye == false ? "password" : "text"}
              placeholder="confirm password"
              className="m-2 w-[350px] rounded-xl p-2 text-black"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInput}
            />
            <div>
              {confirmPasswordEye == false ? (
                <IoMdEyeOff
                  onClick={() => setConfirmPasswordEye(!confirmPasswordEye)}
                />
              ) : (
                <IoMdEye
                  onClick={() => setConfirmPasswordEye(!confirmPasswordEye)}
                />
              )}
            </div>
          </div>

          {userError && <h1 className="text-red-800">{userError}</h1>}

          <div className="my-2 flex justify-between gap-4">
            <button
              type="submit"
              className="rounded-2xl border px-4 py-1 duration-200 hover:scale-110"
            >
              register
            </button>

            <button className="duration-200 hover:scale-110">
              <Link to="/">Back to login</Link>
            </button>
          </div>
        </form>
      </div>
    </BackgroundOne>
  );
};

export default Register;
