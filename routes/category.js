const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const {verifyAdmin} = require('../middlewares/verifyToken');

router.post("/", verifyAdmin, categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.get("/random", categoryController.getRandomCategories);

module.exports = router;