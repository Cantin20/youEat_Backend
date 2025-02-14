const router = require('express').Router();

const foodController = require('../controllers/foodController');
const {verifyVendor} = require('../middlewares/verifyToken');

router.post("/", verifyVendor, foodController.addFood);
router.get("/recommendation/:code", foodController.getRandomFood);

router.get("/byCode/:code", foodController.getAllFoodsByCode);

router.get("/:id", foodController.getFoodById);
router.get("/restaurant-foods/:id", foodController.getFoodByRestaurant);
router.get("/search/:search", foodController.searchFoods);

router.get("/:category/:code", foodController.getFoodByCategoryAndCode);



module.exports = router;

