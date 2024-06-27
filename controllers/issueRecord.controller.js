const issueRecordService = require("../service/issueRecord.service");

const addIssueRecord = async (req, res) => {
  try {
    const issueRecord = { ...req.body };
    const newIssueRecord = await issueRecordService.addIssueRecord(issueRecord);
    return res.status(201).send(newIssueRecord);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Adding new Issue Record failed!",
    });
  }
};

const getIssueRecordById = async (req, res) => {
  try {
    const { issueRecordId } = req.params;
    const issueRecord = await issueRecordService.getIssueRecordById(
      issueRecordId
    );
    if (!issueRecord) {
      return res.status(404).send({
        message: `Issue Record with ID: ${issueRecord} doesn't exist.`,
      });
    }
    return res.status(200).send(issueRecord);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An Internal Server Error occurred",
    });
  }
};

const getIssueRecordsByFilters = async (req, res) => {
  try {
    const filters = { ...req.query };
    const issueRecordList = await issueRecordService.getIssueRecordsByFilters(
      filters
    );
    return res.status(200).send(issueRecordList);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An Internal Server Error occurred",
    });
  }
};

const updateIssueRecord = async (req, res) => {
  try {
    const issueRecord = { ...req.body };
    const wasUpdated = await issueRecordService.updateIssueRecord(issueRecord);
    if (!wasUpdated) {
      return res.status(404).send({
        message: `Update Failed! Issue Record with ID: ${issueRecord.id} doesn't exist`,
      });
    }
    return res.status(200).send({
      message: `Update Success! Issue Record with ID: ${issueRecord.id} was updated`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An Internal Server Error occurred",
    });
  }
};

const deleteIssueRecord = async (req, res) => {
  try {
    const { issueRecordId } = req.params;
    const wasDeleted = await issueRecordService.deleteIssueRecord(
      issueRecordId
    );
    if (!wasDeleted) {
      return res.status(404).send({
        message: `Delete Failed! Issue Record with ID: ${issueRecord.id} doesn't exist`,
      });
    }
    return res.status(200).send({
      message: `Delete Success! Issue Record with ID: ${issueRecord.id} was deleted.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An Internal Server Error occurred",
    });
  }
};

module.exports = {
  addIssueRecord,
  getIssueRecordById,
  getIssueRecordsByFilters,
  updateIssueRecord,
  deleteIssueRecord,
};
