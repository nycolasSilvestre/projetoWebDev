module.exports = (sequelize, type) =>
  sequelize.define('claims', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    claim_name: {
      type: type.STRING,
      allowNull: false,
    }
  });
