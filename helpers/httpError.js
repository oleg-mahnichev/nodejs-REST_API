const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    error.jsonMessage = { message }; // Додайте цей рядок
    return error;
}

export default HttpError;