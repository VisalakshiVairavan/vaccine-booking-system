module.exports = (sequelize, Sequelize, VaccineCenter) => {
  const Model = Sequelize.Model;
  class Nurse extends Model {}
  try {
    Nurse.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        center_uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: VaccineCenter,
            key: 'uuid',
            deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED
          }
        }
      },
      { sequelize, modelName: 'nurse' }
    );
  } catch (error) {
    console.log(error);
  }

  return Nurse;
};
