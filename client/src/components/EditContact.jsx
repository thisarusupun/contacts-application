// EditContact.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FL from "../assets/fi.png";
import ML from "../assets/mi.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditContact = ({ id }) => {
  const navigate = useNavigate();
  const { setEditContact } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUpdatedUser(response.data);
      });
  }, [id]);

  const handleSave = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/contacts/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/contacts");
      });

    setEditContact(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditContact(false);
    navigate("/contacts");
  };

  const handleInput = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  return (
    <tr key={id} className="rounded-md border border-teal-400 p-2">
      <td className=" hidden text-center md:block ">
        {updatedUser.gender === "female" ? (
          <img src={FL} className="w-8" />
        ) : (
          <img src={ML} className="w-8" />
        )}
      </td>
      <td>
        <input
          className="w-fit text-center"
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleInput}
        />
      </td>

      <td>
        <select name="gender" onChange={handleInput}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </td>
      <td>
        <input
          className="text-center"
          type="text"
          name="email"
          value={updatedUser.email}
          onChange={handleInput}
        />
      </td>
      <td>
        <input
          className="text-center"
          type="text"
          name="phone"
          value={updatedUser.phone}
          onChange={handleInput}
        />
      </td>
      <td className="flex gap-2">
        <button
          onClick={handleSave}
          className="rounded-2xl border bg-green-950 px-2 py-1 text-white"
        >
          Save
        </button>

        <button
          onClick={handleCancel}
          className="rounded-2xl border border-green-950 bg-white px-2 py-1 text-green-950"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditContact;
