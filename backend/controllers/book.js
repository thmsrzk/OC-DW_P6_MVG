const Book = require("../models/Book.js");
const fs = require("fs");

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

exports.getTopRatedBooks = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    bookObject.ratings = bookObject.ratings.map(rating => ({ userId: rating.userId, rating: rating.grade }));
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    book.save()
        .then(() => {
            res.status(201).json({ message: "Le livre a bien été ajouté !" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.rateBook = (req, res, next) => {
    const userId = req.body.userId;
    const rating = req.body.rating;
    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 0 et 5" });
    }
    Book.findOne({ _id: req.params.id })
        .then(book => {
            const userRating = book.ratings.find(r => r.userId === userId);
            if (userRating) {
                return res.status(400).json({ message: "Vous avez déjà noté ce livre !" });
            }
            book.ratings.push({ userId, rating: Number(rating) });
            book.averageRating = book.ratings.reduce((acc, r) => acc + (r.rating || 0), 0) / book.ratings.length;
            return book.save();
        })
        .then(book => {
            res.status(200).json(book)
        })
        .catch(error => {
            res.status(400).json({ error })
        });
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file
        ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
                }`,
        }
        : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                if (req.file) {
                    const filename = book.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Book.updateOne(
                            { _id: req.params.id },
                            { ...bookObject, _id: req.params.id }
                        )
                            .then(() => res.status(200).json({ message: "Le livre a bien été modifié !" }))
                            .catch((error) => res.status(401).json({ error }));
                    });
                } else {
                    Book.updateOne(
                        { _id: req.params.id },
                        { ...bookObject, _id: req.params.id }
                    )
                        .then(() => res.status(200).json({ message: "Le livre a bien été modifié !" }))
                        .catch((error) => res.status(401).json({ error }));
                }
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized" });
            } else {
                const filename = book.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res
                                .status(200)
                                .json({ message: "Le livre a bien été supprimé !" });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};