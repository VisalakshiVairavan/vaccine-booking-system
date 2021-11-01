const db = require('../models');
const WeeklyNurseSchedule = db.weeklyNurseSchedule;
const Op = db.Sequelize.Op;
/**
 * @namespace WeeklyNurseSchedule
 */

/**
 * @summary POST api/weekly-nurse-schedule
 * @param {string}  nurse_uuid - Required
 * @param {Date}  start_time - Required - FORMAT : 2021-11-01 11:45:00.000 +0800
 * @param {Date}  end_time - Required - FORMAT : 2021-11-01 11:45:00.000 +0800
 *  @returns {object} WeeklyNurseSchedule with UUID
 */

exports.create = (req, res) => {
  if (!req.body.nurse_uuid) {
    res.status(400).send({
      message: 'Required fields missing!'
    });
    return;
  }

  const values = {
    nurse_uuid: req.body.nurse_uuid,
    day_id: req.body.day_id,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  };

  WeeklyNurseSchedule.create(values)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Nurse Scheduling.'
      });
    });
};

/**
 * @summary GET api/weekly-nurse-schedule?nurse_uuid=<uuid>
 * @param {string}  nurse_uuid - Optional
 * @returns {Array<Object>} List of all WeeklyNurseSchedule
 */

exports.findAll = (req, res) => {
  const nurseId = req.query.nurse_uuid;
  var condition = nurseId
    ? { nurse_uuid: { [Op.iLike]: `%${nurseId}%` } }
    : null;

  WeeklyNurseSchedule.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving Nurse Scheduling.'
      });
    });
};

/**
 * @summary DELETE api/weekly-nurse-schedule/:uuid
 * @param {string}  uuid - Required
 * @returns {object} Success message
 */
exports.delete = (req, res) => {
  const uuid = req.params.uuid;
  WeeklyNurseSchedule.destroy({
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Nurse Scheduling was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Nurse Scheduling with uuid=${uuid}. Maybe Nurse Scheduling was not found!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Nurse Scheduling with uuid=' + uuid
      });
    });
};

/**
 * @summary PUT api/weekly-nurse-schedule/:uuid
 * @param {string} uuid - Required
 * @returns {object} Updated WeeklyNurseSchedule
 */
exports.update = (req, res) => {
  const uuid = req.params.uuid;

  WeeklyNurseSchedule.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Nurse Scheduling was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Nurse Scheduling with uuid=${uuid}. Maybe Nurse Scheduling was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating Nurse Scheduling with uuid=' + uuid
      });
    });
};
