const express = require("express");
const router = express.Router();

const {getProducts,
    getProductId,
    deletePeople,
    getEmployeeByName,
    updatePeople} = require('../controller/people');


router.route("/").get(getProducts);
router.route("/:prodId").get(getProductId);
router.route("/:id").delete(deletePeople);
router.route("/postman").post(getEmployeeByName);
router.route("/:id").put(updatePeople);
    
module.exports = router;