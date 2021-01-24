module.exports = (sequelize, type) =>
  sequelize.define('directors', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    nationality: {
      type: type.STRING,
      allowNull: false,
    },
    birthday: {
      type: type.DATE,
      allowNull: false,
    },
    age: {
      type: type.INTEGER,
      allowNull: false,
    },
    genre: {
      type: type.STRING,
      allowNull: false,
    },
    pictureUrl: {
      type: type.STRING,
      allowNull: false,
    },
  });
