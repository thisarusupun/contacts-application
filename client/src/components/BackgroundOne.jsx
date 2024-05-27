import bgi from "../assets/bgi.jpeg";
import contact from "../assets/contact.jpeg";

// this background is used for login and register pages
const BackgroundOne = ({ children }) => {
  return (
    <div
      className="flex h-fit  w-full flex-col bg-cover bg-no-repeat sm:h-screen md:flex-row"
      style={{ backgroundImage: `url(${bgi})` }}
    >
      <div className="flex w-full items-center justify-center rounded-b-[200px] bg-[#083F46]  p-10 text-white md:w-3/5  md:rounded-r-[300px] md:rounded-bl-none">
        {/* login or register form */}
        {children}
      </div>
      <div className="flex w-full items-center justify-center md:w-2/5">
        <div className="m-2 flex h-fit w-fit flex-col items-center justify-center bg-white p-2 text-center md:h-fit md:w-fit">
          <img
            src={contact}
            alt=""
            className="h-10 w-4 md:h-[100px] md:w-[100px]"
          />
          <h1 className="text-3xl font-bold text-[#083F46] md:text-7xl">
            Contacts
          </h1>
          <h1 className="text-3xl text-[#083F46] md:text-7xl">Portal</h1>
        </div>
      </div>
    </div>
  );
};

export default BackgroundOne;
