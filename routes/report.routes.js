const router = require('express').Router();
const reportController = require('../controllers/report.controller');

router.get("/", reportController.getAllReports);
router.patch("/", reportController.confirmReport)
router.patch("/cancel", reportController.cancelReport)
router.delete("/:id", reportController.deleteReport)


module.exports = router;