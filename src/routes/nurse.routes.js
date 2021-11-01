module.exports = app => {
  const nurse = require('../controllers/nurse.controller.js');
  const router = require('express').Router();
  router.post('/', nurse.create);
  router.get('/', nurse.findAll);
  router.put('/:uuid', nurse.update);
  router.delete('/:uuid', nurse.delete);
  app.use('/api/nurse', router);
};
