import Contact from "../models/Contact.js"

const addContact = async (req, res, next) => {

    const result = await Contact.create(req.body);
    res.status(201).json(result);

}

export default addContact;