import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {

    const LikedProperties = sequelize.define("likedProperty", {
        likeId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      });
      
      return LikedProperties;

}
