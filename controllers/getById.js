import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js"


const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
}

export default getById;