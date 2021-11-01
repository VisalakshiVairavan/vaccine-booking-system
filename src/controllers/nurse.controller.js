const db = require('../models');
const Nurse = db.nurse;
const Op = db.Sequelize.Op;

/**
 * @namespace Nurse
 */

/**
 * @summary POST api/nurse
 * @param {string}  name - Required
 */
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Required fields missing!'
    });
    return;
  }

  const values = {
    name: req.body.name,
    center_uuid: req.body.center_uuid
  };

  Nurse.create(values)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Nurse.'
      });
    });
};

/**
 * @summary GET api/nurse?name=abc
 * @param {string}  name - Optional
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Nurse.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Nurse.'
      });
    });
};

/**
 * @summary DELETE api/nurse/:uuid
 * @param {string}  uuid - Required
 */
exports.delete = (req, res) => {
  const uuid = req.params.uuid;
  Nurse.destroy({
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Nurse was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Nurse with uuid=${uuid}. Maybe Nurse was not found!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete Nurse with uuid=' + uuid
      });
    });
};

/**
 * @summary PUT api/nurse/:uuid
 * @param {string}  uuid - Required
 */
exports.update = (req, res) => {
  const uuid = req.params.uuid;

  Nurse.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Nurse was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Nurse with uuid=${uuid}. Maybe Nurse was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating Nurse with uuid=' + uuid
      });
    });
};
