import { useContext } from "react";
import bgi from "../assets/bgi.jpeg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// background two is used for contacts list and add contacts pages
const BackgroundTwo = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      className="flex h-auto w-full  flex-col bg-cover bg-no-repeat md:flex-row"
      style={{ backgroundImage: `url(${bgi})` }}
    >
      <div className="flex min-h-screen min-w-fit flex-col items-center justify-start rounded-bl-[100px] rounded-tr-[100px] bg-[#083F46] text-white md:w-full  md:rounded-bl-[200px] md:rounded-tr-[200px]">
        <div className="h-fit w-full items-start justify-start p-4 md:p-10">
          {children}
          <div className="mx-8 my-2 flex justify-between">
            <h1 className="text-xl">{user && user.email}</h1>

            <button className="flex items-center duration-200 hover:scale-105">
              <RiLogoutCircleLine />
              <Link to="/logout" className="p-2">
                Logout
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTwo;
