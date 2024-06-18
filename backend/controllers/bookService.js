const Book = require("../models/Book.js");
const fs = require("fs");

const updateBook = (id, bookObject, res) => {
    Book.updateOne(
        { _id: id },
        { ...bookObject, _id: id }
    )
        .then(() => res.status(200).json({ message: "Le livre a bien été modifié !" }))
        .catch((error) => handleError(res, error));
};

const deleteImage = (imageUrl, callback) => {
    const filename = imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, callback);
};

module.exports = { updateBook, deleteImage };