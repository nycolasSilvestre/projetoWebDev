module.exports = (sequelize, type) =>
  sequelize.define('studios', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    creationDate: {
      type: type.DATE,
      allowNull: false,
    },
    nationality: {
        type: type.STRING,
        allowNull: false,
    },
    city: {
        type: type.STRING,
        allowNull: false,
    },
    numberOfMovies: {
      type: type.INTEGER,
      allowNull: false,
    },
    pictureUrl: {
      type: type.STRING,
      allowNull: false,
    },
  });
