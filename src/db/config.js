let config = {};
if (process.env.NODE_ENV === 'production') {
  config = {
    HOST: 'db',
    USER: 'vaccineadmin',
    PASSWORD: 'admin#123',
    DB: 'vaccinescheduler',
    dialect: 'postgres'
  };
} else {
  config = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: null,
    DB: 'vaccinescheduler',
    dialect: 'postgres'
  };
}

module.exports = config;
