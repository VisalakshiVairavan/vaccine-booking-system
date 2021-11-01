const db = require('../models');
const VaccineCenter = db.vaccineCenter;
const Op = db.Sequelize.Op;

/**
 * @namespace VaccineCenter
 */

/**
 * @summary POST api/vaccine-center
 * @param {string}  name - Required
 * @returns {object} VaccineCenter with UUID
 */

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Required fields missing!'
    });
    return;
  }

  const values = {
    name: req.body.name
  };

  VaccineCenter.create(values)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating the Vaccine Center.'
      });
    });
};

/**
 * @summary GET api/vaccine-center?name=abc
 * @param {string} name - optional
 *  @returns {Array<Object>} List of all VaccineCenters
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  VaccineCenter.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Vaccine Center.'
      });
    });
};
/**
 * @summary DELETE api/vaccine-center/:uuid
 * @param {string} uuid - Required
 * @returns {object} Success message
 */

exports.delete = (req, res) => {
  const uuid = req.params.uuid;
  VaccineCenter.destroy({
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Vaccine Center was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Vaccine Center with uuid=${uuid}. Maybe Vaccine Center was not found!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Vaccine Center with uuid=' + uuid
      });
    });
};

/**
 * @summary PUT api/vaccine-center/:uuid
 * @param {string} uuid - Required
 * @returns {object} Updated VaccineCenter
 */

exports.update = (req, res) => {
  const uuid = req.params.uuid;

  VaccineCenter.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Vaccine Center was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Vaccine Center with uuid=${uuid}. Maybe Vaccine Center was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating Vaccine Center with uuid=' + uuid
      });
    });
};
