module.exports = (sequelize, Sequelize, Nurse) => {
  const Model = Sequelize.Model;
  class WeeklyNurseSchedule extends Model {}
  try {
    WeeklyNurseSchedule.init(
      {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nurse_uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: Nurse,
            key: 'uuid',
            deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
          }
        },
        start_time: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            isDate: true
          }
        },
        end_time: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            isDate: true
          }
        }
      },
      { sequelize, modelName: 'weekly_nurse_schedule' }
    );
  } catch (error) {
    console.log(error);
  }

  return WeeklyNurseSchedule;
};
