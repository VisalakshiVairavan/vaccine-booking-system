module.exports = app => {
  const booking = require('../controllers/booking.controller.js');
  const router = require('express').Router();
  router.post('/', booking.create);
  router.get('/', booking.findAll);
  router.put('/:uuid', booking.update);
  router.delete('/:uuid', booking.delete);
  app.use('/api/booking', router);
};
