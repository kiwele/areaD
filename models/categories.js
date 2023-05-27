import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {

    const Categories = sequelize.define("category", {
        categoryId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        categoryName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        picture: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      });
      
      return Categories;

}
