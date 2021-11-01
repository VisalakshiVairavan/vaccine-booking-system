const express = require('express');
const app = express();
process.env.APPOINTMENT_TIME_MINS = 15;
// parse requests of content-type - application/json
app.use(express.json());

//sync sequelize
const db = require('./models/index.js');
db.sequelize.sync().then(() => {
  console.log('sync db.');
});

//FOR DEV ENV ONLY
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

require('./routes/user.routes')(app);
require('./routes/vaccine-center.routes')(app);
require('./routes/nurse.routes')(app);
require('./routes/weekly-nurse-schedule.routes')(app);
require('./routes/booking.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
