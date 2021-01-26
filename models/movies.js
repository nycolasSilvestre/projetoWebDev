module.exports = (sequelize, type) =>
  sequelize.define('movies', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    portuguese_title: {
      type: type.STRING,
      allowNull: false,
    },
    year: {
      type: type.INTEGER,
      allowNull: false,
    },
    duration: {
      type: type.INTEGER,
      allowNull: false,
    },
    totalRecordingDays: {
      type: type.INTEGER,
      allowNull: false,
    },
    cost: {
      type: type.INTEGER,
      allowNull: false,
    },
    synopsis: {
      type: type.STRING,
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
    studioId: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
