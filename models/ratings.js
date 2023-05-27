import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {

    const ratings = sequelize.define("rating", {
        ratingId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        star:{
          type: DataTypes.INTEGER,
          required: true,
          defaultValue: 0,
        }
      });
      
      return ratings;

}
