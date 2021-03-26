const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getOneCategory);
router.post("/", categoryController.createCategory);
router.patch("/", categoryController.updateCategory);
router.put("/:id", categoryController.udapteCategoryDesc);
router.put("/:id", categoryController.udapteCategoryTitle);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;