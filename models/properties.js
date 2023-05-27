import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {
  const Properties = sequelize.define("Property", {
    propertyId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    verification_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    availabilty_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    datePublished: {
      type: DataTypes.DATE,
      allowNull: true,
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
    totalRatings: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    hasWater: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasElectricity: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasParking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasFance: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasWifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasToilates: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasBathroom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    hasKitchen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    // status: {
    //     type: DataTypes.INTEGER(1),
    //     allowNull: false,
    //     required: false,
    //   }
  });

  return Properties;
};
