import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundTwo from "../components/BackgroundTwo";

const AddContacts = () => {
  const navigate = useNavigate();

  const [contact, SetContact] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  const { name, email, phone, gender } = contact;

  const [newContactError, setNewContactError] = useState();

  const handleInput = (e) => {
    SetContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/contacts`, contact, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/contacts");
      })
      .catch((error) => {
        console.log(error);
        setNewContactError(error.response.data.message);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/contacts");
  };
  return (
    <BackgroundTwo>
      <h1 className="py-4 text-5xl">New Contact</h1>

      <form>
        <div className="m-8 gap-2">
          <div className="flex flex-row">
            <input
              className="m-2 w-full rounded-xl p-2 text-black"
              type="text"
              name="name"
              placeholder="full name"
              value={name}
              onChange={handleInput}
            />

            <input
              className="m-2 w-full rounded-xl p-2 text-black"
              type="text"
              name="email"
              placeholder="e-mail"
              value={email}
              onChange={handleInput}
            />
          </div>

          <div className="flex">
            <input
              className="m-2 w-1/2 rounded-xl p-2 text-black"
              type="text"
              name="phone"
              placeholder="phone-number"
              value={phone}
              onChange={handleInput}
            />

            <div className="flex w-1/2 flex-row items-center px-2">
              <label>Gender:</label>

              <div className="flex w-full justify-evenly">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleInput}
                  />
                  <p>male</p>
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleInput}
                    className=""
                  />
                  <p>female</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* display error messages while creating new contacts */}
        {newContactError && (
          <h1 className="py-2 text-red-800">{newContactError}</h1>
        )}

        <div className="mx-8 flex gap-10 py-2">
          <button
            type="submit"
            className="rounded-2xl border px-4 py-1"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-2xl border px-4 py-1"
            onClick={handleSubmit}
          >
            Add contact
          </button>
        </div>
      </form>
    </BackgroundTwo>
  );
};

export default AddContacts;
