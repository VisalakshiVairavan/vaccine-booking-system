module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class User extends Model {}
  const errorHandler = () => {
    throw new Error('NRIC is invalid');
  };
  User.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nric: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is_nric_valid: nric => {
            if (
              nric.length !== 9 ||
              !['S', 'T', 'G', 'F'].includes(nric[0].toUpperCase())
            ) {
              return errorHandler();
            }
            const lastLetter = nric[8].toUpperCase();
            const nricCheckDigits = 'JZIHGFEDCBA';
            const finCheckDigits = 'XWUTRQPNMLK';
            const digits = nric.slice(1, 8);
            const weights = [2, 7, 6, 5, 4, 3, 2];
            let sum = 0;

            if (isNaN(digits)) {
              return errorHandler();
            }
            if (['T', 'G'].includes(nric[0].toUpperCase())) {
              sum += 4;
            }
            for (let i = 0; i < digits.length; i++) {
              sum += parseInt(digits.charAt(i), 10) * weights[i];
            }
            if (['S', 'T'].includes(nric[0].toUpperCase())) {
              !nricCheckDigits.charAt(sum % 11) === lastLetter
                ? errorHandler()
                : '';
            }
            !finCheckDigits.charAt(sum % 11) === lastLetter
              ? errorHandler()
              : '';
          }
        }
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      }
    },
    { sequelize, modelName: 'user' }
  );

  return User;
};
