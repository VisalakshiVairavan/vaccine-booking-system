const dbConfig = require('../db/config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.vaccineCenter = require('./vaccine-center.model.js')(sequelize, Sequelize);
db.nurse = require('./nurse.model.js')(sequelize, Sequelize, db.vaccineCenter);
db.weeklyNurseSchedule = require('./weekly-nurse-schedule.model.js')(
  sequelize,
  Sequelize,
  db.nurse
);
db.booking = require('./booking.model.js')(
  sequelize,
  Sequelize,
  db.nurse,
  db.user,
  db.vaccineCenter
);

db.user.associate = models => {
  db.user.belongsTo(models.booking, {
    foreignKey: { allowNull: false },
    onDelete: 'cascade'
  });
};
module.exports = db;
