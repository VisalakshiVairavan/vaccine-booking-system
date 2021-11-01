const db = require('../models');
const User = db.user;
const Op = db.Sequelize.Op;

/**
 * @module User
 */

/**
 * @summary POST api/user
 * @param {string}  name - Required
 * @param {string} nric - Required - Format: Proper Singapore NRIC
 * @returns {object} User with UUID
 */

exports.create = (req, res) => {
  if (!req.body.name || !req.body.nric) {
    console.log(req);
    res.status(400).send({
      message: 'Required fields missing!'
    });
    return;
  }

  const values = {
    name: req.body.name,
    nric: req.body.nric
  };

  User.create(values)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.'
      });
    });
};

/**
 * @summary GET api/user?name=abc
 * @param {string} name - optional
 *  @returns {Array<Object>} List of all Users
 */
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving User.'
      });
    });
};

/**
 * @summary DELETE api/user/:uuid
 * @param {string} uuid - Required
 * @returns {object} Updated Booking
 */
exports.delete = (req, res) => {
  const uuid = req.params.uuid;
  User.destroy({
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete User with uuid=${uuid}. Maybe User was not found!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Could not delete User with uuid=' + uuid
      });
    });
};

/**
 * @summary PUT api/user/:uuid
 * @param {string} uuid - Required
 *  @returns {object} Updated User
 */
exports.update = (req, res) => {
  const uuid = req.params.uuid;

  User.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'User was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update User with uuid=${uuid}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating User with uuid=' + uuid
      });
    });
};
