# Vaccine scheduler

Vaccine scheduler is nodejs backend application.

### Assumptions

- Vaccine centers, nurses, nurse weekly schedule needs to populated before using the application is used for booking
- Appointment time is `15` mins (set in process.env.APPOINTMENT_TIME_MINS)

### To start the application in docker

> npm run docker-build

> npm run docker-start

### Generate docs

> npm run jsdocs

Docs will be generated in `/doc`. Launch `/doc/jsdocsindex.html` in a live server

### Run tests

> npm run test
