import { DataTypes } from "sequelize";

export default (sequelize, Sequelize) => {

    const serviceType = sequelize.define("serviceType", {
        serviceId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        serviceName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
      
      return serviceType;

}
