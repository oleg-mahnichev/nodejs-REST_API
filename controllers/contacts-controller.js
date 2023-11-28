import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js"

const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find({}, "-createdAt -updatedAt");
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const addContact = async (req, res, next) => {

    const result = await Contact.create(req.body);
    res.status(201).json(result);

}

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json({
        message: "Delete success"
    })
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
}

const updateFavoriteStatus = async (req, res, next) => {
    try {
        const { id: contactId } = req.params;
        const { favorite } = req.body;

        if (favorite === undefined) {
            throw HttpError(400, 'Missing field "favorite"');
        }

        const updatedContact = await updateStatusContact(contactId, { favorite });

        res.status(200).json(updatedContact);
    } catch (error) {
        console.error(error);
        if (error.jsonMessage) {
            res.status(error.status).json(error.jsonMessage);
        } else {
            next(error);
        }
    }
};

const updateStatusContact = async (contactId, body) => {
    try {
        const contact = await Contact.findById(contactId);

        if (!contact) {
            throw HttpError(404, `Contact with id=${contactId} not found`);
        }

        // Оновлення лише поля 'favorite' з тіла запиту
        contact.favorite = body.favorite;

        // Збереження оновленого контакту
        const updatedContact = await contact.save();

        return updatedContact;
    } catch (error) {
        throw HttpError(500, 'Internal Server Error');
    }
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateFavoriteStatus,
}