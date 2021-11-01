module.exports = (sequelize, Sequelize, Nurse, User, Center) => {
  const Model = Sequelize.Model;
  class Booking extends Model {}
  try {
    Booking.init(
      {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        user_uuid: {
          type: Sequelize.UUID,
          onDelete: 'cascade',
          references: {
            model: User,
            key: 'uuid'
          }
        },
        center_uuid: {
          type: Sequelize.UUID,
          references: {
            model: Center,
            key: 'uuid'
          }
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
        booking_time: {
          type: Sequelize.DATE,
          allowNull: false,
          validate: {
            isDate: true
          }
        }
      },
      { sequelize, modelName: 'booking' }
    );
  } catch (error) {
    console.log(error);
  }

  return Booking;
};
