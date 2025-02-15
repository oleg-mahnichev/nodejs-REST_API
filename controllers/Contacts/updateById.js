import { HttpError } from "../../helpers/index.js";

const updateById = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await findOneAndUpdate({ _id: id, owner }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
}

export default updateById;