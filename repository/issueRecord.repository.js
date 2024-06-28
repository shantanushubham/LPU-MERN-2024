const { isObjectIdOrHexString } = require("mongoose");
const IssueRecordModel = require("../models/IssueRecord");

const addIssueRecord = async (issueRecordInfo) => {
  try {
    const issueRecord = await new IssueRecordModel(issueRecordInfo).save();
    console.info("Successfully saved new issue record");
    return issueRecord;
  } catch (err) {
    console.error("Creation of issue record failed.", err);
    return null;
  }
};

const getIssueRecordById = async (issueRecordId) => {
  try {
    const issueRecord = await IssueRecordModel.findOne({ _id: issueRecordId });
    if (!issueRecord) {
      console.info(`No issue record was found for ID: ${issueRecordId}`);
    } else {
      console.info(
        `Issue record with ID: ${issueRecord} was successfully found.`
      );
    }
    return issueRecord;
  } catch (err) {
    console.error(
      `Error in finding issue record with ID: ${issueRecordId}`,
      err
    );
    throw err;
  }
};

const updateIssueRecord = async (issueRecord) => {
  try {
    const updateResult = await IssueRecordModel.updateOne(
      { _id: issueRecord.id },
      { $set: { ...issueRecord } }
    );
    if (!updateResult.matchedCount) {
      console.info(
        `Update Failed! Issue Record with ID: ${issueRecord.id} doesn't exist`
      );
      return false;
    }
    console.info(
      `Update Success! Issue Record with ID: ${issueRecord.id} was updated`
    );
    return true;
  } catch (err) {
    console.error(`Update Failed!`, err);
    throw err;
  }
};

const getIssueRecordsByFilters = async (filterObject) => {
  try {
    let queryObject = {};
    if (filterObject.studentRegNo) {
      queryObject.studentRegNo = filterObject.studentRegNo; //  {studentRegNo: 100, bookIsbnNo: 200}
    }
    if (filterObject.bookIsbnNo) {
      queryObject.bookIsbnNo = filterObject.bookIsbnNo;
    }
    if (filterObject.startDate) {
      // TODO:
      // Some query with the help of which we can get objects whose issue date is after the given start date
    }
    if (filterObject.endDate) {
      // TODO:
      // Some query with the help of which we can get objects whose issue date is before the given end date
    }
    const issueRecordList = await IssueRecordModel.find(queryObject);
    console.info(`Found ${issueRecordList.length} records by filters`);
    return issueRecordList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteIssueRecord = async (issueRecordId) => {
  try {
    const deleteResult = await IssueRecordModel.deleteOne({
      _id: issueRecordId,
    });
    if (!deleteResult.matchedCount) {
      console.info(
        `Delete Failed! Issue Record with ID: ${issueRecord.id} doesn't exist`
      );
      return false;
    }
    console.info(
      `Delete Success! Issue Record with ID: ${issueRecord.id} was deleted`
    );
    return true;
  } catch (err) {
    console.error(`Delete Failed!`, err);
    throw err;
  }
};

module.exports = {
  addIssueRecord,
  getIssueRecordById,
  getIssueRecordsByFilters,
  updateIssueRecord,
  deleteIssueRecord,
};
