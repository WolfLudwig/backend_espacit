const router = require('express').Router();
const ressourceTypeController = require('../controllers/ressourceType.controller');

router.get("/", ressourceTypeController.getAllRessourceType);
router.get("/:id", ressourceTypeController.getOneRessourceType);
router.put("/:id", ressourceTypeController.udapteRessourceTypeDesc);
router.put("/:id", ressourceTypeController.udapteRessourceTypeTitle);

module.exports = router;