const {Router} = require ("express");
const router = Router();
const bookCtrl = require("../controller/book.controller");

router.get("/books/:id_user", bookCtrl.getBooks);
router.get("/books/:id_user/:id_book", bookCtrl.getBooksID);
router.post("/books", bookCtrl.postBook);
router.put("/books", bookCtrl.postBook);
router.delete("/books/:id_book", bookCtrl.deleteBook);

module.exports = router;