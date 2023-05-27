import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {

    const Pictures = sequelize.define("picture", {
        pictureId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        pictureName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
      
      return Pictures;

}
