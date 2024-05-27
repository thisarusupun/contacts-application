import { Contact } from "../models/contactModels.js";

// crud operations

// get all contacts
export const getContacts = async (request, response) => {
  try {
    const contacts = await Contact.find({ user_id: request.user.id });
    return response.status(200).json({ success: true, contacts });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

// create contact
export const createContact = async (request, response) => {
  try {
    const { name, email, phone, gender } = request.body;

    if (!name || !email || !phone || !gender) {
      return response
        .status(400)
        .json({ success: false, message: "all fields are required" });
    } else {
      const newContact = await Contact.create({
        name,
        email,
        phone,
        gender,
        user_id: request.user.id,
      });
      return response.status(201).json({ success: true, user: newContact });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: "creating contacts error" });
  }
};

// get one contact
export const getContact = async (request, response) => {
  try {
    const { id } = request.params;
    const contact = await Contact.findById(id);

    if (contact.user_id.toString() !== request.user.id) {
      return response.status(404).json({ message: "bad request" });
    }
    return response.status(200).json(contact);
  } catch (error) {
    return response.status(500).json(error);
  }
};

// update contact
export const updateContact = async (request, response) => {
  try {
    const {
      params: { id },
      body,
    } = request;

    const contact = await Contact.findById(id);

    if (contact.user_id.toString() !== request.user.id) {
      response.status(404);
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, body);
    return response.status(200).json(updatedContact);
  } catch (error) {
    return response.status(500).json(error);
  }
};

// delete contact
export const deleteContact = async (request, response) => {
  try {
    const { id } = request.params;

    const contact = await Contact.findById(id);

    if (contact.user_id.toString() !== request.user.id) {
      return response.status(404);
    }

    const deletedContact = await Contact.findByIdAndDelete(id);
    return response.status(200).json(deletedContact);
  } catch (error) {
    return response.status(500).json(error);
  }
};
