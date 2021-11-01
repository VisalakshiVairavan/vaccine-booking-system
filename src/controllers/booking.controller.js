const db = require('../models');
const Booking = db.booking;
const User = db.user;
const APPOINTMENT_TIME = 15;
const moment = require('moment');

/**
 * @namespace Booking
 */

/**
 * @summary POST api/booking
 * @param {string}  name - Required
 * @param {string} nric - Required
 * @param {Date} booking_time - Required - FORMAT : 2021-11-01 11:45:00.000 +0800
 * @returns {object} Booking with UUID
 */
exports.create = (req, res) => {
  let user_uuid;
  if (
    !req.body.name ||
    !req.body.nric ||
    !moment(req.body.booking_time).isValid()
  ) {
    console.log(req);
    res.status(400).send({
      message: 'Required fields missing!'
    });
    return;
  }

  const userValues = {
    name: req.body.name,
    nric: req.body.nric
  };

  User.create(userValues)
    .then(data => {
      user_uuid = data.uuid;
      db.sequelize
        .query(
          `SELECT n.uuid FROM public.nurses n JOIN public.weekly_nurse_schedules ns ON n.uuid = ns.nurse_uuid
            where center_uuid = '${req.body.center_uuid}' 
            and ( start_time < '${
              req.body.booking_time
            }' and end_time > '${getFormattedDateWithBuffer(
            req.body.booking_time
          )}') 
            and n.uuid not in (SELECT nurse_uuid FROM public.bookings where booking_time  = '${
              req.body.booking_time
            }') limit 1`
        )
        .then(function (nurseList) {
          //If at least one nurse if available
          if (nurseList && nurseList.length && nurseList[0].length) {
            const values = {
              nurse_uuid: nurseList[0][0].uuid,
              center_uuid: req.body.center_uuid,
              user_uuid: user_uuid,
              booking_time: req.body.booking_time
            };
            Booking.create(values)
              .then(data => {
                res.send(data);
              })
              .catch(() => {
                bookingCreateErrorHandler(res, user_uuid);
              });
          } else {
            // All slots are taken
            bookingCreateErrorHandler(res, user_uuid, 'All slots are booked.');
          }
        })
        .catch(() => {
          bookingCreateErrorHandler(res, user_uuid);
        });
    })
    .catch(() => {
      bookingCreateErrorHandler(res, user_uuid, 'User already has bookings');
    });
};

/**
 * @summary GET api/booking
 * @returns {Array<Object>} List of all Bookings
 */

exports.findAll = (_, res) => {
  Booking.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Booking.'
      });
    });
};

/**
 * @summary DELETE api/booking/:uuid
 * @param {string}  uuid - Required
 * @returns {object} Success message
 */

exports.delete = (req, res) => {
  const uuid = req.params.uuid;
  Booking.findAll({
    attributes: ['user_uuid'],
    where: { uuid: uuid }
  })
    .then(data => {
      // Booking will be deleted on cascade
      User.destroy({
        where: { uuid: data[0].user_uuid }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'Booking was deleted successfully!'
            });
          } else {
            res.send({
              message: `Cannot delete Booking with uuid=${uuid}. Maybe Booking was not found!`
            });
          }
        })
        .catch(() => {
          res.status(500).send({
            message:
              'Could not delete user associated with Booking with uuid=' + uuid
          });
        });
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
 * @summary PUT api/booking/:uuid
 * @param {string} uuid - Required
 * @returns {object} Updated Booking
 */

exports.update = (req, res) => {
  const uuid = req.params.uuid;

  Booking.update(req.body, {
    where: { uuid: uuid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Booking was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Booking with uuid=${uuid}. Maybe Booking was not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error updating Booking with uuid=' + uuid
      });
    });
};

const getFormattedDateWithBuffer = dateString => {
  const date = moment(dateString)
    .add(APPOINTMENT_TIME, 'm')
    .format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
  console.log('getISOStringWithBuffer', date);
  return date;
};

const bookingCreateErrorHandler = (res, user_uuid, message) => {
  User.destroy({
    where: { uuid: user_uuid }
  });
  res.status(500).send({
    message: message ? message : 'Some error occurred while creating Booking.'
  });
};
