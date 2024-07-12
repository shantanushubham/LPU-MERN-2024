const express = require("express");
const router = express.Router();
const issueRecordController = require("../controllers/issueRecord.controller");

router.post("/add", issueRecordController.addIssueRecord);
router.get("/:issueRecordId", issueRecordController.getIssueRecordById);
router.get("/get/filter", issueRecordController.getIssueRecordsByFilters);
router.put("/", issueRecordController.updateIssueRecord);
router.patch("/submit/:issueRecordId", issueRecordController.submitBook)
router.delete("/:issueRecordId", issueRecordController.deleteIssueRecord);
router.get("/late-fine/:issueRecordId", issueRecordController.getLateFine);

module.exports = router;
