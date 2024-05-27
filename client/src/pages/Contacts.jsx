import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import FL from "../assets/fi.png";
import ML from "../assets/mi.png";
import DeleteContact from "../components/DeleteContact";
import EditContact from "../components/EditContact";
import BackgroundTwo from "../components/BackgroundTwo";
import { UserContext } from "../context/UserContext";

const Contacts = () => {
  const [contacts, setContacts] = useState();
  const [editId, setEditId] = useState();

  const { editContact, setEditContact } = useContext(UserContext);

  // get all contacts
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setContacts(response.data.contacts);
      })
      .catch((error) => console.log(error));
  }, []);

  // edit contacts
  const handleEdit = (id) => {
    setEditId(id);
    setEditContact(true);
  };

  return (
    <BackgroundTwo>
      <div className="h-fit w-full">
        {contacts && contacts.length === 0 ? (
          // add first contact
          // this shows for new users
          <>
            <div className="m-4 h-fit">
              <h1 className="text-5xl">Welcome</h1>
              <h2 className="my-2 text-3xl">
                This is where your contacts will live. Click the button below to
                add a new contact.
              </h2>
              <button className="mt-10 rounded-xl border p-2 px-2 text-2xl">
                <Link to={`/contacts/new`}>add your first contact</Link>
              </button>
            </div>
          </>
        ) : (
          // show contact list
          <>
            <div className="my-2 flex justify-between">
              <h1 className="text-5xl">Contacts</h1>
              <button className="m-4 rounded-xl border px-4 py-2 duration-200 hover:scale-105">
                <Link to="/contacts/new">Add Contact</Link>
              </button>
            </div>

            <div className="mx-2 h-fit w-full rounded-lg bg-white px-4 py-2 text-[#083F46] md:text-2xl">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="hidden md:block"></th>
                    <th className="px-2">full name</th>
                    <th className="px-2">gender</th>
                    <th className="px-2">email</th>
                    <th className="px-2">phone number</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts &&
                    contacts.map((contact) =>
                      contact._id === editId && editContact == true ? (
                        <EditContact key={contact._id} id={contact._id} />
                      ) : (
                        <tr
                          key={contact._id}
                          className="group duration-200 hover:scale-105 hover:text-green-700"
                        >
                          <td className="hidden pl-4 md:block">
                            {contact.gender === "female" ? (
                              <img src={FL} className="w-8" />
                            ) : (
                              <img src={ML} className="w-8" />
                            )}
                          </td>
                          <td className="text-center">{contact.name}</td>
                          <td className="text-center">{contact.gender}</td>
                          <td className="text-center">{contact.email}</td>
                          <td className="text-center">{contact.phone}</td>

                          <td className="text-center">
                            <div className="flex justify-evenly gap-x-4">
                              <button onClick={() => handleEdit(contact._id)}>
                                <MdModeEdit />
                              </button>

                              <DeleteContact
                                id={contact._id}
                                name={contact.name}
                              />
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </BackgroundTwo>
  );
};

export default Contacts;
