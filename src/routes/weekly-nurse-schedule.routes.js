module.exports = app => {
  const nurseSchedule = require('../controllers/weekly-nurse-schedule.controller.js');
  const router = require('express').Router();
  router.post('/', nurseSchedule.create);
  router.get('/', nurseSchedule.findAll);
  router.put('/:uuid', nurseSchedule.update);
  router.delete('/:uuid', nurseSchedule.delete);
  app.use('/api/weekly-nurse-schedule', router);
};
