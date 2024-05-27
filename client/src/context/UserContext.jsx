import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [editContact, setEditContact] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/current`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, editContact, setEditContact }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
