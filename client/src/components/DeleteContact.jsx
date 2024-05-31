// DeleteContact.jsx
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteContact = ({ id, name }) => {
  const handleDelete = () => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: `Do you want to delete the contact ${name}`,
      showCancelButton: true,
      confirmButtonColor: "#083F46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/contacts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire({
          title: "Your contact has been deleted successfully!",
        });
      }
    });
  };

  return (
    <button onClick={handleDelete}>
      <RiDeleteBin6Line />
    </button>
  );
};

export default DeleteContact;
