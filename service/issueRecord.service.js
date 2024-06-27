const issueRecordRepository = require("../repository/issueRecord.repository");

const addIssueRecord = async (issueRecord) => {
  return await issueRecordRepository.addIssueRecord(issueRecord);
};

const getIssueRecordById = async (issueRecordId) => {
  return await issueRecordRepository.getIssueRecordById(issueRecordId);
};

const getIssueRecordsByFilters = async (filterObject) => {
  return await issueRecordRepository.getIssueRecordsByFilters(filterObject);
};

const updateIssueRecord = async (issueRecord) => {
  return await issueRecordRepository.updateIssueRecord(issueRecord);
};

const deleteIssueRecord = async (issueRecordId) => {
  return await issueRecordRepository.deleteIssueRecord(issueRecordId);
};

module.exports = {
  addIssueRecord,
  getIssueRecordById,
  getIssueRecordsByFilters,
  updateIssueRecord,
  deleteIssueRecord,
};
