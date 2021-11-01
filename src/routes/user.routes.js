module.exports = app => {
  const user = require('../controllers/user.controller.js');
  const router = require('express').Router();
  router.post('/', user.create);
  router.get('/', user.findAll);
  router.put('/:uuid', user.update);
  router.delete('/:uuid', user.delete);
  app.use('/api/user', router);
};
