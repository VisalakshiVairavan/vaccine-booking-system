module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class VaccineCenter extends Model {}

  VaccineCenter.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      }
    },
    { sequelize, modelName: 'vaccine_center' }
  );

  return VaccineCenter;
};
