module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
      MovieID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      Tagline: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      OverView: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      Genres: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ProductionCompanies: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      ReleaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      Revenue: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true
      },
      Vote_Average: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      Runtime: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      Img_Name: {
        type: DataTypes.STRING(255),
        allowNull: true
      }

    }, {
      tableName: 'Movie',
      timestamps: false
    });
  
    return Movie;
  };
  