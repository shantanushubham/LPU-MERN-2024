const express = require("express");
const router = express.Router();
const issueRecordController = require("../controllers/issueRecord.controller");

router.post("/add", issueRecordController.addIssueRecord);
router.get("/:issueRecordId", issueRecordController.getIssueRecordById);
router.get("/filter", issueRecordController.getIssueRecordsByFilters);
router.put("/", issueRecordController.updateIssueRecord);
router.delete("/:issueRecordId", issueRecordController.deleteIssueRecord);

module.exports = router;
