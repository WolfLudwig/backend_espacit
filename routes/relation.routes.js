const router = require('express').Router();
const relationController = require('../controllers/relation.controller');

router.get("/", relationController.getAllRelations);
router.get("/:id", relationController.getOneRelations);
router.put("/:id", relationController.udapteRelationDesc);
router.put("/:id", relationController.udapteRelationTitle);


module.exports = router;