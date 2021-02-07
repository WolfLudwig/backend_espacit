const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getOneCategory);
router.put("/:id", categoryController.udapteCategoryDesc);
router.put("/:id", categoryController.udapteCategoryTitle);

module.exports = router;