import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {

    const User = sequelize.define("User", {
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          required:true,
          allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        phone: {
            type: DataTypes.INTEGER(15),
            allowNull: true,
          },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          required: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false,
          },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false,
          },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false,
          },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false,
          },
        longitude: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false,
          },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue:0,
          }
      });
      
      return User;

}
