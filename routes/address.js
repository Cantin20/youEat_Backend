const router = require('express').Router();
const addressController = require('../controllers/addressControlller');
const {verifyTokenAndAuthorization} = require('../middlewares/verifyToken')


router.post("/", verifyTokenAndAuthorization, addressController.addAddress);

router.get("/default", verifyTokenAndAuthorization, addressController.getDefaultAddress);

router.get("/all", verifyTokenAndAuthorization, addressController.getAddresses);

router.delete("/:id", verifyTokenAndAuthorization, addressController.deleteAddress);

router.patch("/default/:id", verifyTokenAndAuthorization, addressController.setAddressDefault);



module.exports = router;