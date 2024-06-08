const express = require('express');
const router = express.Router();
const bookCtrl = require("../controllers/book.js");
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer-config.js");

router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, bookCtrl.createBook);
router.put("/:id", auth, multer, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;

