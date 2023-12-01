import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js"

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
}

export default updateById;