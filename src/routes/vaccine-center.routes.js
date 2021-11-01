module.exports = app => {
  const vaccineCenter = require('../controllers/vaccine-center.controller.js');
  const router = require('express').Router();
  router.post('/', vaccineCenter.create);
  router.get('/', vaccineCenter.findAll);
  router.put('/:uuid', vaccineCenter.update);
  router.delete('/:uuid', vaccineCenter.delete);
  app.use('/api/vaccine-center', router);
};
