import Contact from "../models/Contact.js";

const getAllContacts = async (req, res, next) => {
    try {
        const result = await Contact.find({}, "-createdAt -updatedAt");
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export default getAllContacts;

